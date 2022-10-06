import { Pipe, PipeTransform } from '@angular/core';
import { StockInsiderSentiment } from '../models/stock.model';

const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Pipe({
  name: 'sentimentDate',
})
export class SentimentDatePipe implements PipeTransform {
  transform(value: StockInsiderSentiment): string {
    return months[value.month-1] + ' ' + value.year;
  }
}
