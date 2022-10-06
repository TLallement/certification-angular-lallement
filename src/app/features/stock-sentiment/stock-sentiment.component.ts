import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { BehaviorSubject, forkJoin } from 'rxjs';
import {
  Stock,
  StockInsiderSentiment,
  StockName,
} from '../../shared/models/stock.model';
import { StockDataService } from '../../core/providers/stock-data.service';

const NB_MONTHS: number = 3;

@Component({
  selector: 'app-stock-sentiment',
  templateUrl: './stock-sentiment.component.html',
  styleUrls: ['./stock-sentiment.component.css'],
})
export class StockSentimentComponent implements OnInit {
  symbol: string = '';
  currentDate: Date = new Date();
  startDate: Date = new Date();
  months: StockInsiderSentiment[];

  stock$: BehaviorSubject<Stock> = new BehaviorSubject(null);
  hasLoaded: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private stockDataService: StockDataService
  ) {}

  ngOnInit() {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.startDate.setMonth(this.startDate.getMonth() - NB_MONTHS);
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.getCurrentStockDetails(
      formatDate(this.startDate, 'yyyy-MM-dd', 'en'),
      formatDate(this.currentDate, 'yyyy-MM-dd', 'en')
    );
  }

  getCurrentStockDetails(fromDate: string, toDate: string) {
    this.hasLoaded = false;
    forkJoin({
      resultOne: this.stockDataService.getCompanyName(this.symbol),
      resultTwo: this.stockDataService.getInsiderSentiment(
        this.symbol,
        fromDate,
        toDate
      ),
    }).subscribe((value) => {
      let tmpStockName: StockName = value.resultOne.result.find(
        (item) => item.symbol === this.symbol
      );
      let stock: Stock = {
        symbol: this.symbol,
        description: tmpStockName?.description,
        displaySymbol: tmpStockName?.displaySymbol,
        type: tmpStockName?.type,
        data: value.resultTwo.data,
      };
      this.stock$.next(stock);
      this.hasLoaded = true;
      this.months = this.monthsSequence(stock);
    });
  }

  monthsSequence(stock: Stock): Array<StockInsiderSentiment> {
    let monthList: Array<StockInsiderSentiment> = [];
    let tmpDate = new Date(
      new Date().setMonth(new Date().getMonth() - NB_MONTHS)
    );
    for (let i = 0; i < NB_MONTHS; i++) {
      let currentMonth: number = tmpDate.getMonth() + 1;
      let currentYear: number = tmpDate.getFullYear();
      let currentDate: StockInsiderSentiment = stock.data.find(
        (item) => item.month === currentMonth && item.year === currentYear
      );
      monthList[i] = {
        symbol: this.symbol,
        month: currentMonth,
        year: currentYear,
        change: currentDate?.change,
        mspr: currentDate?.mspr,
        name: formatDate(tmpDate, 'MMMM', 'en'),
      };
      tmpDate = new Date(tmpDate.setMonth(tmpDate.getMonth() + 1));
    }
    console.log(monthList);
    return monthList;
  }
}
