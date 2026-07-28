type DashboardTab = "questions" | "questionThemes";

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