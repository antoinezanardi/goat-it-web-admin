import { z } from "zod";

import { zCoerceOptionalString } from "#acceptance/features/support/helpers/datatable.helpers.ts";

const QUESTION_FORM_ROW_SCHEMA = z.strictObject({
  statement: zCoerceOptionalString(),
  answer: zCoerceOptionalString(),
  context: zCoerceOptionalString(),
  difficulty: zCoerceOptionalString(),
  category: zCoerceOptionalString(),
  themes: zCoerceOptionalString(),
  sourceUrls: zCoerceOptionalString(),
});

const QUESTION_FORM_ERROR_ROW_SCHEMA = z.strictObject({
  field: z.string(),
  error: z.string(),
});

type QuestionFormRow = z.infer<typeof QUESTION_FORM_ROW_SCHEMA>;

type QuestionFormErrorRow = z.infer<typeof QUESTION_FORM_ERROR_ROW_SCHEMA>;

export {
  QUESTION_FORM_ERROR_ROW_SCHEMA,
  QUESTION_FORM_ROW_SCHEMA,
};

export type { QuestionFormErrorRow, QuestionFormRow };