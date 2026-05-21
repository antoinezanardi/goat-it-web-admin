import type { GlobalFilterOptions } from "@tanstack/vue-table";

import type { Question } from "#shared/types/question.types";

type QuestionsTableGlobalFilterOptions = Omit<GlobalFilterOptions<Question>, "onGlobalFilterChange">;

type QuestionsTableEmits = {
  startCreate: [];
  startEdit: [id: string];
};

export type { QuestionsTableGlobalFilterOptions, QuestionsTableEmits };