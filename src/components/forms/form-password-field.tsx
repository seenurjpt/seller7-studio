"use client";

import { FieldError, InputGroup, Label, TextField } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type FormPasswordFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  autoComplete?: string;
};

export function FormPasswordField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "••••••••",
  isRequired,
  autoComplete = "current-password",
}: FormPasswordFieldProps<T>) {
  const [visible, setVisible] = useState(false);

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
          <InputGroup fullWidth>
            <InputGroup.Input
              placeholder={placeholder}
              type={visible ? "text" : "password"}
              autoComplete={autoComplete}
            />
            <InputGroup.Suffix>
              <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-ink"
                aria-label={visible ? "Hide password" : "Show password"}
              >
                {visible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </InputGroup.Suffix>
          </InputGroup>
          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  );
}
