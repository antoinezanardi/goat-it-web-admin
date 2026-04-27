@question-themes-page

Feature: 🎨 Question Themes Page

  Scenario: 🎨 Question Themes Page is displayed with correct heading
    Given the user is on question-themes page
    Then the heading with exact name "Question Themes" should be visible

  Scenario: 🎨 Question Themes Page should not contain accessibility issues in desktop mode
    Given the user is on question-themes page
    Then the page should not contain accessibility issues in desktop mode

  Scenario: 🎨 Question Themes Page should not contain accessibility issues in mobile mode
    Given the user is on question-themes page
    Then the page should not contain accessibility issues in mobile mode