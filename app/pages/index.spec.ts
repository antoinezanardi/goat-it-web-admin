import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeQuestionStatsDto } from "@goat-it/schemas/testing/question";
import { createFakeQuestionThemeStatsDto } from "@goat-it/schemas/testing/question-theme";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";

import type { PageHeader, DashboardSummaryTabs, QuestionStatsContent, QuestionThemeStatsContent } from "#components";

import { DASHBOARD_TABS } from "@/components/domain/dashboard/DashboardSummaryTabs/dashboard-summary-tabs.constants";
import { HOME_PAGE_ICON, HOME_PAGE_ORDER, HOME_PAGE_TITLE_KEY } from "@/pages/index.constants";
import { useDashboardStore } from "@/stores/domain/dashboard/dashboard.store";
import HomePage from "@/pages/index.vue";

describe("Home Page", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;
  let dashboardStore: ReturnType<typeof mockStore<typeof useDashboardStore>>;

  async function mountHomePage(options: MountSuspendedOptions<typeof HomePage> = {}): Promise<VueWrapper> {
    return mountSuspended(HomePage, {
      shallow: true,
      global: {
        plugins: [pinia],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    pinia = createTestingPinia();
    wrapper = await mountHomePage();
    dashboardStore = mockStore(useDashboardStore);
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
    expect(dashboardStore.fetchAndStoreDashboardStats).toHaveBeenCalledExactlyOnceWith();
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
    const fakeQuestionStats = createFakeQuestionStatsDto({ total: 42 });
    const fakeQuestionThemeStats = createFakeQuestionThemeStatsDto({ total: 8 });
    dashboardStore.questionStats = fakeQuestionStats;
    dashboardStore.questionThemeStats = fakeQuestionThemeStats;
    await flushPromises();

    const tabs = wrapper.getComponent<typeof DashboardSummaryTabs>({ name: "DashboardSummaryTabs" });

    expect(tabs.props("questionTotal")).toBe(42);
  });

  it("should render DashboardSummaryTabs with actual questionThemeTotal when stats are loaded.", async() => {
    const fakeQuestionStats = createFakeQuestionStatsDto({ total: 42 });
    const fakeQuestionThemeStats = createFakeQuestionThemeStatsDto({ total: 8 });
    dashboardStore.questionStats = fakeQuestionStats;
    dashboardStore.questionThemeStats = fakeQuestionThemeStats;
    await flushPromises();

    const tabs = wrapper.getComponent<typeof DashboardSummaryTabs>({ name: "DashboardSummaryTabs" });

    expect(tabs.props("questionThemeTotal")).toBe(8);
  });

  it("should render QuestionStatsContent by default when activeTab is questions.", async() => {
    dashboardStore.questionStats = createFakeQuestionStatsDto();
    await flushPromises();

    const content = wrapper.findComponent<typeof QuestionStatsContent>({ name: "QuestionStatsContent" });

    expect(content.exists()).toBeTruthy();
  });

  it("should not render QuestionThemeStatsContent by default when activeTab is questions.", () => {
    const content = wrapper.findComponent<typeof QuestionThemeStatsContent>({ name: "QuestionThemeStatsContent" });

    expect(content.exists()).toBeFalsy();
  });

  it("should render QuestionThemeStatsContent when activeTab changes to questionThemes.", async() => {
    dashboardStore.questionThemeStats = createFakeQuestionThemeStatsDto();
    const tabs = wrapper.findComponent<typeof DashboardSummaryTabs>({ name: "DashboardSummaryTabs" });
    getWrapperVm(tabs).$emit("update:activeTab", DASHBOARD_TABS[1]);
    await flushPromises();

    const content = wrapper.findComponent<typeof QuestionThemeStatsContent>({ name: "QuestionThemeStatsContent" });

    expect(content.exists()).toBeTruthy();
  });

  it("should pass isFetchingDashboardStats as the isFetching prop to DashboardSummaryTabs when mounted.", () => {
    const tabs = wrapper.getComponent<typeof DashboardSummaryTabs>({ name: "DashboardSummaryTabs" });

    expect(tabs.props("isFetching")).toBe(false);
  });

  it("should render skeleton placeholders when dashboard stats are being fetched.", async() => {
    vi.spyOn(dashboardStore, "isFetchingDashboardStats", "get").mockReturnValue(true);
    wrapper = await mountHomePage();

    const skeletons = wrapper.findAllComponents({ name: "USkeleton" });

    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should not render skeleton placeholders when dashboard stats are not being fetched.", () => {
    const skeletons = wrapper.findAllComponents({ name: "USkeleton" });

    expect(skeletons).toHaveLength(0);
  });
});