import { z } from "zod";
import { describe, expect, it } from "vitest";

import { prepareZodSchemaForFormValidation, stripCheckRegexError, stripSchemaLevelRegexErrors } from "./zod.helpers";

import type { ZodInternalCheck, ZodInternalObjectSchema, ZodInternalSchema } from "#shared/types/zod.types";

const SLUG_REGEX = /^[\da-z]+(?:-[\da-z]+)*$/u;
const HEX_COLOR_REGEX = /^#[\dA-Fa-f]{6}$/u;

function getRegexCheck(schema?: ZodInternalSchema): ZodInternalCheck {
  if (!schema) {
    throw new Error("Schema is undefined");
  }
  const { def } = schema._zod;
  const check = def.checks?.find(internalCheck => internalCheck._zod.def.format === "regex");

  if (!check) {
    throw new Error("No regex check found");
  }
  return check;
}

describe(stripCheckRegexError, () => {
  describe(stripCheckRegexError, () => {
    it("should return the same check reference when the check format is not regex.", () => {
      const check: ZodInternalCheck = { _zod: { def: { format: "min", error: "min length error" } } };

      const result = stripCheckRegexError(check);

      expect(result).toBe(check);
    });

    it("should return a different check reference when the check format is regex.", () => {
      const check: ZodInternalCheck = { _zod: { def: { format: "regex", error: "hardcoded error" } } };

      const result = stripCheckRegexError(check);

      expect(result).not.toBe(check);
    });

    it("should return a new check with only the format property when the check format is regex.", () => {
      const check: ZodInternalCheck = { _zod: { def: { format: "regex", error: "hardcoded error" } } };

      const result = stripCheckRegexError(check);

      expect(result._zod.def).toStrictEqual({ format: "regex" });
    });

    it("should not mutate the original check when the check format is regex.", () => {
      const check: ZodInternalCheck = { _zod: { def: { format: "regex", error: "hardcoded error" } } };

      stripCheckRegexError(check);

      expect(check._zod.def).toStrictEqual({ format: "regex", error: "hardcoded error" });
    });
  });

  describe(stripSchemaLevelRegexErrors, () => {
    it("should return a different schema reference when the schema has a regex check with a defined error.", () => {
      const schema = z.string().regex(SLUG_REGEX, { error: "hardcoded error" });

      const result = stripSchemaLevelRegexErrors(schema);

      expect(result).not.toBe(schema);
    });

    it("should return a new schema with the error property removed from the regex check when the schema has a regex check with a defined error.", () => {
      const schema = z.string().regex(SLUG_REGEX, { error: "hardcoded error" });

      const result = stripSchemaLevelRegexErrors(schema);

      expect(getRegexCheck(result)._zod.def).not.toHaveProperty("error");
    });

    it("should not mutate the original schema when the schema has a regex check with a defined error.", () => {
      const schema = z.string().regex(SLUG_REGEX, { error: "hardcoded error" });

      stripSchemaLevelRegexErrors(schema);

      expect(getRegexCheck(schema)._zod.def).toHaveProperty("error");
    });

    it("should return a new schema with the error property removed from the inner type when the schema is optional with a regex check.", () => {
      const innerSchema = z.string().regex(HEX_COLOR_REGEX, { error: "hardcoded error" });
      const schema = innerSchema.optional();

      const result = stripSchemaLevelRegexErrors(schema);
      const resultInner = result._zod.def.innerType;

      expect(getRegexCheck(resultInner)._zod.def).not.toHaveProperty("error");
    });

    it("should not mutate the original inner schema when the schema is optional with a regex check.", () => {
      const innerSchema = z.string().regex(HEX_COLOR_REGEX, { error: "hardcoded error" });
      const schema = innerSchema.optional();

      stripSchemaLevelRegexErrors(schema);

      expect(getRegexCheck(innerSchema)._zod.def).toHaveProperty("error");
    });

    it("should return the same schema reference when the schema is a plain string with no checks defined.", () => {
      const schema = z.string();

      const result = stripSchemaLevelRegexErrors(schema);

      expect(result).toBe(schema);
    });

    it("should preserve the error property on non-regex checks when the schema has a min length check with error.", () => {
      const schema = z.string().min(3, { error: "min length error" });

      const result = stripSchemaLevelRegexErrors(schema);

      const minCheck = result._zod.def.checks?.find(internalCheck => internalCheck._zod.def.format !== "regex");

      expect(minCheck?._zod.def).toHaveProperty("error");
    });
  });

  describe(prepareZodSchemaForFormValidation, () => {
    it("should return a new schema with the error property removed from a regex check when the field has a hardcoded regex error.", () => {
      const schema = z.object({
        slug: z.string().regex(SLUG_REGEX, { error: "hardcoded error" }),
      });

      const result = prepareZodSchemaForFormValidation(schema);
      const resultSlugField = result._zod.def.shape.slug;

      expect(getRegexCheck(resultSlugField)._zod.def).not.toHaveProperty("error");
    });

    it("should not mutate the original schema when the field has a hardcoded regex error.", () => {
      const schema = z.object({
        slug: z.string().regex(SLUG_REGEX, { error: "hardcoded error" }),
      });

      prepareZodSchemaForFormValidation(schema);

      expect(getRegexCheck(schema.def.shape.slug)._zod.def).toHaveProperty("error");
    });

    it("should return a new schema with the error removed from an optional field's inner regex check when the field has a hardcoded regex error.", () => {
      const schema = z.object({
        color: z.string().regex(HEX_COLOR_REGEX, { error: "hardcoded error" }).optional(),
      });

      const result = prepareZodSchemaForFormValidation(schema);
      const resultInner = result._zod.def.shape.color._zod.def.innerType;

      expect(getRegexCheck(resultInner)._zod.def).not.toHaveProperty("error");
    });

    it("should preserve the error property on non-regex checks when the schema has mixed field types.", () => {
      const schema = z.object({
        slug: z.string().regex(SLUG_REGEX, { error: "hardcoded error" }),
        name: z.string().min(3, { error: "min length error" }),
      });

      const result = prepareZodSchemaForFormValidation(schema);
      const resultNameField = result._zod.def.shape.name as unknown as ZodInternalSchema;

      const minCheck = resultNameField._zod.def.checks?.find(internalCheck => internalCheck._zod.def.format !== "regex");

      expect(minCheck?._zod.def).toHaveProperty("error");
    });

    it("should return a schema whose _zod descriptor is not writable when the field has a hardcoded regex error.", () => {
      const schema = z.object({
        slug: z.string().regex(SLUG_REGEX, { error: "hardcoded error" }),
      });

      const result = prepareZodSchemaForFormValidation(schema);
      const descriptor = Object.getOwnPropertyDescriptor(result, "_zod");

      expect(descriptor?.writable).toBe(false);
    });

    it("should return a schema whose _zod descriptor is not enumerable when the field has a hardcoded regex error.", () => {
      const schema = z.object({
        slug: z.string().regex(SLUG_REGEX, { error: "hardcoded error" }),
      });

      const result = prepareZodSchemaForFormValidation(schema);
      const descriptor = Object.getOwnPropertyDescriptor(result, "_zod");

      expect(descriptor?.enumerable).toBe(false);
    });

    it("should return a schema whose _zod descriptor is not configurable when the field has a hardcoded regex error.", () => {
      const schema = z.object({
        slug: z.string().regex(SLUG_REGEX, { error: "hardcoded error" }),
      });

      const result = prepareZodSchemaForFormValidation(schema);
      const descriptor = Object.getOwnPropertyDescriptor(result, "_zod");

      expect(descriptor?.configurable).toBe(false);
    });

    it("should return the same schema reference when the schema has no shape property.", () => {
      const schemaWithoutShape: ZodInternalObjectSchema = { _zod: { def: {} } };

      const result = prepareZodSchemaForFormValidation(schemaWithoutShape);

      expect(result).toBe(schemaWithoutShape);
    });
  });
});