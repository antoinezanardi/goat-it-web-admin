import type { AppColor } from "~/utils/types/color.types";

type StatsCardItem = {
  labelKey: string;
  value: number;
  color: AppColor;
};

type StatsCardView = "doughnut" | "bar";

export type {
  StatsCardItem,
  StatsCardView,
};