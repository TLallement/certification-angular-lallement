import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import {
  Stock,
  StockCallData,
  StockCallName,
  StockName,
} from '../../shared/models/stock.model';
import { LocalStorageService } from './local-storage.service';
import { StockDataService } from './stock-data.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  stocks$: BehaviorSubject<Stock[]> = new BehaviorSubject([]);
  hasLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(
    private localStorageService: LocalStorageService,
    private stockDataService: StockDataService
  ) {
    this.localStorageService.getItem('symbol').forEach((symbol) => {
      this.getCurrentStocks(symbol);
    });
  }

  addSymbol(symbol: string) {
    this.localStorageService.addItem('symbol', symbol);
    this.getCurrentStocks(symbol);
  }

  removeSymbol(symbol: string) {
    this.localStorageService.removeItem('symbol', symbol);
    let tmpStocks: Stock[] = this.stocks$
      .getValue()
      .filter((item) => item.symbol !== symbol);
    this.stocks$.next(tmpStocks);
  }

  getCurrentStocks(symbol: string) {
    this.hasLoaded$.next(false);
    forkJoin({
      resultOne: this.stockDataService.getCompanyName(symbol),
      resultTwo: this.stockDataService.getData(symbol),
    }).subscribe((value) => {
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
      this.stocks$.next([...this.stocks$.getValue(), stock]);
      this.hasLoaded$.next(true);
    });
  }
}
