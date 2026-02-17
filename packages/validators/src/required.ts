import { ValidatorFn } from "../types/validator";
import { isEmpty } from "../utils/isEmpty";

export const required: ValidatorFn = (value) => {
  if (isEmpty(value)) {
    return { required: true };
  }
  return null;
};
