import {
  ValidatorFn,
  AsyncValidatorFn,
  ValidationErrors,
  ControlStatus,
  Listener,
} from '../types'

export abstract class AbstractControl<T = any> {
  protected _value!: T
  protected _status: ControlStatus = 'VALID'
  protected _errors: ValidationErrors | null = null

  protected _dirty = false
  protected _touched = false

  protected _parent: AbstractControl<any> | null = null

  protected _validators: ValidatorFn<T>[]
  protected _asyncValidators: AsyncValidatorFn<T>[]

  private listeners: Set<Listener> = new Set()

  constructor(
    validators: ValidatorFn<T>[] = [],
    asyncValidators: AsyncValidatorFn<T>[] = []
  ) {
    this._validators = validators
    this._asyncValidators = asyncValidators
  }

  // ----------------------
  // Public Getters
  // ----------------------

  get value(): T {
    return this._value
  }

  get status(): ControlStatus {
    return this._status
  }

  get valid(): boolean {
    return this._status === 'VALID'
  }

  get invalid(): boolean {
    return this._status === 'INVALID'
  }

  get pending(): boolean {
    return this._status === 'PENDING'
  }

  get errors(): ValidationErrors | null {
    return this._errors
  }

  get dirty(): boolean {
    return this._dirty
  }

  get touched(): boolean {
    return this._touched
  }

  get parent(): AbstractControl<any> | null {
    return this._parent
  }

  // ----------------------
  // State Marking
  // ----------------------

  markAsDirty() {
    this._dirty = true
    this._parent?.markAsDirty()
  }

  markAsPristine() {
    this._dirty = false
  }

  markAsTouched() {
    this._touched = true
    this._parent?.markAsTouched()
  }

  markAsUntouched() {
    this._touched = false
  }

  setParent(parent: AbstractControl<any>) {
    this._parent = parent
  }

  // ----------------------
  // Validation
  // ----------------------

  updateValueAndValidity() {
    this._runSyncValidators()

    if (this._status === 'INVALID') {
      this.emit()
      return
    }

    if (this._asyncValidators.length > 0) {
      this._runAsyncValidators()
    } else {
      this._status = 'VALID'
      this.emit()
    }
  }

  private _runSyncValidators() {
    let errors: ValidationErrors | null = null

    for (const validator of this._validators) {
      const result = validator(this._value)
      if (result) {
        errors = { ...{errors}, ...result }
      }
    }

    this._errors = errors
    this._status = errors ? 'INVALID' : 'VALID'
  }

  private async _runAsyncValidators() {
    this._status = 'PENDING'
    this.emit()

    let errors: ValidationErrors | null = null

    for (const validator of this._asyncValidators) {
      const result = await validator(this._value)
      if (result) {
        errors = { ...{errors}, ...result }
      }
    }

    this._errors = errors
    this._status = errors ? 'INVALID' : 'VALID'
    this.emit()
  }

  // ----------------------
  // Subscription System
  // ----------------------

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  protected emit() {
    this.listeners.forEach(listener => listener())
    this._parent?.emit()
  }

  // ----------------------
  // Abstract Methods
  // ----------------------

  abstract setValue(value: T): void
  abstract patchValue(value: Partial<T>): void
  abstract reset(value?: T): void
}
