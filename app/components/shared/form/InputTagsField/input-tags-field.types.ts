import type { VNode } from "vue";

type InputTagsFieldProperties = {
  modelValue?: string[];
  addHintText: string;
  removeTooltipText: (item: string) => string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  duplicate?: boolean;
  addOnBlur?: boolean;
  addOnTab?: boolean;
  ui?: Record<string, string>;
};

type InputTagsFieldEmits = {
  "update:modelValue": [value: string[]];
};

type InputTagsFieldSlots = {
  itemText: (props: { item: string }) => VNode[];
};

export type { InputTagsFieldEmits, InputTagsFieldProperties, InputTagsFieldSlots };