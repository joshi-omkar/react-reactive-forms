import { AbstractControl } from '../abstract/AbstractControl'
import { ValidatorFn, AsyncValidatorFn, ValidationErrors } from '../types'

export class FormControl<T = any> extends AbstractControl<T> {
  constructor(
    value: T,
    validators: ValidatorFn<T>[] = [],
    asyncValidators: AsyncValidatorFn<T>[] = []
  ) {
    super(validators, asyncValidators)
    this._value = value
    this.updateValueAndValidity()
  }

  setValue(value: T) {
    if (this._value === value) return
    this._value = value
    this.markAsDirty()
    this.updateValueAndValidity()
    this.emit()
  }

  patchValue(value: Partial<T>) {
    this.setValue(value as T)
  }

  reset(value?: T) {
    this._value = value as T
    this.markAsPristine()
    this.markAsUntouched()
    this.updateValueAndValidity()
    this.emit()
  }
}
