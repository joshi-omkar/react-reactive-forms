import { AbstractControl } from "./AbstractControl";
import { ValidatorFn, AsyncValidatorFn } from "./types";

export class FormControl<T = any> extends AbstractControl<T> {
  constructor(
    initialValue: T,
    validators: ValidatorFn<T>[] = [],
    asyncValidators: AsyncValidatorFn<T>[] = []
  ) {
    super(validators, asyncValidators);
    this._value = initialValue;
    this.updateValueAndValidity();
  }

  setValue(value: T) {
    if (this._value === value) return;

    this._value = value;
    this.markAsDirty();
    this.updateValueAndValidity();
  }

  patchValue(value: Partial<T>) {
    this.setValue(value as T);
  }
}
