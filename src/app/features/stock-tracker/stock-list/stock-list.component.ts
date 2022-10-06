import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LocalStorageService } from '../../../core/providers/local-storage.service';
import { StockDataService } from '../../../core/providers/stock-data.service';
import { StockService } from '../../../core/providers/stock.service';
import { Stock, StockName } from '../../../shared/models/stock.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
})
export class StockListComponent implements OnInit, OnDestroy {
  hasLoaded: boolean = true;
  subscription: Subscription;

  constructor(
    public stockService: StockService,
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.stockService.stocks$.next([]);
    this.localStorageService.getItem('symbol').forEach((symbol) => {
      this.getCurrentStocks(symbol);
    });
    this.subscription = this.stockService.symbol$.subscribe((data) => {
      this.getCurrentStocks(data);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCurrentStocks(symbol: string) {
    this.hasLoaded = false;
    this.stockService.getCurrentStocks(symbol).subscribe((value) => {
      let tmpStockName: StockName = value.resultOne.result.find(
        (item) => item.symbol === symbol
      );
      let stock: Stock = {
        symbol: symbol,
        description: tmpStockName?.description,
        displaySymbol: tmpStockName?.displaySymbol,
        type: tmpStockName?.type,
        c: value.resultTwo.c,
        d: value.resultTwo.d,
        dp: value.resultTwo.dp,
        h: value.resultTwo.h,
        l: value.resultTwo.l,
        o: value.resultTwo.o,
        pc: value.resultTwo.pc,
        t: value.resultTwo.t,
      };
      this.stockService.stocks$.next([
        ...this.stockService.stocks$.getValue(),
        stock,
      ]);
      this.hasLoaded = true;
    });
  }
}
