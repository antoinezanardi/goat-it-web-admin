import type { QuestionThemeCreationDtoShell } from "#shared/types/question-theme.types";
import { createLocalizedTextShell, createLocalizedTextsShell } from "~/composables/core/localization/helpers/shell/localization.shell.helpers";

function createQuestionThemeCreationDtoShell(): QuestionThemeCreationDtoShell {
  return {
    slug: undefined,
    label: createLocalizedTextShell(),
    description: createLocalizedTextShell(),
    aliases: createLocalizedTextsShell(),
    color: undefined,
  };
}

export {
  createQuestionThemeCreationDtoShell,
};