import type { TupleToUnion } from "type-fest";

import type { DASHBOARD_TABS } from "~/components/domain/dashboard/DashboardSummaryTabs/dashboard-summary-tabs.constants";

type DashboardTab = TupleToUnion<typeof DASHBOARD_TABS>;

type DashboardSummaryTabsProps = {
  questionTotal: number;
  questionThemeTotal: number;
  activeTab: DashboardTab;
  isFetching: boolean;
};

type DashboardSummaryTabsEmits = {
  "update:activeTab": [tab: DashboardTab];
};

export type {
  DashboardSummaryTabsProps,
  DashboardSummaryTabsEmits,
  DashboardTab,
};