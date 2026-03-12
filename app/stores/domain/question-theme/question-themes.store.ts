import type { AsyncDataRequestStatus } from "#app";
import { StoreNames } from "~/stores/store.enums";

export const useQuestionThemesStore = defineStore(StoreNames.QUESTION_THEMES, () => {
  const questionThemes = ref<QuestionTheme[]>([]);
  const fetchRequestStatus = ref<AsyncDataRequestStatus>("idle");

  const repository = questionThemesRepository($fetch);
  const { addErrorToast } = useAppToast();
  const {
    setFetchStatusToPending,
    setFetchStatusToSuccess,
    setFetchStatusToError,
  } = useFetchStatus();
  const { t } = useI18n();

  async function fetchQuestionThemes(): Promise<QuestionTheme[] | undefined> {
    setFetchStatusToPending();
    try {
      const fetchedQuestionThemes = await repository.getAll();
      setFetchStatusToSuccess();

      return fetchedQuestionThemes;
    } catch {
      setFetchStatusToError();
      addErrorToast({
        description: t("questionThemes.cantFetch"),
      });
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