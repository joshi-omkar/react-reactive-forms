import { ValidatorFn } from "../types/validator";

export function oneOf(values: any[]): ValidatorFn {
  return (value) => {
    return values.includes(value)
      ? null
      : { oneOf: { allowedValues: values } };
  };
}
