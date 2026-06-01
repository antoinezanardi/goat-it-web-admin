type TableFilterSelectItem = {
  label: string;
  value: string;
};

type TableFilterSelectAllItem = {
  label: string;
  value: undefined;
};

type TableFilterSelectOptionItem = TableFilterSelectItem | TableFilterSelectAllItem;

type TableFilterSelectProperties = {
  modelValue: string | undefined;
  items: TableFilterSelectItem[];
  label: string;
  icon?: string;
  placeholder?: string;
};

type TableFilterSelectEmits = {
  "update:modelValue": [value: string | undefined];
};

export type {
  TableFilterSelectAllItem,
  TableFilterSelectItem,
  TableFilterSelectOptionItem,
  TableFilterSelectProperties as TableFilterSelectProps,
  TableFilterSelectEmits,
};