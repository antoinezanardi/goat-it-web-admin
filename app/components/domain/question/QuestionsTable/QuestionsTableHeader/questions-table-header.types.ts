type QuestionsTableHeaderProperties = {
  searchTerm: string;
};

type QuestionsTableHeaderEmits = {
  "startCreate": [];
  "update:searchTerm": [value: string];
};

export type {
  QuestionsTableHeaderProperties as QuestionsTableHeaderProps,
  QuestionsTableHeaderEmits,
};