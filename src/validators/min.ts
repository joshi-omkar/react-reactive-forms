import { ValidatorFn } from "../types/validator";

export function min(minValue: number): ValidatorFn<number> {
  return (value) => {
    if (value == null) return null;

    return value < minValue
      ? { min: { min: minValue, actual: value } }
      : null;
  };
}
