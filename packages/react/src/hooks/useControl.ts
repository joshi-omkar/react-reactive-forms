import { useSyncExternalStore } from 'react'
import { FormControl } from '@react-formflow/core'

export function useControl<T>(
  control: FormControl<T>
) {
  const state = useSyncExternalStore(
    (callback) => control.subscribe(callback),
    () => ({
      value: control.value,
      valid: control.valid,
      invalid: control.invalid,
      errors: control.errors,
      dirty: control.dirty,
      touched: control.touched,
    })
  )

  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    control.setValue(
      (e.target.value as unknown) as T
    )
  }

  function onBlur() {
    control.markAsTouched()
  }

  return {
    ...state,
    onChange,
    onBlur,
  }
}
