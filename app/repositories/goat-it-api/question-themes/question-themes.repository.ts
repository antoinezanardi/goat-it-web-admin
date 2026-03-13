import type { $Fetch } from "nitropack";

type QuestionThemesRepository = (fetch: $Fetch) => {
  getAll: () => Promise<QuestionTheme[]>;
};

export const questionThemesRepository: QuestionThemesRepository = (fetch: $Fetch) => ({
  async getAll(): Promise<QuestionTheme[]> {
    return fetch<QuestionTheme[]>("/api/goat-it-api/question-themes");
  },
});