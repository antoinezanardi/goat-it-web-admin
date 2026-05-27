import type { AppColor } from "~/utils/types/color.types.ts";

type QuestionCategoryUiMetadata = {
  icon: string;
  color: AppColor;
  labelKey: string;
};

type QuestionCognitiveDifficultyUiMetadata = {
  icon: string;
  color: AppColor;
  labelKey: string;
};

export type {
  QuestionCategoryUiMetadata,
  QuestionCognitiveDifficultyUiMetadata,
};