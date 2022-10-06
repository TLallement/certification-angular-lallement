import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  StockCallData,
  StockCallInsiderSentiment,
  StockCallName,
} from '../../shared/models/stock.model';

const PATH: string = 'https://finnhub.io/api/v1/';
const TOKEN: string = '&token=bu4f8kn48v6uehqi3cqg';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  constructor(private readonly httpClient: HttpClient) {}

  getCompanyName(symbol: string): Observable<StockCallName> {
    return this.httpClient.get(
      PATH + 'search?q=' + symbol + TOKEN
    ) as Observable<StockCallName>;
  }

  getData(symbol: string): Observable<StockCallData> {
    return this.httpClient.get(
      PATH + 'quote?symbol=' + symbol + TOKEN
    ) as Observable<StockCallData>;
  }

  getInsiderSentiment(
    symbol: string,
    startDate: string,
    endDate: string
  ): Observable<StockCallInsiderSentiment> {
    return this.httpClient.get(
      PATH +
        'stock/insider-sentiment?symbol=' +
        symbol +
        '&from=' +
        startDate +
        '&to=' +
        endDate +
        TOKEN
    ) as Observable<StockCallInsiderSentiment>;
  }
}
