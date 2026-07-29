type DashboardSummaryTabProps = {
  icon: string;
  iconClass: string;
  labelKey: string;
  testId: string;
  value: number;
  isFetching: boolean;
  active: boolean;
};

type DashboardSummaryTabEmits = {
  select: [];
};

export type {
  DashboardSummaryTabEmits,
  DashboardSummaryTabProps,
};