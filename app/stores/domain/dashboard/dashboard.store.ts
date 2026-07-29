import type { QuestionStatsDto } from "@goat-it/schemas/question";
import type { QuestionThemeStatsDto } from "@goat-it/schemas/question-theme";

export const useDashboardStore = defineStore(StoreNames.DASHBOARD, () => {
  const questionStats = ref<QuestionStatsDto | undefined>(undefined);
  const questionThemeStats = ref<QuestionThemeStatsDto | undefined>(undefined);

  const repository = dashboardRepository($fetch);
  const { handleGoatItApiError } = useGoatItApiErrorToast();
  const { t } = useI18n();

  const {
    execute: fetchQuestionStats,
    isPending: isFetchingQuestionStats,
    isError: isFetchingQuestionStatsError,
  } = useAsyncAction(
    repository.getQuestionStats,
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("home.cantFetchStats")),
  );

  const {
    execute: fetchQuestionThemeStats,
    isPending: isFetchingQuestionThemeStats,
    isError: isFetchingQuestionThemeStatsError,
  } = useAsyncAction(
    repository.getQuestionThemeStats,
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("home.cantFetchStats")),
  );

  const isFetchingDashboardStats = computed<boolean>(() => isFetchingQuestionStats.value || isFetchingQuestionThemeStats.value);

  const isFetchDashboardStatsError = computed<boolean>(() => isFetchingQuestionStatsError.value || isFetchingQuestionThemeStatsError.value);

  async function fetchAndStoreDashboardStats(): Promise<void> {
    const [fetchedQuestionStats, fetchedQuestionThemeStats] = await Promise.all([
      fetchQuestionStats(),
      fetchQuestionThemeStats(),
    ]);

    if (fetchedQuestionStats) {
      questionStats.value = fetchedQuestionStats;
    }
    if (fetchedQuestionThemeStats) {
      questionThemeStats.value = fetchedQuestionThemeStats;
    }
  }
  return {
    questionStats,
    questionThemeStats,
    isFetchingDashboardStats,
    isFetchDashboardStatsError,
    fetchAndStoreDashboardStats,
  };
});