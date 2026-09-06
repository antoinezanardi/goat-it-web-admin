import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { createFakeTableFilterSelectItem } from "~~/tests/unit/utils/faketories/shared/table-filter-select/table-filter-select-item.faketory.ts";
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
    slug: "history-civilizations",
    status: "active",
    label: { en: "Geography", fr: "Géographie", es: undefined, de: undefined, it: undefined, pt: undefined },
  });
  const fakeActiveThemeTwo = createFakeQuestionTheme({
    id: "theme-2",
    slug: "geography-travels",
    status: "active",
    label: { en: "History", fr: "Histoire", es: undefined, de: undefined, it: undefined, pt: undefined },
  });
  const fakeActiveThemes = [fakeActiveThemeOne, fakeActiveThemeTwo];
  const fakeArchivedTheme = createFakeQuestionTheme({
    id: "theme-3",
    slug: "animals",
    status: "archived",
    label: { en: "Science", fr: "Science", es: undefined, de: undefined, it: undefined, pt: undefined },
  });

  const defaultQuestionsTableThemeFilterProps: QuestionsTableThemeFilterProps = {
    modelValue: [],
  } as const;

  async function mountQuestionsTableThemeFilterComponent(options: MountSuspendedOptions<typeof QuestionsTableThemeFilter> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTableThemeFilter, {
      global: {
        plugins: [pinia],
      },
      props: defaultQuestionsTableThemeFilterProps,
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

  it("should render QuestionsTableThemeFilter when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should pass only active themes as items to the table filter select when mounted.", async() => {
    questionThemesStore.questionThemes = [...fakeActiveThemes, fakeArchivedTheme];
    wrapper = await mountQuestionsTableThemeFilterComponent();

    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });
    const items = filterSelect.props("items") as { label: string; value: string }[];

    expect(items).toHaveLength(2);
  });

  it("should pass only active theme ids as item values to the table filter select when mounted.", async() => {
    questionThemesStore.questionThemes = [...fakeActiveThemes, fakeArchivedTheme];
    wrapper = await mountQuestionsTableThemeFilterComponent();

    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });
    const items = filterSelect.props("items") as { label: string; value: string }[];

    expect(items.map(item => item.value)).toStrictEqual(["theme-1", "theme-2"]);
  });

  it("should use the first theme localized label as the first item label when mounted.", async() => {
    questionThemesStore.questionThemes = fakeActiveThemes;
    wrapper = await mountQuestionsTableThemeFilterComponent();

    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });
    const items = filterSelect.props("items") as { label: string; value: string }[];

    expect(items[0]).toStrictEqual({ label: "Geography", value: "theme-1", icon: "i-lucide-landmark" });
  });

  it("should use the second theme localized label as the second item label when mounted.", async() => {
    questionThemesStore.questionThemes = fakeActiveThemes;
    wrapper = await mountQuestionsTableThemeFilterComponent();

    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });
    const items = filterSelect.props("items") as { label: string; value: string }[];

    expect(items[1]).toStrictEqual({ label: "History", value: "theme-2", icon: "i-lucide-globe" });
  });

  it("should pass the translated themes field label to the table filter select when mounted.", () => {
    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });

    expect(filterSelect.props("label")).toBe("questions.fields.themes");
  });

  it("should pass the modelValue to the table filter select when mounted.", async() => {
    wrapper = await mountQuestionsTableThemeFilterComponent({ props: { ...defaultQuestionsTableThemeFilterProps, modelValue: ["theme-1"] } });
    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });

    expect(filterSelect.props("modelValue")).toStrictEqual(["theme-1"]);
  });

  it("should pass isFetchingQuestionThemes as loading to the table filter select when mounted.", async() => {
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

  it("should emit update:modelValue with a wrapped array when the table filter select emits a string value.", () => {
    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });

    getWrapperVm(filterSelect).$emit("update:modelValue", "theme-1");

    expect(wrapper.emitted("update:modelValue")).toStrictEqual([[["theme-1"]]]);
  });

  it("should emit update:modelValue with an empty array when the table filter select emits undefined.", () => {
    const filterSelect = wrapper.findComponent<typeof TableFilterSelect>({ name: "TableFilterSelect" });

    getWrapperVm(filterSelect).$emit("update:modelValue", undefined);

    expect(wrapper.emitted("update:modelValue")).toStrictEqual([[[]]]);
  });

  it("should use the missing theme translation key when a theme has no label for the current locale.", async() => {
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
    const expectedQuestionTheme = createFakeTableFilterSelectItem({
      icon: "i-lucide-circle-help",
      label: "questions.missingThemeTranslation",
      value: "theme-missing",
    });

    expect(items[0]).toStrictEqual(expectedQuestionTheme);
  });
});