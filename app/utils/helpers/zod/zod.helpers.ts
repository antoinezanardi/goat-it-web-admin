import type { ZodInternalObjectSchema, ZodInternalSchema } from "#shared/types/zod.types";

function stripSchemaLevelRegexErrors(schema: ZodInternalSchema): void {
  const { def } = schema._zod;

  if (def.innerType) {
    stripSchemaLevelRegexErrors(def.innerType);

    return;
  }

  if (!def.checks) {
    return;
  }

  for (const check of def.checks) {
    if (check._zod.def.format === "regex") {
      delete check._zod.def.error;
    }
  }
}

function prepareZodSchemaForFormValidation(schema: ZodInternalObjectSchema): void {
  const { def } = schema._zod;
  if (!def.shape) {
    return;
  }

  for (const fieldSchema of Object.values(def.shape)) {
    stripSchemaLevelRegexErrors(fieldSchema);
  }
}

export {
  prepareZodSchemaForFormValidation,
  stripSchemaLevelRegexErrors,
};