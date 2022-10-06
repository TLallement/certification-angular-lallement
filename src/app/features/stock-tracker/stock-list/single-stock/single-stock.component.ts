import { Component, Input } from '@angular/core';
import { StockService } from '../../../../core/providers/stock.service';
import { Stock } from '../../../../shared/models/stock.model';

@Component({
  selector: 'app-single-stock',
  templateUrl: './single-stock.component.html',
  styleUrls: ['./single-stock.component.css'],
})
export class SingleStockComponent {
  @Input() stock: Stock;

  constructor(private stockService: StockService) {}

  onRemove() {
    this.stockService.removeSymbol(this.stock.symbol);
  }
}
