type ZodInternalCheck = { _zod: { def: { format?: string; error?: unknown } } };

type ZodInternalDefinition = { checks?: ZodInternalCheck[]; innerType?: ZodInternalSchema };

type ZodInternalSchema = { _zod: { def: ZodInternalDefinition } };

type ZodInternalObjectSchema = { _zod: { def: ZodInternalDefinition & { shape?: Record<string, ZodInternalSchema> } } };

export type {
  ZodInternalCheck,
  ZodInternalDefinition,
  ZodInternalObjectSchema,
  ZodInternalSchema,
};