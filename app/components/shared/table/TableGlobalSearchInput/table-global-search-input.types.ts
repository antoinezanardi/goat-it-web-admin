type TableGlobalSearchInputProperties = {
  modelValue: string;
  placeholder?: string;
};

type TableGlobalSearchInputEmits = {
  "update:modelValue": [value: string];
};

export type {
  TableGlobalSearchInputProperties as TableGlobalSearchInputProps,
  TableGlobalSearchInputEmits,
};