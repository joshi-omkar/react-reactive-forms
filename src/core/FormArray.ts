import { AbstractControl } from "./AbstractControl";

export class FormArray<T = any> extends AbstractControl<T[]> {
  controls: AbstractControl<T>[];

  constructor(controls: AbstractControl<T>[]) {
    super();
    this.controls = controls;

    this.controls.forEach((control) => {
      control.subscribe(() => this.updateValueAndValidity());
    });

    this.updateValueAndValidity();
  }

  at(index: number) {
    return this.controls[index];
  }

  push(control: AbstractControl<T>) {
    this.controls.push(control);
    control.subscribe(() => this.updateValueAndValidity());
    this.updateValueAndValidity();
  }

  removeAt(index: number) {
    this.controls.splice(index, 1);
    this.updateValueAndValidity();
  }

  setValue(values: T[]) {
    values.forEach((value, index) => {
      if (this.controls[index]) {
        this.controls[index].setValue(value);
      }
    });
  }

  protected calculateValue(): T[] {
    return this.controls.map((c) => c.value);
  }

  async updateValueAndValidity() {
    this._value = this.calculateValue();

    let hasInvalid = false;
    let hasPending = false;

    for (const control of this.controls) {
      if (control.pending) hasPending = true;
      if (control.invalid) hasInvalid = true;
    }

    if (hasPending) {
      this._status = "PENDING";
    } else if (hasInvalid) {
      this._status = "INVALID";
    } else {
      this._status = "VALID";
    }

    this.notify();
  }
}
