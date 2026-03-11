import type { AsyncDataRequestStatus } from "#app";
import { StoreNames } from "~/stores/store.enums";

export const useQuestionThemesStore = defineStore(StoreNames.QUESTION_THEMES, () => {
  const questionThemes = ref<QuestionTheme[]>([]);
  const fetchRequestStatus = ref<AsyncDataRequestStatus>("idle");

  async function fetchQuestionThemes(): Promise<QuestionTheme[] | undefined> {
    fetchRequestStatus.value = "pending";
    try {
      const fetchedQuestionThemes = await $fetch<QuestionTheme[]>("/api/goat-it-api/question-themes");
      fetchRequestStatus.value = "success";

      return fetchedQuestionThemes;
    } catch {
      fetchRequestStatus.value = "error";
    }
    return undefined;
  }

  async function fetchAndStoreQuestionThemes(): Promise<void> {
    const fetchedQuestionThemes = await fetchQuestionThemes();
    if (fetchedQuestionThemes) {
      questionThemes.value = fetchedQuestionThemes;
    }
  }
  return {
    questionThemes,
    fetchRequestStatus,
    fetchQuestionThemes,
    fetchAndStoreQuestionThemes,
  };
});