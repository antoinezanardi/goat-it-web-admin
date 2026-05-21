@questions @accessibility @question-modification
Feature: ❓ Question Modification Form Accessibility

  Scenario Outline: ❓ Question Modification Form should not contain accessibility issues in light <View> mode
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label     | slug      | description       | aliases |
      | Geography | geography | A geography theme | geo     |
    And the user is on questions page
    And a question exists with the following attributes:
      | statement                      | answer | difficulty | category | themes    | sourceUrls                      |
      | What is the capital of France? | Paris  | easy       | Trivia   | Geography | https://en.wikipedia.org/France |
    When the user clicks on the button with name "Edit the question"
    Then the heading with exact name "Edit question" should be visible
    And the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |

  Scenario Outline: ❓ Question Modification Form should not contain accessibility issues in dark <View> mode
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label     | slug      | description       | aliases |
      | Geography | geography | A geography theme | geo     |
    And the user is on questions page
    And a question exists with the following attributes:
      | statement                      | answer | difficulty | category | themes    | sourceUrls                      |
      | What is the capital of France? | Paris  | easy       | Trivia   | Geography | https://en.wikipedia.org/France |
    When the user switches to dark mode
    And the user clicks on the button with name "Edit the question"
    Then the heading with exact name "Edit question" should be visible
    And the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |
