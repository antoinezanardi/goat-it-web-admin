@questions @question-theme-assignment-modification
Feature: 🏷️ Question Theme Assignment Modification

  Background:
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label     | slug      | description       | aliases |
      | Geography | geography | A geography theme | geo     |

  Scenario: 🏷️ A theme is assigned to a question and success toast is displayed
    And a question theme exists with the following attributes:
      | label   | slug    | description     | aliases |
      | History | history | A history theme | hist    |
    And the user is on questions page
    And a question exists with the following attributes:
      | statement                      | answer | difficulty | category | themes    | sourceUrls                      |
      | What is the capital of France? | Paris  | easy       | Knowledge & fun facts | Geography | https://en.wikipedia.org/France |
    When the user clicks on the button with name "Edit the question"
    Then the heading with exact name "Edit question" should be visible
    When the user adds the theme "History" in the question form theme selector
    Then the toast with exact text "Question theme assigned successfully" should be visible
    And the theme "History" should be visible in the question theme selector list

  Scenario: 🏷️ A theme is removed from a question and success toast is displayed
    And a question theme exists with the following attributes:
      | label   | slug    | description     | aliases |
      | History | history | A history theme | hist    |
    And the user is on questions page
    And a question exists with the following attributes:
      | statement                      | answer | difficulty | category | themes             | sourceUrls                      |
      | What is the capital of France? | Paris  | easy       | Knowledge & fun facts | Geography, History | https://en.wikipedia.org/France |
    When the user clicks on the button with name "Edit the question"
    Then the heading with exact name "Edit question" should be visible
    When the user removes the theme "History" from the question form selected themes
    Then the toast with exact text "Question theme removed successfully" should be visible
    And the theme "History" should be hidden in the question theme selector list

  Scenario: 🏷️ The remove button is hidden when only one theme remains on a question
    And the user is on questions page
    And a question exists with the following attributes:
      | statement                      | answer | difficulty | category | themes    | sourceUrls                      |
      | What is the capital of France? | Paris  | easy       | Knowledge & fun facts | Geography | https://en.wikipedia.org/France |
    When the user clicks on the button with name "Edit the question"
    Then the heading with exact name "Edit question" should be visible
    And the remove button for the theme "Geography" should be hidden in the question form theme selector

  Scenario: 🏷️ The remove button is disabled for the primary theme when multiple themes exist
    And a question theme exists with the following attributes:
      | label   | slug    | description     | aliases |
      | History | history | A history theme | hist    |
    And the user is on questions page
    And a question exists with the following attributes:
      | statement                      | answer | difficulty | category | themes             | sourceUrls                      |
      | What is the capital of France? | Paris  | easy       | Knowledge & fun facts | Geography, History | https://en.wikipedia.org/France |
    When the user clicks on the button with name "Edit the question"
    Then the heading with exact name "Edit question" should be visible
    And the remove button for the theme "Geography" should be disabled in the question form theme selector

  Scenario: 🏷️ A theme is set as primary on a question and success toast is displayed
    And a question theme exists with the following attributes:
      | label   | slug    | description     | aliases |
      | History | history | A history theme | hist    |
    And the user is on questions page
    And a question exists with the following attributes:
      | statement                      | answer | difficulty | category | themes             | sourceUrls                      |
      | What is the capital of France? | Paris  | easy       | Knowledge & fun facts | Geography, History | https://en.wikipedia.org/France |
    When the user clicks on the button with name "Edit the question"
    Then the heading with exact name "Edit question" should be visible
    When the user sets the theme "History" as primary in the question form theme selector
    Then the toast with exact text "Question theme modified successfully" should be visible

  Scenario: 🏷️ A theme hint is toggled on a question and success toast is displayed
    And the user is on questions page
    And a question exists with the following attributes:
      | statement                      | answer | difficulty | category | themes    | sourceUrls                      |
      | What is the capital of France? | Paris  | easy       | Knowledge & fun facts | Geography | https://en.wikipedia.org/France |
    When the user clicks on the button with name "Edit the question"
    Then the heading with exact name "Edit question" should be visible
    When the user toggles hint for the theme "Geography" in the question form theme selector
    Then the toast with exact text "Question theme modified successfully" should be visible
