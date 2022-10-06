import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positive'
})
export class PositivePipe implements PipeTransform {

  transform(value: string | number): string | number {
    return +value > 0 ? '+' + value : value 
  }
}