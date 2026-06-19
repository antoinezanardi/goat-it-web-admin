type TableGlobalSearchInputProps = {
  modelValue: string;
  placeholder?: string;
};

type TableGlobalSearchInputEmits = {
  "update:modelValue": [value: string];
};

export type {
  TableGlobalSearchInputProps,
  TableGlobalSearchInputEmits,
};