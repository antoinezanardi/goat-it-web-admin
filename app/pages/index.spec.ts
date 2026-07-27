import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeQuestionStatsDto } from "@goat-it/schemas/testing/question";
import { createFakeQuestionThemeStatsDto } from "@goat-it/schemas/testing/question-theme";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { PageHeader, DashboardSummaryTabs, QuestionStatsContent, QuestionThemeStatsContent } from "#components";

import { HOME_PAGE_ICON, HOME_PAGE_ORDER, HOME_PAGE_TITLE_KEY } from "@/pages/index.constants";
import { useDashboardStore } from "@/stores/domain/dashboard/dashboard.store";
import HomePage from "@/pages/index.vue";

describe("Home Page", () => {
  let wrapper: VueWrapper;

  async function mountHomePage(options: MountSuspendedOptions<typeof HomePage> = {}): Promise<VueWrapper> {
    return mountSuspended(HomePage, {
      shallow: true,
      ...options,
    });
  }

  beforeEach(async() => {
    const store = useDashboardStore();
    // Acceptable as we need to verify the function is called on mount without running actual side effects
    vi.spyOn(store, "fetchAndStoreDashboardStats").mockResolvedValue(undefined);
    wrapper = await mountHomePage();
  });

  it("should define page metadata when mounted.", () => {
    const expectedPageMeta: Parameters<typeof definePageMeta>[0] = {
      icon: HOME_PAGE_ICON,
      titleKey: HOME_PAGE_TITLE_KEY,
      order: HOME_PAGE_ORDER,
    };

    expect(definePageMeta).toHaveBeenCalledExactlyOnceWith(expectedPageMeta);
  });

  it("should set the page title via useHead when mounted.", () => {
    const expectedHeadInput = {
      title: HOME_PAGE_TITLE_KEY,
    };
    const extractedHeadFunction = vi.mocked(useHead).mock.calls[0]?.[0] as () => Record<string, unknown>;

    expect(extractedHeadFunction()).toStrictEqual(expectedHeadInput);
  });

  it("should pass the translated page title to the page header component when mounted.", () => {
    const pageHeader = wrapper.getComponent<typeof PageHeader>({ name: "PageHeader" });

    expect(pageHeader.props("title")).toBe(HOME_PAGE_TITLE_KEY);
  });

  it("should pass the page icon to the page header component when mounted.", () => {
    const pageHeader = wrapper.getComponent<typeof PageHeader>({ name: "PageHeader" });

    expect(pageHeader.props("icon")).toBe(HOME_PAGE_ICON);
  });

  it("should call fetchAndStoreDashboardStats when the page is mounted.", () => {
    const store = useDashboardStore();

    expect(store.fetchAndStoreDashboardStats).toHaveBeenCalledExactlyOnceWith();
  });

  it("should render DashboardSummaryTabs with zero questionTotal when stats are not loaded.", () => {
    const tabs = wrapper.getComponent<typeof DashboardSummaryTabs>({ name: "DashboardSummaryTabs" });

    expect(tabs.props("questionTotal")).toBe(0);
  });

  it("should render DashboardSummaryTabs with zero questionThemeTotal when stats are not loaded.", () => {
    const tabs = wrapper.getComponent<typeof DashboardSummaryTabs>({ name: "DashboardSummaryTabs" });

    expect(tabs.props("questionThemeTotal")).toBe(0);
  });

  it("should render DashboardSummaryTabs with actual questionTotal when stats are loaded.", async() => {
    const store = useDashboardStore();
    const fakeQuestionStats = createFakeQuestionStatsDto({ total: 42 });
    const fakeQuestionThemeStats = createFakeQuestionThemeStatsDto({ total: 8 });
    store.questionStats = fakeQuestionStats;
    store.questionThemeStats = fakeQuestionThemeStats;
    await flushPromises();

    const tabs = wrapper.getComponent<typeof DashboardSummaryTabs>({ name: "DashboardSummaryTabs" });

    expect(tabs.props("questionTotal")).toBe(42);
  });

  it("should render DashboardSummaryTabs with actual questionThemeTotal when stats are loaded.", async() => {
    const store = useDashboardStore();
    const fakeQuestionStats = createFakeQuestionStatsDto({ total: 42 });
    const fakeQuestionThemeStats = createFakeQuestionThemeStatsDto({ total: 8 });
    store.questionStats = fakeQuestionStats;
    store.questionThemeStats = fakeQuestionThemeStats;
    await flushPromises();

    const tabs = wrapper.getComponent<typeof DashboardSummaryTabs>({ name: "DashboardSummaryTabs" });

    expect(tabs.props("questionThemeTotal")).toBe(8);
  });

  it("should render QuestionStatsContent by default when activeTab is questions.", () => {
    const store = useDashboardStore();
    store.questionStats = createFakeQuestionStatsDto();

    const content = wrapper.findComponent<typeof QuestionStatsContent>({ name: "QuestionStatsContent" });

    expect(content.exists()).toBeTruthy();
  });

  it("should not render QuestionThemeStatsContent by default when activeTab is questions.", () => {
    const content = wrapper.findComponent<typeof QuestionThemeStatsContent>({ name: "QuestionThemeStatsContent" });

    expect(content.exists()).toBeFalsy();
  });

  it("should render QuestionThemeStatsContent when activeTab changes to questionThemes.", async() => {
    const store = useDashboardStore();
    store.questionThemeStats = createFakeQuestionThemeStatsDto();
    const tabs = wrapper.getComponent<typeof DashboardSummaryTabs>({ name: "DashboardSummaryTabs" });
    (tabs.vm as { $emit: (event: string, ...arguments_: unknown[]) => void }).$emit("update:activeTab", "questionThemes");
    await flushPromises();

    const content = wrapper.findComponent<typeof QuestionThemeStatsContent>({ name: "QuestionThemeStatsContent" });

    expect(content.exists()).toBeTruthy();
  });

  it("should pass isFetchingDashboardStats as the isFetching prop to DashboardSummaryTabs when mounted.", () => {
    const tabs = wrapper.getComponent<typeof DashboardSummaryTabs>({ name: "DashboardSummaryTabs" });

    expect(tabs.props("isFetching")).toBe(false);
  });

  it("should render skeleton placeholders when dashboard stats are being fetched.", async() => {
    // Acceptable as we need to mount with the fetching state set before mount to ensure reactive rendering
    // oxlint-disable-next-line react-compiler/react-hooks-compiler
    const store = useDashboardStore();
    vi.spyOn(store, "isFetchingDashboardStats", "get").mockReturnValue(true);
    wrapper = await mountHomePage();

    const skeletons = wrapper.findAllComponents({ name: "USkeleton" });

    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should not render skeleton placeholders when dashboard stats are not being fetched.", () => {
    const skeletons = wrapper.findAllComponents({ name: "USkeleton" });

    expect(skeletons).toHaveLength(0);
  });
});