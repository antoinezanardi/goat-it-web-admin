type QuestionThemesTableHeaderProperties = {
  searchTerm: string;
  activeFilterCount: number;
  statusFilter: string | undefined;
};

type QuestionThemesTableHeaderEmits = {
  "startCreate": [];
  "update:searchTerm": [value: string];
  "update:statusFilter": [value: string | undefined];
  "clearFilters": [];
};

export type {
  QuestionThemesTableHeaderProperties as QuestionThemesTableHeaderProps,
  QuestionThemesTableHeaderEmits,
};