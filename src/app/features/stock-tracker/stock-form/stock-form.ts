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
  constructor(localStorageService: LocalStorageService) {
    super({
      symbol: new FormControl(null, [
        Validators.required,
        Validators.maxLength(5),
        localStorageValidator(localStorageService)
      ]),
    });
  }
}

export function localStorageValidator(localStorageService: LocalStorageService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = localStorageService.getItem('symbol').indexOf(control.value) > -1
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}