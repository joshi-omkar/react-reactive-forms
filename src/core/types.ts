import { ControlStatus } from "./controlStatus";

export type ValidationErrors = Record<string, any> | null;

export type ValidatorFn<T = any> = (
  value: T,
  control?: any
) => ValidationErrors;

export type AsyncValidatorFn<T = any> = (
  value: T,
  control?: any
) => Promise<ValidationErrors>;

export type ControlUpdateFn = () => void;
