type QuestionThemesTableRow = {
  id: QuestionTheme["id"];
  slug: QuestionTheme["slug"];
  label?: string;
  description?: string;
  aliases?: string[];
  status: QuestionTheme["status"];
};

export type { QuestionThemesTableRow };