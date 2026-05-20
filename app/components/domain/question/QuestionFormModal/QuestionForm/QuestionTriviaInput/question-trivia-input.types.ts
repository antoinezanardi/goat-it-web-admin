type QuestionTriviaInputProperties = {
  modelValue?: string[];
};

type QuestionTriviaInputEmits = {
  "update:modelValue": [value: string[]];
};

export type { QuestionTriviaInputEmits, QuestionTriviaInputProperties };