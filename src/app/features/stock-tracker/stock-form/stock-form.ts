import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface StockFormGroup {
  symbol: FormControl<string>;
}

export class StockForm extends FormGroup<StockFormGroup> {
  constructor() {
    super({
      symbol: new FormControl(null, [
        Validators.required,
        Validators.maxLength(5),
      ]),
    });
  }
}
