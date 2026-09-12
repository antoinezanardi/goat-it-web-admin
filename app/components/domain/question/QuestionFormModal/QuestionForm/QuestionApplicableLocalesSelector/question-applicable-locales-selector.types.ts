import type { Locale } from "@goat-it/schemas/shared/locale";

type QuestionApplicableLocalesSelectorProps = {
  modelValue: Locale[] | undefined;
  disabled?: boolean;
};

type QuestionApplicableLocalesSelectorEmits = {
  "update:modelValue": [value: Locale[] | undefined];
};

export type {
  QuestionApplicableLocalesSelectorProps,
  QuestionApplicableLocalesSelectorEmits,
};