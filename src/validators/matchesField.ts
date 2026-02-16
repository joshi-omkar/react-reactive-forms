import { ValidatorFn } from "../types/validator";

export function matchesField(fieldName: string): ValidatorFn {
  return (value, control) => {
    if (!control?.parent) return null;

    const sibling = control.parent.get(fieldName);

    if (!sibling) return null;

    return value !== sibling.value
      ? { matchesField: { field: fieldName } }
      : null;
  };
}
