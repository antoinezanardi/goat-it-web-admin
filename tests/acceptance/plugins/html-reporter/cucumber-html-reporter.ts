import reporter from "cucumber-html-reporter";

import {
  ACCEPTANCE_TESTS_REPORTS_PATH,
  ACCEPTANCE_TESTS_REPORTS_SCREENSHOTS_PATH,
} from "#acceptance/features/support/constants/acceptance.constants.ts";

const REPORT_JSON_PATH = `${ACCEPTANCE_TESTS_REPORTS_PATH}/report.json`;

const REPORT_HTML_PATH = `${ACCEPTANCE_TESTS_REPORTS_PATH}/index.html`;

reporter.generate({
  theme: "bootstrap",
  jsonFile: REPORT_JSON_PATH,
  output: REPORT_HTML_PATH,
  screenshotsDirectory: ACCEPTANCE_TESTS_REPORTS_SCREENSHOTS_PATH,
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  launchReport: false,
});