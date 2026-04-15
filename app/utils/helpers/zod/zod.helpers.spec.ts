import { z } from "zod";
import { describe, expect, it } from "vitest";

import type { ZodInternalCheck, ZodInternalSchema } from "#shared/types/zod.types";
import { prepareZodSchemaForFormValidation, stripSchemaLevelRegexErrors } from "~/utils/helpers/zod/zod.helpers";

const SLUG_REGEX = /^[\da-z]+(?:-[\da-z]+)*$/u;
const HEX_COLOR_REGEX = /^#[\dA-Fa-f]{6}$/u;

function getRegexCheck(schema: ZodInternalSchema): ZodInternalCheck {
  const { def } = schema._zod;
  // oxlint-disable-next-line typescript/no-non-null-assertion
  const check = def.checks!.find(internalCheck => internalCheck._zod.def.format === "regex");

  if (!check) {
    throw new Error("No regex check found");
  }
  return check;
}

describe("Zod Helpers", () => {
  describe(stripSchemaLevelRegexErrors, () => {
    it("should delete the error property from the regex check def when the schema has a regex check with a defined error.", () => {
      const schema = z.string().regex(SLUG_REGEX, { error: "hardcoded error" });

      stripSchemaLevelRegexErrors(schema);

      expect(getRegexCheck(schema)._zod.def).not.toHaveProperty("error");
    });

    it("should recurse into the inner type and delete the error property when the schema is optional with a regex check.", () => {
      const innerSchema = z.string().regex(HEX_COLOR_REGEX, { error: "hardcoded error" });
      const schema = innerSchema.optional();

      stripSchemaLevelRegexErrors(schema);

      expect(getRegexCheck(innerSchema)._zod.def).not.toHaveProperty("error");
    });

    it("should not throw when the schema is a plain string with no checks defined.", () => {
      const schema = z.string();

      expect(() => stripSchemaLevelRegexErrors(schema)).not.toThrow();
    });

    it("should preserve the error property on non-regex checks when the schema has a min length check with error.", () => {
      const schema = z.string().min(3, { error: "min length error" });

      stripSchemaLevelRegexErrors(schema);

      const minCheck = (schema as unknown as ZodInternalSchema)._zod.def.checks?.find(internalCheck => internalCheck._zod.def.format !== "regex");

      expect(minCheck?._zod.def).toHaveProperty("error");
    });
  });

  describe(prepareZodSchemaForFormValidation, () => {
    it("should delete the error property from a regex check in the object schema field when the field has a hardcoded regex error.", () => {
      const schema = z.object({
        slug: z.string().regex(SLUG_REGEX, { error: "hardcoded error" }),
      });

      prepareZodSchemaForFormValidation(schema);

      expect(getRegexCheck(schema.def.shape.slug)._zod.def).not.toHaveProperty("error");
    });

    it("should delete the error property from an optional field's inner regex check when the field has a hardcoded regex error.", () => {
      const innerSchema = z.string().regex(HEX_COLOR_REGEX, { error: "hardcoded error" });
      const schema = z.object({
        color: innerSchema.optional(),
      });

      prepareZodSchemaForFormValidation(schema);

      expect(getRegexCheck(innerSchema)._zod.def).not.toHaveProperty("error");
    });

    it("should preserve the error property on non-regex checks when the schema has mixed field types.", () => {
      const schema = z.object({
        slug: z.string().regex(SLUG_REGEX, { error: "hardcoded error" }),
        name: z.string().min(3, { error: "min length error" }),
      });

      prepareZodSchemaForFormValidation(schema);

      const minCheck = (schema.def.shape.name as unknown as ZodInternalSchema)._zod.def.checks?.find(internalCheck => internalCheck._zod.def.format !== "regex");

      expect(minCheck?._zod.def).toHaveProperty("error");
    });

    it("should not throw when the schema has no shape property.", () => {
      const schemaWithoutShape = { _zod: { def: {} } };

      expect(() => prepareZodSchemaForFormValidation(schemaWithoutShape)).not.toThrow();
    });
  });
});