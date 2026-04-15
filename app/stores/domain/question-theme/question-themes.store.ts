import type { QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";

export const useQuestionThemesStore = defineStore(StoreNames.QUESTION_THEMES, () => {
  const questionThemes = ref<QuestionTheme[]>([]);
  const questionThemeSlugs = computed<string[]>(() => questionThemes.value.map(theme => theme.slug));

  const repository = questionThemesRepository($fetch);
  const { addSuccessToast } = useAppToast();
  const { handleGoatItApiError } = useGoatItApiErrorToast();
  const { t } = useI18n();

  const {
    execute: fetchQuestionThemes,
    fetchStatus: fetchQuestionThemesStatus,
    isPending: isFetchingQuestionThemes,
    isSuccess: isFetchQuestionThemesSuccess,
    isError: isFetchingQuestionThemesError,
  } = useAsyncAction(
    repository.getAll,
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questionThemes.cantFetch")),
  );

  const {
    execute: createQuestionTheme,
    fetchStatus: createQuestionThemeStatus,
    isPending: isCreatingQuestionTheme,
    isSuccess: isCreateQuestionThemeSuccess,
    isError: isCreatingQuestionThemeError,
  } = useAsyncAction(
    async(creationDto: QuestionThemeCreationDto) => repository.create(creationDto),
    (thrownError: unknown) => handleGoatItApiError(thrownError, t("questionThemes.cantCreate")),
  );

  async function fetchAndStoreQuestionThemes(): Promise<void> {
    const fetchedQuestionThemes = await fetchQuestionThemes();
    if (fetchedQuestionThemes) {
      questionThemes.value = fetchedQuestionThemes;
    }
  }

  async function createAndStoreQuestionTheme(creationDto: QuestionThemeCreationDto): Promise<void> {
    const createdQuestionTheme = await createQuestionTheme(creationDto);
    if (createdQuestionTheme) {
      questionThemes.value.unshift(createdQuestionTheme);
      addSuccessToast({ description: t("questionThemes.createSuccessfully") });
    }
  }
  return {
    questionThemes,
    questionThemeSlugs,
    fetchQuestionThemesStatus,
    isFetchingQuestionThemes,
    isFetchQuestionThemesSuccess,
    isFetchingQuestionThemesError,
    fetchQuestionThemes,
    fetchAndStoreQuestionThemes,
    createQuestionThemeStatus,
    isCreatingQuestionTheme,
    isCreateQuestionThemeSuccess,
    isCreatingQuestionThemeError,
    createAndStoreQuestionTheme,
  };
});