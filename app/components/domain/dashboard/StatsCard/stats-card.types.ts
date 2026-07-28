type StatsCardItem = {
  labelKey: string;
  value: number;
  color: string;
};

type StatsCardView = "doughnut" | "bar";

type StatsCardProps = {
  titleKey: string;
  items: StatsCardItem[];
  defaultView: StatsCardView;
  testId: string;
};

export type {
  StatsCardItem,
  StatsCardView,
  StatsCardProps,
};