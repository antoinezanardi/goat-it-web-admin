import { z } from "zod";

import { zCoerceOptionalString } from "#acceptance/features/support/helpers/datatable.helpers.ts";

const QUESTION_THEME_FORM_ROW_SCHEMA = z.strictObject({
  label: zCoerceOptionalString(),
  slug: zCoerceOptionalString(),
  description: zCoerceOptionalString(),
  aliases: zCoerceOptionalString(),
  color: zCoerceOptionalString(),
  status: z.enum(["active", "archived"]).optional(),
});

const QUESTION_THEME_TABLE_ROW_SCHEMA = z.strictObject({
  label: zCoerceOptionalString(),
  slug: zCoerceOptionalString(),
  description: zCoerceOptionalString(),
  aliases: zCoerceOptionalString(),
  status: zCoerceOptionalString(),
});

const QUESTION_THEME_FORM_ERROR_ROW_SCHEMA = z.strictObject({
  field: z.string(),
  error: z.string(),
});

type QuestionThemeFormRow = z.infer<typeof QUESTION_THEME_FORM_ROW_SCHEMA>;

type QuestionThemeTableRow = z.infer<typeof QUESTION_THEME_TABLE_ROW_SCHEMA>;

type QuestionThemeFormErrorRow = z.infer<typeof QUESTION_THEME_FORM_ERROR_ROW_SCHEMA>;

export {
  QUESTION_THEME_FORM_ERROR_ROW_SCHEMA,
  QUESTION_THEME_FORM_ROW_SCHEMA,
  QUESTION_THEME_TABLE_ROW_SCHEMA,
};

export type { QuestionThemeFormErrorRow, QuestionThemeFormRow, QuestionThemeTableRow };