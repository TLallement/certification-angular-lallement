import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocalStorageService } from '../../../core/providers/local-storage.service';
import { StockService } from '../../../core/providers/stock.service';
import { StockForm, StockFormGroup } from './stock-form';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css'],
})
export class StockFormComponent implements OnInit {
  stockForm: FormGroup<StockFormGroup>;

  constructor(
    private stockService: StockService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.stockForm = new StockForm(this.localStorageService);
  }

  onSave(): void {
    if (!this.stockForm.invalid) 
      this.stockService.addSymbol(this.stockForm.value.symbol.toUpperCase());
  }
}
