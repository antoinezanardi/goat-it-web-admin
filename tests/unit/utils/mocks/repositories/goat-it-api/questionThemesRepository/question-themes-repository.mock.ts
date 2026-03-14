import { vi } from "vitest";

import type { StubToMock } from "~~/tests/unit/utils/types/mock.types";

type QuestionThemesRepositoryStub = {
  getAll: () => Promise<QuestionTheme[]>;
};

type QuestionThemesRepositoryMock = StubToMock<QuestionThemesRepositoryStub>;

/**
 * Creates a mock implementation of the `questionThemesRepository` for unit testing purposes.
 * Can only be used from unit tests setup functions.
 */
function createQuestionThemesRepositoryMock(): QuestionThemesRepositoryMock {
  return {
    getAll: vi.fn<QuestionThemesRepositoryStub["getAll"]>(),
  };
}

export type { QuestionThemesRepositoryMock };

export { createQuestionThemesRepositoryMock };