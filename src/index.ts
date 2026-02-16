// ===============================
// Types
// ===============================

import {
  email,
  matchesField,
  max,
  maxLength,
  min,
  minLength,
  oneOf,
  pattern,
  required,
} from "./validators";

export type { ValidationErrors, ValidatorFn, AsyncValidatorFn } from "./types";

// ===============================
// Context
// ===============================

export { FormProvider, useFormContext } from "./react/context";

// ===============================
// Hook
// ===============================

export { useReactiveForm } from "./react/useReactiveForm";

// ===============================
// Utils
// ===============================

export { isEmpty } from "./utils/isEmpty";

// ===============================
// Validators
// ===============================

export { required } from "./validators/required";

export { minLength } from "./validators/minLength";

export { maxLength } from "./validators/maxLength";

export { pattern } from "./validators/pattern";

export { email } from "./validators/email";

// ===============================
// Named Validator Bundle (Optional Convenience Export)
// ===============================

export const validators = {
  required,
  minLength,
  maxLength,
  email,
  pattern,
  min,
  max,
  matchesField,
  oneOf,
};
