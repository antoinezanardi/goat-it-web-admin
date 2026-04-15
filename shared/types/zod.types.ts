import type { z } from "zod";

type ZodInternalCheck = { _zod: { def: { format?: string; error?: unknown } } };

type ZodInternalDefinition = { checks?: ZodInternalCheck[]; innerType?: z.ZodType };

type ZodInternalSchema = { _zod: { def: ZodInternalDefinition } };

type ZodInternalObjectSchema = { _zod: { def: ZodInternalDefinition & { shape?: Record<string, z.ZodType> } } };

export type {
  ZodInternalCheck,
  ZodInternalDefinition,
  ZodInternalObjectSchema,
  ZodInternalSchema,
};