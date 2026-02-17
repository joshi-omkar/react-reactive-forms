import { ValidatorFn } from "../types/validator";

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const email: ValidatorFn<string> = (value) => {
  if (!value) return null;

  return EMAIL_REGEX.test(value)
    ? null
    : { email: true };
};
