import React, { createContext, useContext } from "react";
import { FormGroup } from "../core/FormGroup";

type FormContextType = FormGroup<any> | null;

const FormContext = createContext<FormContextType>(null);

export const FormProvider = ({
  form,
  children,
}: {
  form: FormGroup<any>;
  children: React.ReactNode;
}) => {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used inside FormProvider");
  }
  return context;
};
