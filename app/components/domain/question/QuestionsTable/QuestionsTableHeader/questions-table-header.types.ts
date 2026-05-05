type QuestionsTableHeaderProperties = {
  searchTerm: string;
};

type QuestionsTableHeaderEmits = {
  "update:searchTerm": [value: string];
};

export type {
  QuestionsTableHeaderProperties as QuestionsTableHeaderProps,
  QuestionsTableHeaderEmits,
};