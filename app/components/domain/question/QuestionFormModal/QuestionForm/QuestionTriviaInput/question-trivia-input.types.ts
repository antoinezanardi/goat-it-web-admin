type QuestionTriviaInputProps = {
  modelValue?: string[];
};

type QuestionTriviaInputEmits = {
  "update:modelValue": [value: string[]];
};

export type { QuestionTriviaInputEmits, QuestionTriviaInputProps };