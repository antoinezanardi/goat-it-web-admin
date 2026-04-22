type TableGlobalFilterInputProperties = {
  modelValue: string;
  placeholder?: string;
};

type TableGlobalFilterInputEmits = {
  "update:modelValue": [value: string];
};

export type {
  TableGlobalFilterInputProperties as TableGlobalFilterInputProps,
  TableGlobalFilterInputEmits,
};