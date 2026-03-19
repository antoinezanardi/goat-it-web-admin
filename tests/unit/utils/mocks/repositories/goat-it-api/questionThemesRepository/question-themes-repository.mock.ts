import { vi } from "vitest";

import type { ToMock } from "~~/tests/unit/utils/types/mock.types";

import type { QuestionThemesRepository } from "~/repositories/goat-it-api/question-themes/question-themes.repository";

type QuestionThemesRepositoryMock = ToMock<ReturnType<QuestionThemesRepository>>;

/**
 * Creates a mock implementation of the `questionThemesRepository` for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createQuestionThemesRepositoryMock(): QuestionThemesRepositoryMock {
  return {
    getAll: vi.fn<QuestionThemesRepositoryMock["getAll"]>(),
    getById: vi.fn<QuestionThemesRepositoryMock["getById"]>(),
    create: vi.fn<QuestionThemesRepositoryMock["create"]>(),
    patch: vi.fn<QuestionThemesRepositoryMock["patch"]>(),
    archive: vi.fn<QuestionThemesRepositoryMock["archive"]>(),
  };
}

export type { QuestionThemesRepositoryMock };

export { createQuestionThemesRepositoryMock };