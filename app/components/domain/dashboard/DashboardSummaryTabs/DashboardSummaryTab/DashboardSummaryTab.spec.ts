import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import DashboardSummaryTabComponent from "@/components/domain/dashboard/DashboardSummaryTabs/DashboardSummaryTab/DashboardSummaryTab.vue";
import type { DashboardSummaryTabProps } from "@/components/domain/dashboard/DashboardSummaryTabs/DashboardSummaryTab/dashboard-summary-tab.types";

describe("DashboardSummaryTab Component", () => {
  let wrapper: VueWrapper;

  const defaultProps: DashboardSummaryTabProps = {
    icon: "i-lucide-circle-help",
    iconClass: "text-primary",
    labelKey: "home.tabs.questions",
    testId: "dashboard-summary-tab-questions",
    value: 42,
    isFetching: false,
    active: false,
  };

  async function mountDashboardSummaryTab(options: MountSuspendedOptions<typeof DashboardSummaryTabComponent> = {}): Promise<VueWrapper> {
    return mountSuspended(DashboardSummaryTabComponent, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountDashboardSummaryTab();
  });

  it("should render the UCard component when mounted.", () => {
    const card = wrapper.findComponent({ name: "UCard" });

    expect(card.exists()).toBeTruthy();
  });

  it("should render the translated label text when mounted.", () => {
    expect(wrapper.text()).toContain(defaultProps.labelKey);
  });

  it("should render the icon with correct name when mounted.", () => {
    const icon = wrapper.findComponent({ name: "UIcon" });

    expect(icon.props("name")).toBe(defaultProps.icon);
  });

  it("should render the icon with correct class when mounted.", () => {
    const icon = wrapper.findComponent({ name: "UIcon" });

    expect(icon.classes()).toContain(defaultProps.iconClass);
  });

  it("should not render the value span when isFetching is true.", async() => {
    wrapper = await mountDashboardSummaryTab({
      props: { ...defaultProps, isFetching: true },
    });

    const boldSpan = wrapper.find("span.font-bold");

    expect(boldSpan.exists()).toBeFalsy();
  });

  it("should render USkeleton when isFetching is true.", async() => {
    wrapper = await mountDashboardSummaryTab({
      props: { ...defaultProps, isFetching: true },
    });

    const skeleton = wrapper.findComponent({ name: "USkeleton" });

    expect(skeleton.exists()).toBeTruthy();
  });

  it("should not render USkeleton when isFetching is false.", () => {
    const skeleton = wrapper.findComponent({ name: "USkeleton" });

    expect(skeleton.exists()).toBeFalsy();
  });

  it("should set aria-selected to false when active is false.", () => {
    const card = wrapper.find("[role='tab']");

    expect(card.attributes("aria-selected")).toBe("false");
  });

  it("should set aria-selected to true when active is true.", async() => {
    wrapper = await mountDashboardSummaryTab({
      props: { ...defaultProps, active: true },
    });
    const card = wrapper.find("[role='tab']");

    expect(card.attributes("aria-selected")).toBe("true");
  });

  it("should emit select when clicking an inactive tab.", async() => {
    const card = wrapper.find("[role='tab']");

    await card.trigger("click");

    expect(wrapper.emitted("select")).toHaveLength(1);
  });

  it("should not emit select when clicking an already active tab.", async() => {
    wrapper = await mountDashboardSummaryTab({
      props: { ...defaultProps, active: true },
    });
    const card = wrapper.find("[role='tab']");

    await card.trigger("click");

    expect(wrapper.emitted("select")).toBeUndefined();
  });

  it("should emit select when pressing Enter on an inactive tab.", async() => {
    const card = wrapper.find("[role='tab']");

    await card.trigger("keydown", { key: "Enter" });

    expect(wrapper.emitted("select")).toHaveLength(1);
  });

  it("should emit select when pressing Space on an inactive tab.", async() => {
    const card = wrapper.find("[role='tab']");

    await card.trigger("keydown", { key: " " });

    expect(wrapper.emitted("select")).toHaveLength(1);
  });

  it("should not emit select when pressing a non-activation key.", async() => {
    const card = wrapper.find("[role='tab']");

    await card.trigger("keydown", { key: "ArrowRight" });

    expect(wrapper.emitted("select")).toBeUndefined();
  });

  it("should apply the active ring class when active is true.", async() => {
    wrapper = await mountDashboardSummaryTab({
      props: { ...defaultProps, active: true },
    });
    const card = wrapper.findComponent({ name: "UCard" });

    expect(card.classes()).toContain("ring-2");
  });

  it("should not apply the active ring class when active is false.", () => {
    const card = wrapper.findComponent({ name: "UCard" });

    expect(card.classes()).not.toContain("ring-2");
  });
});