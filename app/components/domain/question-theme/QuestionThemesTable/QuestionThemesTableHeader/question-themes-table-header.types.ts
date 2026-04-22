type QuestionThemesTableHeaderProperties = {
  searchTerm: string;
};

type QuestionThemesTableHeaderEmits = {
  "startCreate": [];
  "update:searchTerm": [value: string];
};

export type {
  QuestionThemesTableHeaderProperties as QuestionThemesTableHeaderProps,
  QuestionThemesTableHeaderEmits,
};