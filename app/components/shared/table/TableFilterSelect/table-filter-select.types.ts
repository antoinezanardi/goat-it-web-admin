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

type TableFilterSelectProperties<T extends string = string> = {
  modelValue: T | undefined;
  items: TableFilterSelectItem<T>[];
  label: string;
  icon?: string;
  placeholder?: string;
};

type TableFilterSelectEmits<T extends string = string> = {
  "update:modelValue": [value: T | undefined];
};

export type {
  TableFilterSelectAllItem,
  TableFilterSelectItem,
  TableFilterSelectOptionItem,
  TableFilterSelectProperties as TableFilterSelectProps,
  TableFilterSelectEmits,
};