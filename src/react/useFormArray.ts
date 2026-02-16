import { useEffect, useState } from "react";
import { FormArray } from "../core/FormArray";
import { useFormContext } from "./context";

export function useFormArray<T = any>(name: string) {
  const form = useFormContext();
  const array = form.get(name) as FormArray<T>;

  const [, setTick] = useState(0);

  useEffect(() => {
    const unsub = array.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsub;
  }, [array]);

  return {
    controls: array.controls,
    value: array.value,
    push: array.push.bind(array),
    removeAt: array.removeAt.bind(array),
    valid: array.valid,
    invalid: array.invalid,
  };
}
