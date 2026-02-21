import { useSyncExternalStore } from 'react'
import { AbstractControl } from '@react-formflow/core'

export function useFormState<T>(
  control: AbstractControl<T>
) {
  return useSyncExternalStore(
    (callback) => control.subscribe(callback),
    () => ({
      value: control.value,
      valid: control.valid,
      invalid: control.invalid,
      pending: control.pending,
      errors: control.errors,
      dirty: control.dirty,
      touched: control.touched,
    })
  )
}
