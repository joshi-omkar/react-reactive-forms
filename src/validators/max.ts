import { ValidatorFn } from "../types/validator";

export function max(maxValue: number): ValidatorFn<number> {
  return (value) => {
    if (value == null) return null;

    return value > maxValue
      ? { max: { max: maxValue, actual: value } }
      : null;
  };
}
