import { AbstractControl } from '../abstract/AbstractControl'
import { createDirtyTracker } from './dirtyTracker'
import { createTouchedTracker } from './touchedTracker'

export interface FormState {
  value: any
  valid: boolean
  invalid: boolean
  pending: boolean
  dirty: boolean
  pristine: boolean
  touched: boolean
  untouched: boolean
  errors: any
}

export function createFormState(
  control: AbstractControl<any>
): FormState {
  const dirtyTracker = createDirtyTracker(control)
  const touchedTracker = createTouchedTracker(control)

  const state: FormState = {
    value: control.value,
    valid: control.valid,
    invalid: control.invalid,
    pending: control.pending,
    dirty: dirtyTracker.dirty,
    pristine: dirtyTracker.pristine,
    touched: touchedTracker.touched,
    untouched: touchedTracker.untouched,
    errors: control.errors,
  }

  const compute = () => {
    state.value = control.value
    state.valid = control.valid
    state.invalid = control.invalid
    state.pending = control.pending
    state.errors = control.errors

    state.dirty = dirtyTracker.dirty
    state.pristine = dirtyTracker.pristine

    state.touched = touchedTracker.touched
    state.untouched = touchedTracker.untouched
  }

  control.subscribe(compute)
  compute()

  return state
}
