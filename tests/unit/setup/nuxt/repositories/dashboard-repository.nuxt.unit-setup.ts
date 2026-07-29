import { vi, beforeEach } from "vitest";

import { createDashboardRepositoryMock } from "~~/tests/unit/utils/mocks/repositories/goat-it-api/dashboardRepository/dashboard-repository.mock";
import type { DashboardRepositoryMock } from "~~/tests/unit/utils/mocks/repositories/goat-it-api/dashboardRepository/dashboard-repository.mock";

let dashboardRepositoryMock: DashboardRepositoryMock = createDashboardRepositoryMock();

vi.mock("@/repositories/goat-it-api/dashboard/dashboard.repository", () => ({
  dashboardRepository: vi.fn<() => DashboardRepositoryMock>(() => dashboardRepositoryMock),
}));

beforeEach(() => {
  dashboardRepositoryMock = createDashboardRepositoryMock();
});