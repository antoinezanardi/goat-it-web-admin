import type { ZodInternalCheck, ZodInternalObjectSchema, ZodInternalSchema } from "#shared/types/zod.types";

function stripCheckRegexError(check: ZodInternalCheck): ZodInternalCheck {
  if (check._zod.def.format !== "regex") {
    return check;
  }
  const { error: _error, ...definitionWithoutError } = check._zod.def;

  return { _zod: { ...check._zod, def: definitionWithoutError } };
}

function stripSchemaLevelRegexErrors(schema: ZodInternalSchema): ZodInternalSchema {
  const { def } = schema._zod;

  if (def.innerType) {
    return { _zod: { ...schema._zod, def: { ...def, innerType: stripSchemaLevelRegexErrors(def.innerType) } } };
  }

  if (!def.checks) {
    return schema;
  }
  return { _zod: { ...schema._zod, def: { ...def, checks: def.checks.map(stripCheckRegexError) } } };
}

/**
 * Prepares a Zod object schema for use with form validation by stripping custom error messages from regex checks.
 *
 * Nuxt UI form validation displays check-level error messages directly. When a regex check includes a custom `error`,
 * it overrides the localized message provided by the Zod locale plugin. This function removes those `error` properties
 * from every regex check in the schema's shape so that the default i18n validation messages are shown instead.
 *
 * @template T - A Zod internal object schema type.
 * @param schema - The Zod object schema to prepare.
 * @returns A new schema instance with regex error overrides removed from all field checks.
 */
function prepareZodSchemaForFormValidation<T extends ZodInternalObjectSchema>(schema: T): T {
  const { def } = schema._zod;
  if (!def.shape) {
    return schema;
  }
  const strippedShape = Object.fromEntries(Object.entries(def.shape).map(([key, fieldSchema]) => [key, stripSchemaLevelRegexErrors(fieldSchema)]));
  const descriptors = Object.getOwnPropertyDescriptors(schema);
  descriptors._zod = { value: { ...schema._zod, def: { ...def, shape: strippedShape } }, writable: false, enumerable: false, configurable: false };

  // Acceptable as Object.create preserves the original Zod schema prototype and Standard Schema protocol
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion, typescript/no-unsafe-argument
  return Object.create(Object.getPrototypeOf(schema), descriptors) as T;
}

export {
  prepareZodSchemaForFormValidation,
  stripCheckRegexError,
  stripSchemaLevelRegexErrors,
};