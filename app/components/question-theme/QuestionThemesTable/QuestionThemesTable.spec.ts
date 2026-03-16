import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { TableColumn } from "@nuxt/ui";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionThemesTable } from "#components";
import type { QuestionThemeSlugBadge, QuestionThemeStatusBadge } from "#components";

import type { QuestionThemesTableRow } from "~/components/question-theme/QuestionThemesTable/question-themes-table.types";

describe(QuestionThemesTable, () => {
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
          accessorKey: "label",
          header: "questionThemes.fields.label",
        },
        {
          accessorKey: "slug",
          header: "questionThemes.fields.slug",
        },
        {
          accessorKey: "description",
          header: "questionThemes.fields.description",
        },
        {
          accessorKey: "aliases",
          header: "questionThemes.fields.aliases",
        },
        {
          accessorKey: "status",
          header: "questionThemes.fields.status",
        },
      ];

      expect(table.props("columns")).toStrictEqual<TableColumn<QuestionTheme>[]>(expectedColumns);
    });
  });

  describe("Rows", () => {
    it("should pass an empty data array to the table component when the store has no question themes.", () => {
      questionThemesStore.questionThemes = [];
      const table = wrapper.getComponent({ name: "UTable" });

      expect(table.props("data")).toStrictEqual([]);
    });

    it("should pass mapped rows to the table component when the store has question themes.", async() => {
      const questionThemes = [
        createFakeQuestionTheme({
          label: {
            en: "Math",
            fr: "Mathématiques",
          },
          description: {
            en: "Math description",
            fr: "Description mathématiques",
          },
          aliases: {
            en: ["maths"],
            fr: ["maths"],
          },
          slug: "math",
          status: "active",
        }),
      ];
      questionThemesStore.questionThemes = questionThemes;
      const expectedQuestionThemeRows: QuestionThemesTableRow[] = questionThemes.map(questionTheme => ({
        id: questionTheme.id,
        slug: questionTheme.slug,
        label: questionTheme.label[DEFAULT_MOCKED_LOCALE],
        description: questionTheme.description[DEFAULT_MOCKED_LOCALE],
        aliases: questionTheme.aliases[DEFAULT_MOCKED_LOCALE],
        status: questionTheme.status,
      }));

      wrapper = await mountQuestionThemesTableComponent();

      const table = wrapper.getComponent({ name: "UTable" });

      expect(table.props("data")).toStrictEqual<QuestionThemesTableRow[]>(expectedQuestionThemeRows);
    });
  });

  describe("Slug cell slot", () => {
    it("should render the question theme slug badge for each row when in the slug cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "science-biology" })];

      wrapper = await mountQuestionThemesTableComponent();

      const slugBadge = wrapper.findComponent<typeof QuestionThemeSlugBadge>({ name: "QuestionThemeSlugBadge" });

      expect(slugBadge.exists()).toBeTruthy();
    });

    it("should pass the slug to the question theme slug badge when in the slug cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ slug: "science-biology" })];

      wrapper = await mountQuestionThemesTableComponent();

      const slugBadge = wrapper.findComponent<typeof QuestionThemeSlugBadge>({ name: "QuestionThemeSlugBadge" });

      expect(slugBadge.props("slug")).toBe("science-biology");
    });
  });

  describe("Status cell slot", () => {
    it("should render the question theme status badge for each row when in the status cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ status: "active" })];

      wrapper = await mountQuestionThemesTableComponent();

      const statusBadge = wrapper.findComponent<typeof QuestionThemeStatusBadge>({ name: "QuestionThemeStatusBadge" });

      expect(statusBadge.exists()).toBeTruthy();
    });

    it("should pass the status to the question theme status badge when in the status cell slot.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ status: "active" })];

      wrapper = await mountQuestionThemesTableComponent();

      const statusBadge = wrapper.findComponent<typeof QuestionThemeStatusBadge>({ name: "QuestionThemeStatusBadge" });

      expect(statusBadge.props("status")).toBe("active");
    });

    it("should pass the archived status to the question theme status badge when the theme status is archived.", async() => {
      questionThemesStore.questionThemes = [createFakeQuestionTheme({ status: "archived" })];

      wrapper = await mountQuestionThemesTableComponent();

      const statusBadge = wrapper.findComponent<typeof QuestionThemeStatusBadge>({ name: "QuestionThemeStatusBadge" });

      expect(statusBadge.props("status")).toBe("archived");
    });
  });
});