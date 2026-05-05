import { nextTick, toValue } from "vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { TableColumn } from "@nuxt/ui";
import type { FilterFn } from "@tanstack/vue-table";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import type { vi } from "vitest";

import { createFakeQuestion } from "~~/tests/unit/utils/faketories/questions/entity/question.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionsTable } from "#components";
import type { QuestionCategoryBadge, QuestionDifficultyBadge, QuestionStatusBadge, QuestionThemesList, QuestionTranslationCompletenessIndicator, QuestionsTableActions, QuestionsTableHeader, TableEmptyState, TranslatedText as TranslatedTextComponent } from "#components";

import type { Question } from "#shared/types/question.types";

describe("QuestionsTable Component", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;
  let questionsStore: ReturnType<typeof mockStore<typeof useQuestionsStore>>;

  async function mountQuestionsTableComponent(options: MountSuspendedOptions<typeof QuestionsTable> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTable, {
      global: {
        plugins: [pinia],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    pinia = createTestingPinia();
    wrapper = await mountQuestionsTableComponent();
    questionsStore = mockStore(useQuestionsStore);
  });

  it("should render the questions table component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Columns", () => {
    it("should pass columns with translated headers to the table component when mounted.", () => {
      const table = wrapper.getComponent({ name: "UTable" });
      const expectedColumns: TableColumn<Question>[] = [
        {
          accessorKey: "category",
          header: "questions.fields.category",
          meta: { class: { th: "text-center", td: "text-center" } },
        },
        {
          accessorKey: "themes",
          header: "questions.fields.themes",
          meta: { class: { th: "text-center", td: "text-center" } },
        },
        {
          accessorKey: "statement",
          header: "questions.fields.statement",
        },
        {
          accessorKey: "cognitiveDifficulty",
          header: "questions.fields.cognitiveDifficulty",
          meta: { class: { th: "text-center", td: "text-center" } },
        },
        {
          accessorKey: "status",
          header: "questions.fields.status",
          meta: { class: { th: "text-center", td: "text-center" } },
        },
        {
          accessorKey: "translations",
          header: "questions.fields.translations",
          meta: { class: { th: "text-center", td: "text-center" } },
        },
        {
          accessorKey: "actions",
          header: "common.table.actions",
          meta: { class: { th: "text-center", td: "text-center" } },
        },
      ];

      expect(table.props("columns")).toStrictEqual(expectedColumns);
    });
  });

  describe("Rows", () => {
    it("should pass an empty data array to the table component when the store has no questions.", () => {
      questionsStore.questions = [];
      const table = wrapper.getComponent({ name: "UTable" });

      expect(table.props("data")).toStrictEqual([]);
    });

    it("should pass the questions from the store to the table component when the store has questions.", async() => {
      const fakeQuestions = [createFakeQuestion(), createFakeQuestion()];
      questionsStore.questions = fakeQuestions;

      wrapper = await mountQuestionsTableComponent();

      const table = wrapper.getComponent({ name: "UTable" });

      expect(table.props("data")).toStrictEqual(fakeQuestions);
    });
  });

  describe("Category cell slot", () => {
    it("should render the question category badge for each row when in the category cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1", category: "trivia" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const badge = wrapper.findComponent<typeof QuestionCategoryBadge>("[data-testid='category-cell-badge-q-1']");

      expect(badge.exists()).toBeTruthy();
    });

    it("should pass the category to the question category badge when in the category cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1", category: "lexicon" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const badge = wrapper.findComponent<typeof QuestionCategoryBadge>("[data-testid='category-cell-badge-q-1']");

      expect(badge.props("category")).toBe("lexicon");
    });
  });

  describe("Themes cell slot", () => {
    it("should render the question themes list for each row when in the themes cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const themesList = wrapper.findComponent<typeof QuestionThemesList>("[data-testid='themes-cell-list-q-1']");

      expect(themesList.exists()).toBeTruthy();
    });

    it("should pass the themes to the question themes list when in the themes cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const themesList = wrapper.findComponent<typeof QuestionThemesList>("[data-testid='themes-cell-list-q-1']");

      expect(themesList.props("themes")).toStrictEqual(fakeQuestion.themes);
    });
  });

  describe("Statement cell slot", () => {
    it("should render the translated text for each row when in the statement cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const text = wrapper.findComponent<typeof TranslatedTextComponent>("[data-testid='statement-cell-text-q-1']");

      expect(text.exists()).toBeTruthy();
    });

    it("should pass the statement localized text to the translated text component when in the statement cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const text = wrapper.findComponent<typeof TranslatedTextComponent>("[data-testid='statement-cell-text-q-1']");

      expect(text.props("localizedText")).toStrictEqual(fakeQuestion.content.statement);
    });
  });

  describe("Cognitive difficulty cell slot", () => {
    it("should render the question difficulty badge for each row when in the cognitiveDifficulty cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1", cognitiveDifficulty: "hard" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const badge = wrapper.findComponent<typeof QuestionDifficultyBadge>("[data-testid='difficulty-cell-badge-q-1']");

      expect(badge.exists()).toBeTruthy();
    });

    it("should pass the difficulty to the question difficulty badge when in the cognitiveDifficulty cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1", cognitiveDifficulty: "medium" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const badge = wrapper.findComponent<typeof QuestionDifficultyBadge>("[data-testid='difficulty-cell-badge-q-1']");

      expect(badge.props("difficulty")).toBe("medium");
    });
  });

  describe("Status cell slot", () => {
    it("should render the question status badge for each row when in the status cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1", status: "active" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const badge = wrapper.findComponent<typeof QuestionStatusBadge>("[data-testid='status-cell-badge-q-1']");

      expect(badge.exists()).toBeTruthy();
    });

    it("should pass the status to the question status badge when in the status cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1", status: "pending" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const badge = wrapper.findComponent<typeof QuestionStatusBadge>("[data-testid='status-cell-badge-q-1']");

      expect(badge.props("status")).toBe("pending");
    });
  });

  describe("Translations cell slot", () => {
    it("should render the question translation completeness indicator for each row when in the translations cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const indicator = wrapper.findComponent<typeof QuestionTranslationCompletenessIndicator>("[data-testid='translations-cell-indicator-q-1']");

      expect(indicator.exists()).toBeTruthy();
    });

    it("should pass the question to the translation completeness indicator when in the translations cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const indicator = wrapper.findComponent<typeof QuestionTranslationCompletenessIndicator>("[data-testid='translations-cell-indicator-q-1']");

      expect(indicator.props("question")).toStrictEqual(fakeQuestion);
    });
  });

  describe("Actions cell slot", () => {
    it("should render the actions component for each row when in the actions cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const actions = wrapper.findComponent<typeof QuestionsTableActions>("[data-testid='actions-cell-q-1']");

      expect(actions.exists()).toBeTruthy();
    });

    it("should pass the question to the actions component when in the actions cell slot.", async() => {
      const fakeQuestion = createFakeQuestion({ id: "q-1", status: "active" });
      questionsStore.questions = [fakeQuestion];

      wrapper = await mountQuestionsTableComponent();

      const actions = wrapper.findComponent<typeof QuestionsTableActions>("[data-testid='actions-cell-q-1']");

      expect(actions.props("question")).toStrictEqual(expect.objectContaining({
        id: "q-1",
        status: "active",
      }));
    });
  });

  describe("Table header", () => {
    it("should pass empty search term to the table header when no search has been performed.", () => {
      const header = wrapper.findComponent<typeof QuestionsTableHeader>("[data-testid='questions-table-header']");

      expect(header.props("searchTerm")).toBe("");
    });

    it("should update search term when the composable searchTerm changes.", async() => {
      const { searchTerm } = useTableGlobalFilter({ data: [], keys: [] });

      searchTerm.value = "test search";
      await nextTick();

      const header = wrapper.findComponent<typeof QuestionsTableHeader>("[data-testid='questions-table-header']");

      expect(header.props("searchTerm")).toBe("test search");
    });

    it("should update the composable searchTerm when the header emits update:searchTerm.", () => {
      const header = wrapper.findComponent<typeof QuestionsTableHeader>("[data-testid='questions-table-header']");
      getWrapperVm(header).$emit("update:searchTerm", "updated from header");

      const { searchTerm } = useTableGlobalFilter({ data: [], keys: [] });

      expect(searchTerm.value).toBe("updated from header");
    });
  });

  describe("Global filter", () => {
    it("should pass globalFilter to the table component when mounted.", () => {
      const table = wrapper.getComponent({ name: "UTable" });

      expect(table.props("globalFilter")).toBe("");
    });

    it("should pass globalFilterOptions with the filterFn to the table component when mounted.", () => {
      const table = wrapper.getComponent({ name: "UTable" });

      expect(table.props("globalFilterOptions")).toStrictEqual({ globalFilterFn: expect.any(Function) as FilterFn<Question> });
    });

    it("should update the composable globalFilter when the table emits update:globalFilter.", () => {
      const table = wrapper.findComponent({ name: "UTable" });
      getWrapperVm(table).$emit("update:globalFilter", "updated from table");

      const { globalFilter } = useTableGlobalFilter({ data: [], keys: [] });

      expect(globalFilter.value).toBe("updated from table");
    });
  });

  describe("Fuse keys", () => {
    it("should pass fuse keys including current locale statement, category and status to useTableGlobalFilter when mounted.", () => {
      const mockFunction = useTableGlobalFilter as unknown as ReturnType<typeof vi.fn>;
      const options = mockFunction.mock.calls[0]?.[0] as { keys: unknown };

      expect(toValue(options.keys)).toStrictEqual([
        `content.statement.${DEFAULT_MOCKED_LOCALE}`,
        "category",
        "status",
      ]);
    });
  });

  describe("Empty state", () => {
    it("should pass hasActiveFilter as false to the empty state component when no filter is active.", () => {
      questionsStore.questions = [];

      const emptyState = wrapper.findComponent<typeof TableEmptyState>("[data-testid='questions-table-empty-state']");

      expect(emptyState.props("hasActiveFilter")).toBe(false);
    });

    it("should pass hasActiveFilter as true to the empty state component when the filter is active.", async() => {
      questionsStore.questions = [];
      const { globalFilter } = useTableGlobalFilter({ data: [], keys: [] });
      globalFilter.value = "search text";
      await nextTick();

      const emptyState = wrapper.findComponent<typeof TableEmptyState>("[data-testid='questions-table-empty-state']");

      expect(emptyState.props("hasActiveFilter")).toBe(true);
    });
  });
});