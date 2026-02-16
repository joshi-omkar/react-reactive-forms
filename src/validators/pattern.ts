import { ValidatorFn } from "../types/validator";

export function pattern(regex: RegExp): ValidatorFn<string> {
  return (value) => {
    if (!value) return null;

    return regex.test(value)
      ? null
      : { pattern: { requiredPattern: regex.toString() } };
  };
}
