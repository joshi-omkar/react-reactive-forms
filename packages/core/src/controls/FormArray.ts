import { AbstractControl } from '../abstract/AbstractControl'
import { ValidatorFn, AsyncValidatorFn } from '../types'

export class FormArray<T = any> extends AbstractControl<T[]> {
  controls: AbstractControl<T>[]

  constructor(
    controls: AbstractControl<T>[],
    validators: ValidatorFn<T[]>[] = [],
    asyncValidators: AsyncValidatorFn<T[]>[] = []
  ) {
    super(validators, asyncValidators)
    this.controls = controls

    this.controls.forEach(control => {
      control.setParent(this)
      control.subscribe(() => this.updateValue())
    })

    this.updateValue()
  }

  private updateValue() {
    this._value = this.controls.map(control => control.value)
    this.updateValueAndValidity()
    this.emit()
  }

  at(index: number): AbstractControl<T> {
    return this.controls[index]
  }

  push(control: AbstractControl<T>) {
    control.setParent(this)
    control.subscribe(() => this.updateValue())
    this.controls.push(control)
    this.updateValue()
  }

  removeAt(index: number) {
    this.controls.splice(index, 1)
    this.updateValue()
  }

  setValue(values: T[]) {
    values.forEach((value, index) => {
      if (this.controls[index]) {
        this.controls[index].setValue(value)
      }
    })
  }

  patchValue(values: Partial<T[]>) {
    values.forEach((value, index) => {
      if (this.controls[index]) {
        this.controls[index].patchValue(value as any)
      }
    })
  }

  reset(values?: T[]) {
    this.controls.forEach((control, index) => {
      control.reset(values?.[index])
    })
  }
}
