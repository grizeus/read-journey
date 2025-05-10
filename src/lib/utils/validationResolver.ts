import { useCallback } from "react";
import type { AnySchema, ValidationError } from "yup";

interface FormValues {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface FormErrors {
  [key: string]: {
    type: string;
    message: string;
  };
}

interface ResolverResult {
  values: FormValues;
  errors: FormErrors;
}

export const useYupValidationResolver = <T extends FormValues>(
  validationSchema: AnySchema<T>
): ((data: T) => Promise<ResolverResult>) =>
  useCallback(
    async (data: T) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (errors: any) {
        return {
          values: {} as FormValues,
          errors: (errors as ValidationError).inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path!]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );
