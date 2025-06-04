import { useCallback } from "react";
import type { FieldErrors, ResolverResult } from "react-hook-form";
import { ValidationError, type AnySchema } from "yup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useYupValidationResolver = <T extends Record<string, any>>(
  validationSchema: AnySchema<T>
): ((data: T) => Promise<ResolverResult<T>>) =>
  useCallback(
    async (data: T): Promise<ResolverResult<T>> => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {} as FieldErrors<T>,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (errors: any) {
        const fieldErrors: FieldErrors<T> = {};

        if (errors instanceof ValidationError) {
          errors.inner.forEach(error => {
            if (error.path) {
              fieldErrors[error.path as keyof T] = {
                type: error.type ?? "validation",
                message: error.message,
              } as FieldErrors<T>[keyof T];
            }
          });
        }

        return {
          values: {} as T,
          errors: fieldErrors,
        };
      }
    },
    [validationSchema]
  );
