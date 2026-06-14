"use client";

import {
  Description,
  FieldError,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import type { HTMLInputTypeAttribute } from "react";

type FormTextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  isRequired?: boolean;
  autoComplete?: string;
};

export function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  type = "text",
  isRequired,
  autoComplete,
}: FormTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          name={field.name}
          value={field.value ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          isInvalid={fieldState.invalid}
          isRequired={isRequired}
          validationBehavior="aria"
          fullWidth
        >
          <Label>{label}</Label>
          <Input
            placeholder={placeholder}
            type={type}
            autoComplete={autoComplete}
          />
          {description ? <Description>{description}</Description> : null}
          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  );
}
