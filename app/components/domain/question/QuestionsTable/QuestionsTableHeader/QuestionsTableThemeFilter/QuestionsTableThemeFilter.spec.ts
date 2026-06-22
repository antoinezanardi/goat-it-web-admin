import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionsTableThemeFilter } from "#components";
import type { TableFilterSelect } from "#components";

import type { QuestionsTableThemeFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableThemeFilter/questions-table-theme-filter.types";

describe("QuestionsTableThemeFilter Component", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;
  let questionThemesStore: ReturnType<typeof mockStore<typeof useQuestionThemesStore>>;

  const fakeActiveThemeOne = createFakeQuestionTheme({
    id: "theme-1",
    status: "active",
    label: { en: "Geography", fr: "Géographie", es: undefined, de: undefined, it: undefined, pt: undefined },
  });
  const fakeActiveThemeTwo = createFakeQuestionTheme({
    id: "theme-2",
    status: "active",
    label: { en: "History", fr: "Histoire", es: undefined, de: undefined, it: undefined, pt: undefined },
  });
  const fakeActiveThemes = [fakeActiveThemeOne, fakeActiveThemeTwo];
  const fakeArchivedTheme = createFakeQuestionTheme({
    id: "theme-3",
    status: "archived",
    label: { en: "Science", fr: "Science", es: undefined, de: undefined, it: undefined, pt: undefined },
  });

  const defaultProps: QuestionsTableThemeFilterProps = {
    modelValue: [],
  };

  async function mountQuestionsTableThemeFilterComponent(options: MountSuspendedOptions<typeof QuestionsTableThemeFilter> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTableThemeFilter, {
      global: {
        plugins: [pinia],
      },
      props: defaultProps,
      ...options,
    });
  }

  function createWrapper(): void {
    pinia = createTestingPinia();
    questionThemesStore = mockStore(useQuestionThemesStore);
  }

  beforeEach(async() => {
    createWrapper();
    wrapper = await mountQuestionsTableThemeFilterComponent();
  });

  it("should render the questions table theme filter component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should pass only active themes as items to the table filter select when mounted.", async() => {
    createWrapper();
    questionThemesStore.questionThemes = [...fakeActiveThemes, fakeArchivedTheme];
    wrapper = await mountQuestionsTableThemeFilterComponent();

    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });
    const items = filterSelect.props("items") as { label: string; value: string }[];

    expect(items).toHaveLength(2);
  });

  it("should pass only active theme ids as item values to the table filter select when mounted.", async() => {
    createWrapper();
    questionThemesStore.questionThemes = [...fakeActiveThemes, fakeArchivedTheme];
    wrapper = await mountQuestionsTableThemeFilterComponent();

    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });
    const items = filterSelect.props("items") as { label: string; value: string }[];

    expect(items.map(item => item.value)).toStrictEqual(["theme-1", "theme-2"]);
  });

  it("should use the first theme localized label as the first item label when mounted.", async() => {
    createWrapper();
    questionThemesStore.questionThemes = fakeActiveThemes;
    wrapper = await mountQuestionsTableThemeFilterComponent();

    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });
    const items = filterSelect.props("items") as { label: string; value: string }[];

    expect(items[0]).toStrictEqual({ label: "Geography", value: "theme-1" });
  });

  it("should use the second theme localized label as the second item label when mounted.", async() => {
    createWrapper();
    questionThemesStore.questionThemes = fakeActiveThemes;
    wrapper = await mountQuestionsTableThemeFilterComponent();

    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });
    const items = filterSelect.props("items") as { label: string; value: string }[];

    expect(items[1]).toStrictEqual({ label: "History", value: "theme-2" });
  });

  it("should pass the translated themes field label to the table filter select when mounted.", () => {
    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });

    expect(filterSelect.props("label")).toBe("questions.fields.themes");
  });

  it("should pass multiple as true to the table filter select when mounted.", () => {
    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });

    expect(filterSelect.props("multiple")).toBe(true);
  });

  it("should pass the modelValue to the table filter select when mounted.", async() => {
    wrapper = await mountQuestionsTableThemeFilterComponent({ props: { ...defaultProps, modelValue: ["theme-1"] } });
    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });

    expect(filterSelect.props("modelValue")).toStrictEqual(["theme-1"]);
  });

  it("should pass isFetchingQuestionThemes as loading to the table filter select when mounted.", async() => {
    createWrapper();
    questionThemesStore.isFetchingQuestionThemes = true;
    wrapper = await mountQuestionsTableThemeFilterComponent();
    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });

    expect(filterSelect.props("loading")).toBe(true);
  });

  it("should emit update:modelValue with the selected theme ids when the table filter select emits an array value.", () => {
    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });

    getWrapperVm(filterSelect).$emit("update:modelValue", ["theme-1", "theme-2"]);

    expect(wrapper.emitted("update:modelValue")).toStrictEqual([[["theme-1", "theme-2"]]]);
  });

  it("should use the missing theme translation key when a theme has no label for the current locale.", async() => {
    createWrapper();
    questionThemesStore.questionThemes = [
      createFakeQuestionTheme({
        id: "theme-missing",
        status: "active",
        label: { en: undefined, fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
      }),
    ];
    wrapper = await mountQuestionsTableThemeFilterComponent();

    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });
    const items = filterSelect.props("items") as { label: string; value: string }[];

    await nextTick();

    // Acceptable as items[0] is guaranteed to exist in this test context
    // oxlint-disable-next-line no-unsafe-type-assertion
    expect((items[0] as { label: string; value: string }).label).toBe("questions.missingThemeTranslation");
  });
});