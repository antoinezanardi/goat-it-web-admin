import type { QuestionAuthorRole } from "@goat-it/schemas/question";

type QuestionDefaultAuthor = {
  role: QuestionAuthorRole;
  name: string;
};

const QUESTION_DEFAULT_AUTHOR: QuestionDefaultAuthor = {
  role: "admin",
  name: "Admin",
} as const;

export type { QuestionDefaultAuthor };

export { QUESTION_DEFAULT_AUTHOR };