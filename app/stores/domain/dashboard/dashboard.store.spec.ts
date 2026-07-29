import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it } from "vitest";
import { createFakeQuestionStatsDto } from "@goat-it/schemas/testing/question";
import { createFakeQuestionThemeStatsDto } from "@goat-it/schemas/testing/question-theme";

import { createUseAsyncActionMock } from "~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock";
import type { UseAsyncActionMock } from "~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock";

import type { useDashboardStore as UseDashboardStoreType } from "@/stores/domain/dashboard/dashboard.store";

let fetchQuestionStatsAsyncActionMock: UseAsyncActionMock;
let fetchQuestionThemeStatsAsyncActionMock: UseAsyncActionMock;
let capturedFetchQuestionStatsAction: (() => Promise<unknown>) | undefined;
let capturedFetchQuestionStatsOnError: ((error: unknown) => void) | undefined;
let capturedFetchQuestionThemeStatsAction: (() => Promise<unknown>) | undefined;
let capturedFetchQuestionThemeStatsOnError: ((error: unknown) => void) | undefined;

let useAsyncActionCallCount: number;

mockNuxtImport("useAsyncAction", () => (action: unknown, onError: unknown): UseAsyncActionMock => {
  useAsyncActionCallCount++;
  if (useAsyncActionCallCount === 1) {
    capturedFetchQuestionStatsAction = action as () => Promise<unknown>;
    capturedFetchQuestionStatsOnError = onError as (error: unknown) => void;
    fetchQuestionStatsAsyncActionMock = createUseAsyncActionMock();

    return fetchQuestionStatsAsyncActionMock;
  }

  capturedFetchQuestionThemeStatsAction = action as () => Promise<unknown>;
  capturedFetchQuestionThemeStatsOnError = onError as (error: unknown) => void;
  fetchQuestionThemeStatsAsyncActionMock = createUseAsyncActionMock();

  return fetchQuestionThemeStatsAsyncActionMock;
});

let useDashboardStore!: typeof UseDashboardStoreType;

describe(useDashboardStore, () => {
  beforeEach(async() => {
    useAsyncActionCallCount = 0;
    capturedFetchQuestionStatsAction = undefined;
    capturedFetchQuestionStatsOnError = undefined;
    capturedFetchQuestionThemeStatsAction = undefined;
    capturedFetchQuestionThemeStatsOnError = undefined;
    ({ useDashboardStore } = await import("@/stores/domain/dashboard/dashboard.store"));
  });

  describe("questionStats", () => {
    it("should be undefined as initial state when created.", () => {
      const store = useDashboardStore();

      expect(store.questionStats).toBeUndefined();
    });
  });

  describe("questionThemeStats", () => {
    it("should be undefined as initial state when created.", () => {
      const store = useDashboardStore();

      expect(store.questionThemeStats).toBeUndefined();
    });
  });

  describe("isFetchingDashboardStats", () => {
    it("should be false when neither fetch is pending.", () => {
      const store = useDashboardStore();

      expect(store.isFetchingDashboardStats).toBeFalsy();
    });

    it("should be true when question stats fetch is pending.", () => {
      const store = useDashboardStore();
      fetchQuestionStatsAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isFetchingDashboardStats).toBeTruthy();
    });

    it("should be true when question theme stats fetch is pending.", () => {
      const store = useDashboardStore();
      fetchQuestionThemeStatsAsyncActionMock.fetchStatus.value = "pending";

      expect(store.isFetchingDashboardStats).toBeTruthy();
    });
  });

  describe("isFetchDashboardStatsError", () => {
    it("should be false when neither fetch errored.", () => {
      const store = useDashboardStore();

      expect(store.isFetchDashboardStatsError).toBeFalsy();
    });

    it("should be true when question stats fetch errored.", () => {
      const store = useDashboardStore();
      fetchQuestionStatsAsyncActionMock.fetchStatus.value = "error";

      expect(store.isFetchDashboardStatsError).toBeTruthy();
    });

    it("should be true when question theme stats fetch errored.", () => {
      const store = useDashboardStore();
      fetchQuestionThemeStatsAsyncActionMock.fetchStatus.value = "error";

      expect(store.isFetchDashboardStatsError).toBeTruthy();
    });
  });

  describe("fetchAndStoreDashboardStats", () => {
    it("should call fetchQuestionStats execute when invoked.", async() => {
      const store = useDashboardStore();

      await store.fetchAndStoreDashboardStats();

      expect(fetchQuestionStatsAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith();
    });

    it("should call fetchQuestionThemeStats execute when invoked.", async() => {
      const store = useDashboardStore();

      await store.fetchAndStoreDashboardStats();

      expect(fetchQuestionThemeStatsAsyncActionMock.execute).toHaveBeenCalledExactlyOnceWith();
    });

    it("should store fetched question stats when both resolve with data.", async() => {
      const fakeQuestionStats = createFakeQuestionStatsDto();
      const fakeQuestionThemeStats = createFakeQuestionThemeStatsDto();
      const store = useDashboardStore();
      fetchQuestionStatsAsyncActionMock.execute.mockResolvedValue(fakeQuestionStats);
      fetchQuestionThemeStatsAsyncActionMock.execute.mockResolvedValue(fakeQuestionThemeStats);

      await store.fetchAndStoreDashboardStats();

      expect(store.questionStats).toStrictEqual(fakeQuestionStats);
    });

    it("should store fetched question theme stats when both resolve with data.", async() => {
      const fakeQuestionStats = createFakeQuestionStatsDto();
      const fakeQuestionThemeStats = createFakeQuestionThemeStatsDto();
      const store = useDashboardStore();
      fetchQuestionStatsAsyncActionMock.execute.mockResolvedValue(fakeQuestionStats);
      fetchQuestionThemeStatsAsyncActionMock.execute.mockResolvedValue(fakeQuestionThemeStats);

      await store.fetchAndStoreDashboardStats();

      expect(store.questionThemeStats).toStrictEqual(fakeQuestionThemeStats);
    });

    it("should not update questionStats when fetchQuestionStats resolves with undefined.", async() => {
      const store = useDashboardStore();
      const fakeQuestionThemeStats = createFakeQuestionThemeStatsDto();
      fetchQuestionThemeStatsAsyncActionMock.execute.mockResolvedValue(fakeQuestionThemeStats);

      await store.fetchAndStoreDashboardStats();

      expect(store.questionStats).toBeUndefined();
    });

    it("should still store question theme stats when fetchQuestionStats resolves with undefined.", async() => {
      const store = useDashboardStore();
      const fakeQuestionThemeStats = createFakeQuestionThemeStatsDto();
      fetchQuestionThemeStatsAsyncActionMock.execute.mockResolvedValue(fakeQuestionThemeStats);

      await store.fetchAndStoreDashboardStats();

      expect(store.questionThemeStats).toStrictEqual(fakeQuestionThemeStats);
    });

    it("should not update questionThemeStats when fetchQuestionThemeStats resolves with undefined.", async() => {
      const store = useDashboardStore();
      const fakeQuestionStats = createFakeQuestionStatsDto();
      fetchQuestionStatsAsyncActionMock.execute.mockResolvedValue(fakeQuestionStats);

      await store.fetchAndStoreDashboardStats();

      expect(store.questionThemeStats).toBeUndefined();
    });

    it("should still store question stats when fetchQuestionThemeStats resolves with undefined.", async() => {
      const store = useDashboardStore();
      const fakeQuestionStats = createFakeQuestionStatsDto();
      fetchQuestionStatsAsyncActionMock.execute.mockResolvedValue(fakeQuestionStats);

      await store.fetchAndStoreDashboardStats();

      expect(store.questionStats).toStrictEqual(fakeQuestionStats);
    });
  });

  describe("useAsyncAction setup for fetchQuestionStats", () => {
    it("should pass the repository getQuestionStats function as action to useAsyncAction when created.", () => {
      useDashboardStore();

      expect(capturedFetchQuestionStatsAction).toBe(dashboardRepository($fetch).getQuestionStats);
    });

    it("should call handleGoatItApiError with the error and cantFetchStats translation key when the fetch question stats error callback is invoked.", () => {
      useDashboardStore();
      const fakeError = new Error("fetch failed");

      capturedFetchQuestionStatsOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "home.cantFetchStats");
    });
  });

  describe("useAsyncAction setup for fetchQuestionThemeStats", () => {
    it("should pass the repository getQuestionThemeStats function as action to useAsyncAction when created.", () => {
      useDashboardStore();

      expect(capturedFetchQuestionThemeStatsAction).toBe(dashboardRepository($fetch).getQuestionThemeStats);
    });

    it("should call handleGoatItApiError with the error and cantFetchStats translation key when the fetch question theme stats error callback is invoked.", () => {
      useDashboardStore();
      const fakeError = new Error("fetch failed");

      capturedFetchQuestionThemeStatsOnError?.(fakeError);

      expect(useGoatItApiErrorToast().handleGoatItApiError).toHaveBeenCalledExactlyOnceWith(fakeError, "home.cantFetchStats");
    });
  });
});