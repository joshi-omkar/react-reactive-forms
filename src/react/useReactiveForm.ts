import { useEffect, useState } from "react";
import { FormGroup } from "../core/FormGroup";

export function useReactiveForm<T extends Record<string, any>>(
  form: FormGroup<T>
) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = form.subscribe(() => {
      setTick((t) => t + 1);
    });

    return unsubscribe;
  }, [form]);

  const handleSubmit =
    (onSubmit: (value: T) => void) =>
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      if (form.valid) {
        onSubmit(form.value);
      }
    };

  return {
    form,
    value: form.value,
    valid: form.valid,
    invalid: form.invalid,
    pending: form.pending,
    errors: form.errors,
    handleSubmit,
  };
}
