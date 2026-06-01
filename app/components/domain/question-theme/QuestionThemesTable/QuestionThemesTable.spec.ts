import { nextTick, toValue } from "vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { TableColumn } from "@nuxt/ui";
import type { FilterFn } from "@tanstack/vue-table";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import type { vi } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { createFakeLocalizedText, createFakeLocalizedTexts } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionThemesTable } from "#components";
import type { QuestionThemeSlugBadge, QuestionThemeStatusBadge, QuestionThemeAliasesList, QuestionThemesTableHeader, TranslatedText as TranslatedTextComponent, QuestionThemeIcon, QuestionThemesTableActions, TableEmptyState, QuestionThemeTranslationCompletenessIndicator } from "#components";

describe("QuestionThemesTable Component", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;
  let questionThemesStore: ReturnType<typeof mockStore<typeof useQuestionThemesStore>>;

  async function mountQuestionThemesTableComponent(options: MountSuspendedOptions<typeof QuestionThemesTable> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemesTable, {
      global: {
        plugins: [pinia],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    pinia = createTestingPinia();
    wrapper = await mountQuestionThemesTableComponent();
    questionThemesStore = mockStore(useQuestionThemesStore);
  });

  it("should render the question themes table component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Table container", () => {
    it("should render the table container element when mounted.", () => {
      const container = wrapper.find("#question-themes-table");

      expect(container.exists()).toBeTruthy();
    });
  });

  describe("Columns", () => {
    it("should pass columns with translated header to the table component when mounted.", () => {
      const table = wrapper.getComponent({ name: "UTable" });
      const expectedColumns: TableColumn<QuestionTheme>[] = [
        {
          accessorKey: "icon",
          header: "questionThemes.fields.icon",
          meta: {
            class: {
              th: "text-center",
              td: "text-center",
            },
          },
        },
        {
          accessorKey: "label",
          header: "questionThemes.fields.label",
          meta: {
            class: {
              th: "text-center",
              td: "text-center",
            },
          },
        },
        {
          accessorKey: "slug",
          header: "questionThemes.fields.slug",
          meta: {
            class: {
              th: "text-center",
              td: "text-center",
            },
          },
        },
        {
          accessorKey: "description",
          header: "questionThemes.fields.description",
          meta: {
            class: {
              td: "whitespace-normal break-words",
            },
          },
        },
        {
          accessorKey: "aliases",
          header: "questionThemes.fields.aliases",
          meta: {
            class: {
              th: "text-center",
              td: "text-center",
            },
          },
        },
        {
          accessorKey: "status",
          header: "questionThemes.fields.status",
          meta: {
            class: {
              th: "text-center",
              td: "text-center",
            },
          },
        },
        {
          accessorKey: "translations",
          header: "questionThemes.fields.translations",
          meta: {
            class: {
              th: "text-center",
              td: "text-center",
            },
          },
        },
        {
          accessorKey: "actions",
          header: "common.table.actions",
          meta: {
            class: {
              th: "text-center",
              td: "text-center",
            },
          },
        },
      ];

      expect(table.props("columns")).toStrictEqual(expectedColumns);
    });
  });

  describe("Rows", () => {
    it("should pass an empty data array to the table component when the store has no question themes.", () => {
      questionThemesStore.questionThemes = [];
      const table = wrapper.getComponent({ name: "UTable" });

      expect(table.props("data")).toStrictEqual([]);
    });

    it("should pass mapped rows to the table component when the store has question themes.", async() => {
      const fakeQuestionThemes = [
        createFakeQuestionTheme({
          label: createFakeLocalizedText({ en: "Math", fr: "Mathématiques" }),
          description: createFakeLocalizedText({ en: "Math description", fr: "Description mathématiques" }),
          aliases: createFakeLocalizedTexts({ en: ["maths"], fr: ["maths"] }),
          slug: "math",
          status: "active",
        }),
      ];
      questionThemesStore.questionThemes = fakeQuestionThemes;

      wrapper = await mountQuestionThemesTableComponent();

      const table = wrapper.getComponent({ name: "UTable" });

      expect(table.props("data")).toStrictEqual(fakeQuestionThemes);
    });
  });

  describe("Icon cell slot", () => {
    it("should render the question theme icon for each row when in the icon cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "music" })];

      wrapper = await mountQuestionThemesTableComponent();

      const icon = wrapper.findComponent<typeof QuestionThemeIcon>("[data-testid='icon-cell-music']");

      expect(icon.exists()).toBeTruthy();
    });

    it("should pass the slug to the question theme icon when in the icon cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "music" })];

      wrapper = await mountQuestionThemesTableComponent();

      const icon = wrapper.findComponent<typeof QuestionThemeIcon>("[data-testid='icon-cell-music']");

      expect(icon.props("slug")).toBe("music");
    });

    it("should pass 24 to the question theme icon size when in the icon cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "music" })];

      wrapper = await mountQuestionThemesTableComponent();

      const icon = wrapper.findComponent<typeof QuestionThemeIcon>("[data-testid='icon-cell-music']");

      expect(icon.props("size")).toBe(24);
    });

    it("should render an icon for each row when the store has multiple question themes.", async() => {
      questionThemesStore.questionThemes = [
        createFakeQuestionTheme({ slug: "music" }),
        createFakeQuestionTheme({ slug: "animals" }),
      ];

      wrapper = await mountQuestionThemesTableComponent();

      const icons = wrapper.findAllComponents<typeof QuestionThemeIcon>("[data-testid^='icon-cell-']");

      expect(icons).toHaveLength(2);
    });

    it("should pass the color to the question theme icon when the theme has a color.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "music", color: "#FF0000" })];

      wrapper = await mountQuestionThemesTableComponent();

      const icon = wrapper.findComponent<typeof QuestionThemeIcon>("[data-testid='icon-cell-music']");

      expect(icon.props("color")).toBe("#FF0000");
    });
  });

  describe("Slug cell slot", () => {
    it("should render the question theme slug badge for each row when in the slug cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "science-biology" })];

      wrapper = await mountQuestionThemesTableComponent();

      const slugBadge = wrapper.findComponent<typeof QuestionThemeSlugBadge>("[data-testid='slug-cell-badge-science-biology']");

      expect(slugBadge.exists()).toBeTruthy();
    });

    it("should pass the slug to the question theme slug badge when in the slug cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "science-biology" })];

      wrapper = await mountQuestionThemesTableComponent();

      const slugBadge = wrapper.findComponent<typeof QuestionThemeSlugBadge>("[data-testid='slug-cell-badge-science-biology']");

      expect(slugBadge.props("slug")).toBe("science-biology");
    });

    it("should render a slug badge for each row when the store has multiple question themes.", async() => {
      questionThemesStore.questionThemes = [
        createFakeQuestionTheme({ slug: "science-biology" }),
        createFakeQuestionTheme({ slug: "math" }),
      ];

      wrapper = await mountQuestionThemesTableComponent();

      const slugBadges = wrapper.findAllComponents<typeof QuestionThemeSlugBadge>("[data-testid^='slug-cell-badge-']");

      expect(slugBadges).toHaveLength(2);
    });
  });

  describe("Status cell slot", () => {
    it("should render the question theme status badge for each row when in the status cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "science-biology", status: "active" })];

      wrapper = await mountQuestionThemesTableComponent();

      const statusBadge = wrapper.findComponent<typeof QuestionThemeStatusBadge>("[data-testid='status-cell-badge-science-biology']");

      expect(statusBadge.exists()).toBeTruthy();
    });

    it("should pass the status to the question theme status badge when in the status cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "science-biology", status: "active" })];

      wrapper = await mountQuestionThemesTableComponent();

      const statusBadge = wrapper.findComponent<typeof QuestionThemeStatusBadge>("[data-testid='status-cell-badge-science-biology']");

      expect(statusBadge.props("status")).toBe("active");
    });

    it("should pass the archived status to the question theme status badge when the theme status is archived.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "science-biology", status: "archived" })];

      wrapper = await mountQuestionThemesTableComponent();

      const statusBadge = wrapper.findComponent<typeof QuestionThemeStatusBadge>("[data-testid='status-cell-badge-science-biology']");

      expect(statusBadge.props("status")).toBe("archived");
    });

    it("should render a status badge for each row when the store has multiple question themes.", async() => {
      questionThemesStore.questionThemes = [
        createFakeQuestionTheme({ slug: "science-biology", status: "active" }),
        createFakeQuestionTheme({ slug: "math", status: "archived" }),
      ];

      wrapper = await mountQuestionThemesTableComponent();

      const statusBadges = wrapper.findAllComponents<typeof QuestionThemeStatusBadge>("[data-testid^='status-cell-badge-']");

      expect(statusBadges).toHaveLength(2);
    });
  });

  describe("Aliases cell slot", () => {
    it("should render the question theme aliases list for each row when in the aliases cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "science-biology", aliases: createFakeLocalizedTexts({ en: ["a"], fr: ["a"] }) })];

      wrapper = await mountQuestionThemesTableComponent();

      const aliasesList = wrapper.findComponent<typeof QuestionThemeAliasesList>("[data-testid='aliases-cell-list-science-biology']");

      expect(aliasesList.exists()).toBeTruthy();
    });

    it("should pass the localized texts to the question theme aliases list when in the aliases cell slot.", async() => {
      const aliases = createFakeLocalizedTexts({ en: ["one", "two"], fr: ["un", "deux"] });
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "science-biology", aliases })];

      wrapper = await mountQuestionThemesTableComponent();

      const aliasesList = wrapper.findComponent<typeof QuestionThemeAliasesList>("[data-testid='aliases-cell-list-science-biology']");

      expect(aliasesList.props("localizedTexts")).toStrictEqual(aliases);
    });

    it("should render an aliases list for each row when the store has multiple question themes.", async() => {
      questionThemesStore.questionThemes = [
        createFakeQuestionTheme({ slug: "science-biology", aliases: createFakeLocalizedTexts({ en: ["a"], fr: ["a"] }) }),
        createFakeQuestionTheme({ slug: "math", aliases: createFakeLocalizedTexts({ en: ["maths"], fr: ["maths"] }) }),
      ];

      wrapper = await mountQuestionThemesTableComponent();

      const aliasesLists = wrapper.findAllComponents<typeof QuestionThemeAliasesList>("[data-testid^='aliases-cell-list-']");

      expect(aliasesLists).toHaveLength(2);
    });
  });

  describe("Translations cell slot", () => {
    it("should render the question theme translation completeness indicator for each row when in the translations cell slot.", async() => {
      const theme = createFakeQuestionTheme({ slug: "music" });
      questionThemesStore.questionThemes = [theme];

      wrapper = await mountQuestionThemesTableComponent();

      const indicator = wrapper.findComponent<typeof QuestionThemeTranslationCompletenessIndicator>("[data-testid='translations-cell-indicator-music']");

      expect(indicator.exists()).toBeTruthy();
    });

    it("should pass the question theme to the translation completeness indicator when in the translations cell slot.", async() => {
      const theme = createFakeQuestionTheme({ slug: "music" });
      questionThemesStore.questionThemes = [theme];

      wrapper = await mountQuestionThemesTableComponent();

      const indicator = wrapper.findComponent<typeof QuestionThemeTranslationCompletenessIndicator>("[data-testid='translations-cell-indicator-music']");

      expect(indicator.props("questionTheme")).toStrictEqual(theme);
    });

    it("should render a translation completeness indicator for each row when the store has multiple question themes.", async() => {
      questionThemesStore.questionThemes = [
        createFakeQuestionTheme({ slug: "music" }),
        createFakeQuestionTheme({ slug: "animals" }),
      ];

      wrapper = await mountQuestionThemesTableComponent();

      const indicators = wrapper.findAllComponents<typeof QuestionThemeTranslationCompletenessIndicator>("[data-testid^='translations-cell-indicator-']");

      expect(indicators).toHaveLength(2);
    });
  });

  describe("Label cell slot", () => {
    it("should pass the label to the localized text component when in the label cell slot.", async() => {
      const label = createFakeLocalizedText({
        en: "Math",
        fr: "Mathématiques",
      });
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "math", label })];

      wrapper = await mountQuestionThemesTableComponent();

      const localizedText = wrapper.findComponent<typeof TranslatedTextComponent>("[data-testid='label-cell-text-math']");

      expect(localizedText.props("localizedText")).toStrictEqual(label);
    });

    it("should render a label localized text for each row when the store has multiple question themes.", async() => {
      questionThemesStore.questionThemes = [
        createFakeQuestionTheme({ slug: "math" }),
        createFakeQuestionTheme({ slug: "science-biology" }),
      ];

      wrapper = await mountQuestionThemesTableComponent();

      const labelTexts = wrapper.findAllComponents<typeof TranslatedTextComponent>("[data-testid^='label-cell-text-']");

      expect(labelTexts).toHaveLength(2);
    });
  });

  describe("Description cell slot", () => {
    it("should pass the description to the localized text component when in the description cell slot.", async() => {
      const description = createFakeLocalizedText({
        en: "Math description",
        fr: "Description mathématiques",
      });
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "math", description })];

      wrapper = await mountQuestionThemesTableComponent();

      const localizedText = wrapper.findComponent<typeof TranslatedTextComponent>("[data-testid='description-cell-text-math']");

      expect(localizedText.props("localizedText")).toStrictEqual(description);
    });

    it("should render a description localized text for each row when the store has multiple question themes.", async() => {
      questionThemesStore.questionThemes = [
        createFakeQuestionTheme({ slug: "math" }),
        createFakeQuestionTheme({ slug: "science-biology" }),
      ];

      wrapper = await mountQuestionThemesTableComponent();

      const descriptionTexts = wrapper.findAllComponents<typeof TranslatedTextComponent>("[data-testid^='description-cell-text-']");

      expect(descriptionTexts).toHaveLength(2);
    });
  });

  describe("Actions cell slot", () => {
    it("should render the actions component for each row when in the actions cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "music" })];

      wrapper = await mountQuestionThemesTableComponent();

      const actions = wrapper.findComponent<typeof QuestionThemesTableActions>("[data-testid='actions-cell-music']");

      expect(actions.exists()).toBeTruthy();
    });

    it("should pass the row question theme fields to the actions component when in the actions cell slot.", async() => {
      const theme = createFakeQuestionTheme({ id: "theme-id-123", slug: "music", status: "active" });
      questionThemesStore.questionThemes = [theme];

      wrapper = await mountQuestionThemesTableComponent();

      const actions = wrapper.findComponent<typeof QuestionThemesTableActions>("[data-testid='actions-cell-music']");

      expect(actions.props("questionTheme")).toStrictEqual(expect.objectContaining({
        id: "theme-id-123",
        slug: "music",
        status: "active",
      }));
    });

    it("should render an actions component for each row when the store has multiple question themes.", async() => {
      questionThemesStore.questionThemes = [
        createFakeQuestionTheme({ slug: "music", status: "active" }),
        createFakeQuestionTheme({ slug: "animals", status: "active" }),
      ];

      wrapper = await mountQuestionThemesTableComponent();

      const actions = wrapper.findAllComponents<typeof QuestionThemesTableActions>("[data-testid^='actions-cell-']");

      expect(actions).toHaveLength(2);
    });
  });

  describe("Start edit", () => {
    it("should re-emit startEdit with the id when the actions component emits startEdit.", async() => {
      const fakeTheme = createFakeQuestionTheme({ id: "theme-id-123", slug: "music" });
      questionThemesStore.questionThemes = [fakeTheme];
      wrapper = await mountQuestionThemesTableComponent();

      const actions = wrapper.findComponent<typeof QuestionThemesTableActions>("[data-testid='actions-cell-music']");
      getWrapperVm(actions).$emit("startEdit", "theme-id-123");

      expect(wrapper.emitted("startEdit")).toStrictEqual([["theme-id-123"]]);
    });
  });

  describe("Table header", () => {
    it("should emit startCreate when the table header emits startCreate.", () => {
      const header = wrapper.findComponent<typeof QuestionThemesTableHeader>("[data-testid='question-themes-table-header']");
      getWrapperVm(header).$emit("startCreate");

      expect(wrapper.emitted("startCreate")).toBeDefined();
    });

    it("should pass empty search term to the table header when no search has been performed.", () => {
      const header = wrapper.findComponent<typeof QuestionThemesTableHeader>("[data-testid='question-themes-table-header']");

      expect(header.props("searchTerm")).toBe("");
    });

    it("should update search term when the composable searchTerm changes.", async() => {
      const { searchTerm } = useTableGlobalFilter({ data: [], keys: [] });

      searchTerm.value = "test search";
      await nextTick();

      const header = wrapper.findComponent<typeof QuestionThemesTableHeader>("[data-testid='question-themes-table-header']");

      expect(header.props("searchTerm")).toBe("test search");
    });

    it("should update the composable searchTerm when the header emits update:searchTerm.", () => {
      const header = wrapper.findComponent<typeof QuestionThemesTableHeader>("[data-testid='question-themes-table-header']");
      getWrapperVm(header).$emit("update:searchTerm", "updated from header");

      const { searchTerm } = useTableGlobalFilter({ data: [], keys: [] });

      expect(searchTerm.value).toBe("updated from header");
    });

    it("should pass active filter count of 0 to the table header when no filter is active.", () => {
      const header = wrapper.findComponent<typeof QuestionThemesTableHeader>("[data-testid='question-themes-table-header']");

      expect(header.props("activeFilterCount")).toBe(0);
    });

    it("should pass undefined status filter to the table header when no status filter is active.", () => {
      const header = wrapper.findComponent<typeof QuestionThemesTableHeader>("[data-testid='question-themes-table-header']");

      expect(header.props("statusFilter")).toBeUndefined();
    });

    it("should call fetchAndStoreQuestionThemes with status query when the header emits update:statusFilter.", async() => {
      const header = wrapper.findComponent<typeof QuestionThemesTableHeader>("[data-testid='question-themes-table-header']");
      getWrapperVm(header).$emit("update:statusFilter", "active");
      await nextTick();

      expect(questionThemesStore.fetchAndStoreQuestionThemes).toHaveBeenCalledWith({ status: "active" });
    });

    it("should call fetchAndStoreQuestionThemes with undefined when the header emits clearFilters.", async() => {
      const header = wrapper.findComponent<typeof QuestionThemesTableHeader>("[data-testid='question-themes-table-header']");
      getWrapperVm(header).$emit("update:statusFilter", "active");
      await nextTick();

      getWrapperVm(header).$emit("clearFilters");
      await nextTick();

      expect(questionThemesStore.fetchAndStoreQuestionThemes).toHaveBeenLastCalledWith(undefined);
    });
  });

  describe("Global filter", () => {
    it("should pass globalFilter to the table component when mounted.", () => {
      const table = wrapper.getComponent({ name: "UTable" });

      expect(table.props("globalFilter")).toBe("");
    });

    it("should pass globalFilterOptions with the filterFn to the table component when mounted.", () => {
      const table = wrapper.getComponent({ name: "UTable" });

      expect(table.props("globalFilterOptions")).toStrictEqual({ globalFilterFn: expect.any(Function) as FilterFn<QuestionTheme> });
    });

    it("should update the composable globalFilter when the table emits update:globalFilter.", () => {
      const table = wrapper.findComponent({ name: "UTable" });
      getWrapperVm(table).$emit("update:globalFilter", "updated from table");

      const { globalFilter } = useTableGlobalFilter({ data: [], keys: [] });

      expect(globalFilter.value).toBe("updated from table");
    });
  });

  describe("Fuse keys", () => {
    it("should pass fuse keys including current locale label and description to useTableGlobalFilter when mounted.", () => {
      const mockFunction = useTableGlobalFilter as unknown as ReturnType<typeof vi.fn>;
      const options = mockFunction.mock.calls[0]?.[0] as { keys: unknown };

      expect(toValue(options.keys)).toStrictEqual([
        "slug",
        `label.${DEFAULT_MOCKED_LOCALE}`,
        `description.${DEFAULT_MOCKED_LOCALE}`,
        `aliases.${DEFAULT_MOCKED_LOCALE}`,
        "status",
      ]);
    });
  });

  describe("Empty state", () => {
    it("should pass hasActiveFilter as false to the empty state component when no filter is active.", () => {
      questionThemesStore.questionThemes = [];

      const emptyState = wrapper.findComponent<typeof TableEmptyState>("[data-testid='question-themes-table-empty-state']");

      expect(emptyState.props("hasActiveFilter")).toBe(false);
    });

    it("should pass hasActiveFilter as true to the empty state component when the filter is active.", async() => {
      questionThemesStore.questionThemes = [];
      const { globalFilter } = useTableGlobalFilter({ data: [], keys: [] });
      globalFilter.value = "search text";
      await nextTick();

      const emptyState = wrapper.findComponent<typeof TableEmptyState>("[data-testid='question-themes-table-empty-state']");

      expect(emptyState.props("hasActiveFilter")).toBe(true);
    });
  });
});