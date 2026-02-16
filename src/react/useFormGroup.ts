import { useEffect, useState } from "react";
import { FormGroup } from "../core/FormGroup";
import { useFormContext } from "./context";

export function useFormGroup<T = any>(name?: string) {
  const parent = useFormContext();
  const group = name ? (parent.get(name) as FormGroup<Record<string, any>>) : parent;

  const [, setTick] = useState(0);

  useEffect(() => {
    const unsub = group.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsub;
  }, [group]);

  return group;
}
