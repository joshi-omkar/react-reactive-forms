import { AbstractControl } from '../abstract/AbstractControl'
import { ValidatorFn, AsyncValidatorFn } from '../types'

type Controls<T> = {
  [K in keyof T]: AbstractControl<T[K]>
}

export class FormGroup<T extends Record<string, any>> extends AbstractControl<T> {
  controls: Controls<T>

  constructor(
    controls: Controls<T>,
    validators: ValidatorFn<T>[] = [],
    asyncValidators: AsyncValidatorFn<T>[] = []
  ) {
    super(validators, asyncValidators)
    this.controls = controls

    Object.values(this.controls).forEach(control => {
      control.setParent(this)
      control.subscribe(() => this.updateValue())
    })

    this.updateValue()
  }

  private updateValue() {
    const value = {} as T
    Object.keys(this.controls).forEach(key => {
      value[key as keyof T] = this.controls[key as keyof T].value
    })

    this._value = value
    this.updateValueAndValidity()
    this.emit()
  }

  get<K extends keyof T>(key: K): AbstractControl<T[K]> {
    return this.controls[key]
  }

  setValue(value: T) {
    Object.keys(value).forEach(key => {
      if (this.controls[key]) {
        this.controls[key].setValue(value[key])
      }
    })
  }

  patchValue(value: Partial<T>) {
    Object.keys(value).forEach(key => {
      if (this.controls[key]) {
        this.controls[key].patchValue(value[key] as any)
      }
    })
  }

  reset(value?: Partial<T>) {
    Object.keys(this.controls).forEach(key => {
      this.controls[key].reset(value?.[key])
    })
  }
}
