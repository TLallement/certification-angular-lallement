import {
  AbstractControl,
  FormControl,
  FormGroup,
  UntypedFormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../../core/providers/local-storage.service';

export interface StockFormGroup {
  symbol: FormControl<string>;
}

export class StockForm extends FormGroup<StockFormGroup> {
  constructor() {
    super({
      symbol: new FormControl(null, [
        Validators.required,
        Validators.maxLength(5),
        localStorageValidator(),
      ]),
    });
  }
}


export function localStorageValidator(): ValidatorFn {  
    return (control: AbstractControl): { [key: string]: any } | null =>  
        control.value  === 'GOOGL' 
            ? null : {wrongColor: control.value};
}
