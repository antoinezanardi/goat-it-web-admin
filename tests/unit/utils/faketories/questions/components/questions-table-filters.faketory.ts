import { faker } from "@faker-js/faker";
import { QUESTION_CATEGORIES, QUESTION_COGNITIVE_DIFFICULTIES, QUESTION_STATUSES } from "@goat-it/schemas/question";

import type { QuestionsTableFilters } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/questions-table-header.types";

function createFakeQuestionsTableFilters(filters: Partial<QuestionsTableFilters> = {}): QuestionsTableFilters {
  return {
    status: faker.helpers.arrayElement(QUESTION_STATUSES),
    category: faker.helpers.arrayElement(QUESTION_CATEGORIES),
    cognitiveDifficulty: faker.helpers.arrayElement(QUESTION_COGNITIVE_DIFFICULTIES),
    themeIds: [],
    ...filters,
  };
}

export { createFakeQuestionsTableFilters };