import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../core/providers/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
})
export class StockListComponent implements OnInit {
  constructor(public stockService: StockService) {}

  ngOnInit() {}
}
