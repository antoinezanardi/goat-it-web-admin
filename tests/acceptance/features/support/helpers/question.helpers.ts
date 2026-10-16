import type { Locator } from "@playwright/test";

function getQuestionApplicableLocalesSelect(dialog: Locator): Locator {
  return dialog.getByTestId("question-applicable-locales-select");
}

function getQuestionAdultContentSwitch(dialog: Locator): Locator {
  return dialog.getByTestId("question-adult-content-switch");
}

export { getQuestionAdultContentSwitch, getQuestionApplicableLocalesSelect };