import { ValidatorFn } from "../types/validator";

export function maxLength(length: number): ValidatorFn<string> {
  return (value) => {
    if (!value) return null;

    if (value.length > length) {
      return {
        maxLength: {
          requiredLength: length,
          actualLength: value.length,
        },
      };
    }

    return null;
  };
}
