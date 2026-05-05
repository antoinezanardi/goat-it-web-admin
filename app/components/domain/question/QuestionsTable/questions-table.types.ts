import type { GlobalFilterOptions } from "@tanstack/vue-table";

import type { Question } from "#shared/types/question.types";

type QuestionsTableGlobalFilterOptions = Omit<GlobalFilterOptions<Question>, "onGlobalFilterChange">;

export type { QuestionsTableGlobalFilterOptions };