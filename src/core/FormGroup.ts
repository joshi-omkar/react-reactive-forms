import { AbstractControl } from "./AbstractControl";
import { ValidationErrors } from "./types";

type Controls<T> = {
  [K in keyof T]: AbstractControl<T[K]>;
};

export class FormGroup<T extends Record<string, any>> extends AbstractControl<T> {
  controls: Controls<T>;

  constructor(controls: Controls<T>) {
    super();
    this.controls = controls;

    Object.values(this.controls).forEach((control) => {
      control.subscribe(() => {
        this.updateValueAndValidity();
      });
    });

    this.updateValueAndValidity();
  }

  get<K extends keyof T>(key: K): AbstractControl<T[K]> {
    return this.controls[key];
  }

  setValue(value: T) {
    Object.keys(value).forEach((key) => {
      if (this.controls[key]) {
        this.controls[key].setValue(value[key]);
      }
    });
  }

  patchValue(value: Partial<T>) {
    Object.keys(value).forEach((key) => {
      if (this.controls[key]) {
        this.controls[key].setValue(value[key] as any);
      }
    });
  }

  protected calculateValue(): T {
    const result = {} as T;
    for (const key in this.controls) {
      result[key] = this.controls[key].value;
    }
    return result;
  }

  async updateValueAndValidity() {
    this._value = this.calculateValue();

    let hasInvalid = false;
    let hasPending = false;

    for (const key in this.controls) {
      const control = this.controls[key];
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
