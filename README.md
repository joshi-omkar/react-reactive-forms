# Simple Form Kit

A lightweight, zero-dependency React form state and validation library inspired by Angular Reactive Forms.

- ✅ Zero runtime dependencies
- ✅ Type-safe
- ✅ Composable validators
- ✅ Context-based architecture
- ✅ Tree-shakeable
- ✅ Lightweight & fast

---

## Installation

```bash
npm i reactive-formify
```

---

## Quick Start

```tsx
import React from "react";
import {
  useForm,
  FormProvider,
  required,
  minLength
} from "reactive-formify";

function MyForm() {
  const form = useForm({
    initialValues: {
      name: "",
      password: ""
    }
  });

  return (
    <FormProvider form={form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <input
          value={form.values.name}
          onChange={(e) => form.setValue("name", e.target.value)}
        />
        {form.errors.name && <p>{form.errors.name}</p>}

        <input
          type="password"
          value={form.values.password}
          onChange={(e) => form.setValue("password", e.target.value)}
        />
        {form.errors.password && <p>{form.errors.password}</p>}

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

---

## Validators

Built-in validators:

- `required`
- `minLength`
- `maxLength`
- `pattern`
- `email`
- `composeValidators`

### Example

```ts
import { required, minLength } from "reactive-formify";

const nameValidator = composeValidators(
  required("Name is required"),
  minLength(3, "Minimum 3 characters")
);
```

---

## API

### `useForm(options)`

Creates and manages form state.

#### Options

```ts
{
  initialValues: Record<string, any>;
}
```

#### Returns

```ts
{
  values: FormValues;
  errors: FormErrors;
  touched: Record<string, boolean>;
  setValue: (path: string, value: any) => void;
  handleSubmit: (onValid: (values) => void) => (e) => void;
  reset: () => void;
}
```

---

### `FormProvider`

Provides form instance through React context.

```tsx
<FormProvider form={form}>
  {children}
</FormProvider>
```

---

### `useFormContext()`

Access form instance from nested components.

```tsx
const form = useFormContext();
```

---

## Composing Validators

```ts
import { composeValidators } from "reactive-formify";

const validator = composeValidators(
  required(),
  minLength(5)
);
```

Validators return:

```
string | null
```

- `null` → valid
- `string` → error message

---

## Why This Library?

This library was built to:

- Provide Angular Reactive Forms–like architecture in React
- Keep full control over state
- Avoid heavy abstraction layers
- Stay dependency-free
- Be fully TypeScript friendly

---

## Design Principles

- Minimal API surface
- Maximum flexibility
- Composable architecture
- Predictable state updates
- Small bundle size

---

## Roadmap

- [ ] Async validators
- [ ] FieldArray support
- [ ] Nested object support
- [ ] DevTools integration
- [ ] Performance optimizations
- [ ] Schema-based validation mode

---

## Contributing

Pull requests are welcome.

If you’d like to discuss major changes, open an issue first.

---

## Author
Omkar Joshi  
GitHub: https://github.com/joshi-omkar
