import { useEffect, useState } from "react";
import { AbstractControl } from "../core/AbstractControl";
import { useFormContext } from "./context";

export function useControl<T = any>(name: string) {
  const form = useFormContext();
  const control = form.get(name) as AbstractControl<T>;

  const [, setTick] = useState(0);

  useEffect(() => {
    const unsub = control.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsub;
  }, [control]);

  const onChange = (value: T) => {
    control.setValue(value);
  };

  const onBlur = () => {
    control.markAsTouched();
  };

  return {
    value: control.value,
    setValue: control.setValue.bind(control),
    onChange,
    onBlur,
    touched: control.touched,
    dirty: control.dirty,
    valid: control.valid,
    invalid: control.invalid,
    pending: control.pending,
    errors: control.errors,
    status: control.status,
  };
}
