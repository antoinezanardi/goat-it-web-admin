import type { AdminFindQuestionThemesQueryDto, QuestionThemeCreationDto, QuestionThemeModificationDto } from "@goat-it/schemas/question-theme";
import type { $Fetch } from "nitropack";

type QuestionThemesRepository = (fetch: $Fetch) => {
  getAll: (query?: AdminFindQuestionThemesQueryDto) => Promise<QuestionTheme[]>;
  getById: (id: string) => Promise<QuestionTheme>;
  create: (creationDto: QuestionThemeCreationDto) => Promise<QuestionTheme>;
  patch: (id: string, modificationDto: QuestionThemeModificationDto) => Promise<QuestionTheme>;
  archive: (id: string) => Promise<QuestionTheme>;
};

export const questionThemesRepository: QuestionThemesRepository = (fetch: $Fetch) => ({
  async getAll(query?: AdminFindQuestionThemesQueryDto): Promise<QuestionTheme[]> {
    return fetch<QuestionTheme[]>("/api/goat-it-api/question-themes", { query });
  },

  async getById(id: string): Promise<QuestionTheme> {
    return fetch<QuestionTheme>(`/api/goat-it-api/question-themes/${id}`);
  },

  async create(creationDto: QuestionThemeCreationDto): Promise<QuestionTheme> {
    return fetch<QuestionTheme>("/api/goat-it-api/question-themes", {
      method: "POST",
      body: creationDto,
    });
  },

  async patch(id: string, modificationDto: QuestionThemeModificationDto): Promise<QuestionTheme> {
    return fetch<QuestionTheme>(`/api/goat-it-api/question-themes/${id}`, {
      method: "PATCH",
      body: modificationDto,
    });
  },

  async archive(id: string): Promise<QuestionTheme> {
    return fetch<QuestionTheme>(`/api/goat-it-api/question-themes/${id}/archive`, { method: "POST" });
  },
});

export type {
  QuestionThemesRepository,
};