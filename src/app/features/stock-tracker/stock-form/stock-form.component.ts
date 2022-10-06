import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StockService } from '../../../core/providers/stock.service';
import { StockForm, StockFormGroup } from './stock-form';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css'],
})
export class StockFormComponent implements OnInit {
  stockForm: FormGroup<StockFormGroup>;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stockForm = new StockForm();
  }

  onSave(): void {
    this.stockService.addSymbol(this.stockForm.value.symbol);
  }
}
