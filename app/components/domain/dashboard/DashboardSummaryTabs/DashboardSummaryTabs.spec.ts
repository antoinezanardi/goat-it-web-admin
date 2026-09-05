import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import DashboardSummaryTabsComponent from "@/components/domain/dashboard/DashboardSummaryTabs/DashboardSummaryTabs.vue";
import { DASHBOARD_TABS } from "@/components/domain/dashboard/DashboardSummaryTabs/dashboard-summary-tabs.constants";
import type { DashboardSummaryTabsProps } from "@/components/domain/dashboard/DashboardSummaryTabs/dashboard-summary-tabs.types";

const [QUESTIONS, QUESTION_THEMES] = DASHBOARD_TABS;

describe("DashboardSummaryTabs Component", () => {
  let wrapper: VueWrapper;

  const defaultProps: DashboardSummaryTabsProps = {
    questionTotal: 42,
    questionThemeTotal: 8,
    activeTab: QUESTIONS,
    isFetching: false,
  };

  async function mountDashboardSummaryTabs(options: MountSuspendedOptions<typeof DashboardSummaryTabsComponent> = {}): Promise<VueWrapper> {
    return mountSuspended(DashboardSummaryTabsComponent, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountDashboardSummaryTabs();
  });

  it("should render DashboardSummaryTabs when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render the questions tab with translated label when mounted.", () => {
    expect(wrapper.text()).toContain("home.tabs.questions");
  });

  it("should render the questionThemes tab with translated label when mounted.", () => {
    expect(wrapper.text()).toContain("home.tabs.questionThemes");
  });

  it("should emit update:activeTab with questionThemes when clicking the inactive themes tab.", async() => {
    const themeCards = wrapper.findAllComponents({ name: "UCard" });

    await themeCards[1]?.trigger("click");

    expect(wrapper.emitted("update:activeTab")).toStrictEqual([[QUESTION_THEMES]]);
  });

  it("should not emit when clicking the already active tab.", async() => {
    const themeCards = wrapper.findAllComponents({ name: "UCard" });

    await themeCards[0]?.trigger("click");

    expect(wrapper.emitted("update:activeTab")).toBeUndefined();
  });

  it("should emit update:activeTab with questions when clicking the questions tab while questionThemes is active.", async() => {
    wrapper = await mountDashboardSummaryTabs({
      props: { ...defaultProps, activeTab: QUESTION_THEMES },
    });
    const cards = wrapper.findAllComponents({ name: "UCard" });

    await cards[0]?.trigger("click");

    expect(wrapper.emitted("update:activeTab")).toStrictEqual([[QUESTIONS]]);
  });

  it("should not emit when clicking the already active themes tab.", async() => {
    wrapper = await mountDashboardSummaryTabs({
      props: { ...defaultProps, activeTab: QUESTION_THEMES },
    });
    const cards = wrapper.findAllComponents({ name: "UCard" });

    await cards[1]?.trigger("click");

    expect(wrapper.emitted("update:activeTab")).toBeUndefined();
  });

  it("should render USkeleton placeholders instead of numbers when isFetching is true.", async() => {
    wrapper = await mountDashboardSummaryTabs({
      props: { ...defaultProps, isFetching: true },
    });

    const skeletons = wrapper.findAllComponents({ name: "USkeleton" });

    expect(skeletons).toHaveLength(2);
  });

  it("should add aria-selected true on the active questions tab when mounted.", () => {
    const cards = wrapper.findAll("[role='tab']");

    expect(cards[0]?.attributes("aria-selected")).toBe("true");
  });

  it("should add aria-selected false on the inactive questionThemes tab when mounted.", () => {
    const cards = wrapper.findAll("[role='tab']");

    expect(cards[1]?.attributes("aria-selected")).toBe("false");
  });

  it("should emit update:activeTab with questionThemes when pressing Enter on the themes card.", async() => {
    const cards = wrapper.findAll("[role='tab']");

    await cards[1]?.trigger("keydown", { key: "Enter" });

    expect(wrapper.emitted("update:activeTab")).toStrictEqual([[QUESTION_THEMES]]);
  });

  it("should emit update:activeTab with questions when pressing Space on the questions card while themes is active.", async() => {
    wrapper = await mountDashboardSummaryTabs({
      props: { ...defaultProps, activeTab: QUESTION_THEMES },
    });
    const cards = wrapper.findAll("[role='tab']");

    await cards[0]?.trigger("keydown", { key: " " });

    expect(wrapper.emitted("update:activeTab")).toStrictEqual([[QUESTIONS]]);
  });

  it("should not emit when pressing a non-activation key on the questions card.", async() => {
    const cards = wrapper.findAll("[role='tab']");

    await cards[0]?.trigger("keydown", { key: "ArrowRight" });

    expect(wrapper.emitted("update:activeTab")).toBeUndefined();
  });

  it("should not emit when pressing a non-activation key on the themes card.", async() => {
    const cards = wrapper.findAll("[role='tab']");

    await cards[1]?.trigger("keydown", { key: "Escape" });

    expect(wrapper.emitted("update:activeTab")).toBeUndefined();
  });

  it("should apply grid-cols-1 class to the tablist container when mounted.", () => {
    const tablist = wrapper.find("[role='tablist']");

    expect(tablist.classes()).toContain("grid-cols-1");
  });

  it("should apply sm:grid-cols-2 class to the tablist container when mounted.", () => {
    const tablist = wrapper.find("[role='tablist']");

    expect(tablist.classes()).toContain("sm:grid-cols-2");
  });
});