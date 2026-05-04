import type { QuestionCreationDto, QuestionModificationDto, QuestionThemeAssignmentCreationDto, QuestionThemeAssignmentModificationDto } from "@goat-it/schemas/question";
import type { $Fetch } from "nitropack";

import type { Question } from "#shared/types/question.types";

type QuestionsRepository = (fetch: $Fetch) => {
  getAll: () => Promise<Question[]>;
  getById: (id: string) => Promise<Question>;
  create: (creationDto: QuestionCreationDto) => Promise<Question>;
  archive: (id: string) => Promise<Question>;
  assignTheme: (id: string, dto: QuestionThemeAssignmentCreationDto) => Promise<Question>;
  removeTheme: (id: string, themeId: string) => Promise<Question>;
  modifyThemeAssignment: (id: string, themeId: string, dto: QuestionThemeAssignmentModificationDto) => Promise<Question>;
  modify: (id: string, dto: QuestionModificationDto) => Promise<Question>;
};

export const questionsRepository: QuestionsRepository = (fetch: $Fetch) => ({
  async getAll(): Promise<Question[]> {
    return fetch<Question[]>("/api/goat-it-api/questions");
  },

  async getById(id: string): Promise<Question> {
    return fetch<Question>(`/api/goat-it-api/questions/${id}`);
  },

  async create(creationDto: QuestionCreationDto): Promise<Question> {
    return fetch<Question>("/api/goat-it-api/questions", { method: "POST", body: creationDto });
  },

  async archive(id: string): Promise<Question> {
    return fetch<Question>(`/api/goat-it-api/questions/${id}/archive`, { method: "POST" });
  },

  async assignTheme(id: string, dto: QuestionThemeAssignmentCreationDto): Promise<Question> {
    return fetch<Question>(`/api/goat-it-api/questions/${id}/themes`, { method: "POST", body: dto });
  },

  async removeTheme(id: string, themeId: string): Promise<Question> {
    return fetch<Question>(`/api/goat-it-api/questions/${id}/themes/${themeId}`, { method: "DELETE" });
  },

  async modifyThemeAssignment(id: string, themeId: string, dto: QuestionThemeAssignmentModificationDto): Promise<Question> {
    return fetch<Question>(`/api/goat-it-api/questions/${id}/themes/${themeId}`, { method: "PATCH", body: dto });
  },

  async modify(id: string, dto: QuestionModificationDto): Promise<Question> {
    return fetch<Question>(`/api/goat-it-api/questions/${id}`, { method: "PATCH", body: dto });
  },
});

export type {
  QuestionsRepository,
};