import { z } from "zod";

const QUESTION_THEME_ASSIGNMENT_MODIFICATION_DTO = z.object({
  isPrimary: z.literal(true).optional(),
  isHint: z.boolean().optional(),
});

export { QUESTION_THEME_ASSIGNMENT_MODIFICATION_DTO };