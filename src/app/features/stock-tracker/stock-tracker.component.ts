import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StockService } from '../../core/providers/stock.service';
import { Stock, StockName } from '../../shared/models/stock.model';

@Component({
  selector: 'app-stock-tracker',
  templateUrl: './stock-tracker.component.html',
  styleUrls: ['./stock-tracker.component.css'],
})
export class StockTrackerComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
}
