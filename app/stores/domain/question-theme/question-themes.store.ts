export const useQuestionThemesStore = defineStore(StoreNames.QUESTION_THEMES, () => {
  const questionThemes = ref<QuestionTheme[]>([]);

  const repository = questionThemesRepository($fetch);
  const { addErrorToast } = useAppToast();
  const { t } = useI18n();

  const {
    execute: fetchQuestionThemes,
    fetchStatus: fetchQuestionThemesStatus,
    isPending: isFetchingQuestionThemes,
    isSuccess: isFetchQuestionThemesSuccess,
    isError: isFetchingQuestionThemesError,
  } = useAsyncAction(
    repository.getAll,
    () => addErrorToast({ description: t("questionThemes.cantFetch") }),
  );

  async function fetchAndStoreQuestionThemes(): Promise<void> {
    const fetchedQuestionThemes = await fetchQuestionThemes();
    if (fetchedQuestionThemes) {
      questionThemes.value = fetchedQuestionThemes;
    }
  }
  return {
    questionThemes,
    fetchQuestionThemesStatus,
    isFetchingQuestionThemes,
    isFetchQuestionThemesSuccess,
    isFetchingQuestionThemesError,
    fetchQuestionThemes,
    fetchAndStoreQuestionThemes,
  };
});