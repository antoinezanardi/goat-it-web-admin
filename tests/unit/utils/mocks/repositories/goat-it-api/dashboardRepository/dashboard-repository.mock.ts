import { vi } from "vitest";

import type { ToMock } from "~~/tests/unit/utils/types/mock.types";

import type { DashboardRepository } from "@/repositories/goat-it-api/dashboard/dashboard.repository";

type DashboardRepositoryMock = ToMock<ReturnType<DashboardRepository>>;

function createDashboardRepositoryMock(): DashboardRepositoryMock {
  return {
    getQuestionStats: vi.fn<DashboardRepositoryMock["getQuestionStats"]>(),
    getQuestionThemeStats: vi.fn<DashboardRepositoryMock["getQuestionThemeStats"]>(),
  };
}

export type { DashboardRepositoryMock };

export { createDashboardRepositoryMock };