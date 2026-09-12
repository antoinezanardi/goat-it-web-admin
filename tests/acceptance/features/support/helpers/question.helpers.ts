import type { Locator } from "@playwright/test";

function getQuestionApplicableLocalesSelect(dialog: Locator): Locator {
  return dialog.getByTestId("question-applicable-locales-select");
}

export { getQuestionApplicableLocalesSelect };