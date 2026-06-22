type TableFilterSelectItem<T extends string = string> = {
  label: string;
  value: T;
  icon?: string;
};

type TableFilterSelectAllItem = {
  label: string;
  value: undefined;
};

type TableFilterSelectOptionItem<T extends string = string> = TableFilterSelectItem<T> | TableFilterSelectAllItem;

type TableFilterSelectProps<T extends string = string> = {
  modelValue: T | undefined | T[];
  items: TableFilterSelectItem<T>[];
  label: string;
  icon?: string;
  placeholder?: string;
  multiple?: boolean;
  loading?: boolean;
};

type TableFilterSelectEmits<T extends string = string> = {
  "update:modelValue": [value: T | undefined | T[]];
};

export type {
  TableFilterSelectAllItem,
  TableFilterSelectItem,
  TableFilterSelectOptionItem,
  TableFilterSelectProps,
  TableFilterSelectEmits,
};