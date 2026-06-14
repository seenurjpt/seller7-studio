"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";

export function useZodForm<TSchema extends z.ZodType<FieldValues>>(
  schema: TSchema,
  options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">
) {
  type Values = z.infer<TSchema>;

  return useForm<Values>({
    ...options,
    resolver: zodResolver(schema as never) as unknown as Resolver<Values>,
  });
}

export type { DefaultValues, FieldValues, UseFormProps, UseFormReturn };
