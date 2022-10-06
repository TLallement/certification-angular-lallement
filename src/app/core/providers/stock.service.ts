import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import {
  ForkJoinData,
  ForkJoinDetails,
  Stock,
  StockInsiderSentiment,
} from '../../shared/models/stock.model';
import { LocalStorageService } from './local-storage.service';
import { StockDataService } from './stock-data.service';

@Injectable()
export class StockService {
  stocks$: BehaviorSubject<Stock[]> = new BehaviorSubject([]);
  symbol$: Subject<string> = new Subject();

  constructor(
    private localStorageService: LocalStorageService,
    private stockDataService: StockDataService
  ) {}

  addSymbol(symbol: string) {
    this.localStorageService.addItem('symbol', symbol);
    this.symbol$.next(symbol);
  }

  removeSymbol(symbol: string) {
    this.localStorageService.removeItem('symbol', symbol);
    let tmpStocks: Stock[] = this.stocks$
      .getValue()
      .filter((item) => item.symbol !== symbol);
    this.stocks$.next(tmpStocks);
  }

  getCurrentStocks(symbol: string): Observable<ForkJoinData> {
    return forkJoin({
      resultOne: this.stockDataService.getCompanyName(symbol),
      resultTwo: this.stockDataService.getData(symbol),
    });
  }

  getCurrentStockDetails(
    fromDate: string,
    toDate: string,
    symbol: string
  ): Observable<ForkJoinDetails> {
    return forkJoin({
      resultOne: this.stockDataService.getCompanyName(symbol),
      resultTwo: this.stockDataService.getInsiderSentiment(
        symbol,
        fromDate,
        toDate
      ),
    });
  }

  parsingCurrentStockDetails(
    stock: Stock,
    symbol: string,
    nbMonth: number
  ): Array<StockInsiderSentiment> {
    let monthList: Array<StockInsiderSentiment> = [];
    let tmpDate = new Date(
      new Date().setMonth(new Date().getMonth() - nbMonth + 1)
    );
    for (let i = 0; i < nbMonth; i++) {
      let currentMonth: number = tmpDate.getMonth() + 1;
      let currentYear: number = tmpDate.getFullYear();
      let currentDate: StockInsiderSentiment = stock.data.find(
        (item) => item.month === currentMonth && item.year === currentYear
      );
      monthList[i] = {
        symbol: symbol,
        month: currentMonth,
        year: currentYear,
        change: currentDate?.change,
        mspr: currentDate?.mspr,
        name: formatDate(tmpDate, 'MMMM', 'en'),
      };
      tmpDate = new Date(tmpDate.setMonth(tmpDate.getMonth() + 1));
    }
    return monthList;
  }
}
