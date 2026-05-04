import { vi } from "vitest";

import type { ToMock } from "~~/tests/unit/utils/types/mock.types";

import type { QuestionsRepository } from "~/repositories/goat-it-api/questions/questions.repository";

type QuestionsRepositoryMock = ToMock<ReturnType<QuestionsRepository>>;

function createQuestionsRepositoryMock(): QuestionsRepositoryMock {
  return {
    getAll: vi.fn<QuestionsRepositoryMock["getAll"]>(),
    getById: vi.fn<QuestionsRepositoryMock["getById"]>(),
    create: vi.fn<QuestionsRepositoryMock["create"]>(),
    archive: vi.fn<QuestionsRepositoryMock["archive"]>(),
    assignTheme: vi.fn<QuestionsRepositoryMock["assignTheme"]>(),
    removeTheme: vi.fn<QuestionsRepositoryMock["removeTheme"]>(),
    modifyThemeAssignment: vi.fn<QuestionsRepositoryMock["modifyThemeAssignment"]>(),
    modify: vi.fn<QuestionsRepositoryMock["modify"]>(),
  };
}

export type { QuestionsRepositoryMock };

export { createQuestionsRepositoryMock };