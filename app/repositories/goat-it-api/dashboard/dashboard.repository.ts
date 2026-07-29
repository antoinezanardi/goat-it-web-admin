import type { QuestionStatsDto } from "@goat-it/schemas/question";
import type { QuestionThemeStatsDto } from "@goat-it/schemas/question-theme";
import type { $Fetch } from "nitropack";

type DashboardRepository = (fetch: $Fetch) => {
  getQuestionStats: () => Promise<QuestionStatsDto>;
  getQuestionThemeStats: () => Promise<QuestionThemeStatsDto>;
};

export const dashboardRepository: DashboardRepository = (fetch: $Fetch) => ({
  async getQuestionStats(): Promise<QuestionStatsDto> {
    return fetch<QuestionStatsDto>("/api/goat-it-api/questions/stats");
  },

  async getQuestionThemeStats(): Promise<QuestionThemeStatsDto> {
    return fetch<QuestionThemeStatsDto>("/api/goat-it-api/question-themes/stats");
  },
});

export type {
  DashboardRepository,
};