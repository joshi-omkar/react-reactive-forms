import { useRef } from 'react'
import { useFormState } from './useFormState'
import { FormGroup } from '@react-formflow/core'

interface UseFormOptions<T extends Record<string, any>> {
  form: FormGroup<T>
}

export function useForm<T extends Record<string, any>>({
  form,
}: UseFormOptions<T>) {
  const formRef = useRef(form)

  const state = useFormState(formRef.current)

  const handleSubmit =
    (onValid: (value: T) => void) =>
    (e?: React.FormEvent) => {
      if (e) e.preventDefault()

      formRef.current.updateValueAndValidity()

      if (formRef.current.valid) {
        onValid(formRef.current.value)
      }
    }

  return {
    form: formRef.current,
    handleSubmit,
    formState: state,
  }
}
