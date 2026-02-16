import { ControlStatus } from "./controlStatus";
import {
  ValidatorFn,
  AsyncValidatorFn,
  ValidationErrors,
  ControlUpdateFn,
} from "./types";

export abstract class AbstractControl<T = any> {
  protected _value!: T;
  protected _status: ControlStatus = "VALID";
  protected _errors: ValidationErrors = null;
  protected _touched = false;
  protected _dirty = false;

  protected validators: ValidatorFn<T>[];
  protected asyncValidators: AsyncValidatorFn<T>[];

  private subscribers = new Set<ControlUpdateFn>();

  constructor(
    validators: ValidatorFn<T>[] = [],
    asyncValidators: AsyncValidatorFn<T>[] = []
  ) {
    this.validators = validators;
    this.asyncValidators = asyncValidators;
  }

  get value(): T {
    return this._value;
  }

  get status(): ControlStatus {
    return this._status;
  }

  get valid(): boolean {
    return this._status === "VALID";
  }

  get invalid(): boolean {
    return this._status === "INVALID";
  }

  get pending(): boolean {
    return this._status === "PENDING";
  }

  get errors(): ValidationErrors {
    return this._errors;
  }

  get touched(): boolean {
    return this._touched;
  }

  get dirty(): boolean {
    return this._dirty;
  }

  markAsTouched() {
    this._touched = true;
    this.notify();
  }

  markAsDirty() {
    this._dirty = true;
    this.notify();
  }

  disable() {
    this._status = "DISABLED";
    this.notify();
  }

  enable() {
    this._status = "VALID";
    this.updateValueAndValidity();
  }

  subscribe(fn: ControlUpdateFn) {
    this.subscribers.add(fn);
    return () => {
        this.subscribers.delete(fn);
      };
    
  }

  protected notify() {
    this.subscribers.forEach((fn) => fn());
  }

  protected runValidators(): ValidationErrors {
    for (const validator of this.validators) {
      const error = validator(this._value, this);
      if (error) return error;
    }
    return null;
  }

  protected async runAsyncValidators(): Promise<ValidationErrors> {
    for (const validator of this.asyncValidators) {
      const error = await validator(this._value, this);
      if (error) return error;
    }
    return null;
  }

  async updateValueAndValidity() {
    if (this._status === "DISABLED") return;

    this._errors = this.runValidators();

    if (this._errors) {
      this._status = "INVALID";
      this.notify();
      return;
    }

    if (this.asyncValidators.length > 0) {
      this._status = "PENDING";
      this.notify();

      const asyncErrors = await this.runAsyncValidators();
      this._errors = asyncErrors;
      this._status = asyncErrors ? "INVALID" : "VALID";
      this.notify();
      return;
    }

    this._status = "VALID";
    this.notify();
  }

  abstract setValue(value: T): void;
}
