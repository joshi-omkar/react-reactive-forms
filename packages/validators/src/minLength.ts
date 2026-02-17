import { ValidatorFn } from "../types/validator";

export function minLength(length: number): ValidatorFn<string> {
  return (value) => {
    if (!value) return null;

    if (value.length < length) {
      return {
        minLength: {
          requiredLength: length,
          actualLength: value.length,
        },
      };
    }

    return null;
  };
}
