
export const required: ValidatorFn = (value) => {
  if (isEmpty(value)) {
    return { required: true };
  }
  return null;
};
