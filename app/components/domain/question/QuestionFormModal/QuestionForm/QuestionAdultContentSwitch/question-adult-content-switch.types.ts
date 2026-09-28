type QuestionAdultContentSwitchProps = {
  modelValue: boolean;
  disabled?: boolean;
};

type QuestionAdultContentSwitchEmits = {
  "update:modelValue": [value: boolean];
};

export type {
  QuestionAdultContentSwitchProps,
  QuestionAdultContentSwitchEmits,
};