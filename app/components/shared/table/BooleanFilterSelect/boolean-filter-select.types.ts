type BooleanFilterSelectValue = "yes" | "no";

type BooleanFilterSelectOption = {
  label: string;
  value: BooleanFilterSelectValue | undefined;
};

type BooleanFilterSelectProps = {
  modelValue: boolean | undefined;
  label: string;
};

type BooleanFilterSelectEmits = {
  "update:modelValue": [value: boolean | undefined];
};

export type {
  BooleanFilterSelectValue,
  BooleanFilterSelectOption,
  BooleanFilterSelectProps,
  BooleanFilterSelectEmits,
};