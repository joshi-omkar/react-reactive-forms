// -----------------------------
// Validation
// -----------------------------

export type ValidationErrors = {
  [key: string]: any
}

export type ValidatorFn<T = any> = (
  value: T
) => ValidationErrors | null

export type AsyncValidatorFn<T = any> = (
  value: T
) => Promise<ValidationErrors | null>

// -----------------------------
// Control Status
// -----------------------------

export type ControlStatus =
  | 'VALID'
  | 'INVALID'
  | 'PENDING'
  | 'DISABLED'

// -----------------------------
// Subscription System
// -----------------------------

export type Listener<T = any> = (value?: T) => void

// -----------------------------
// Optional: Control Options
// (useful later for config)
// -----------------------------

export interface ControlOptions<T = any> {
  validators?: ValidatorFn<T>[]
  asyncValidators?: AsyncValidatorFn<T>[]
  updateOn?: 'change' | 'blur' | 'submit'
}
