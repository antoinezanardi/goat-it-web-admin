@questions @question-modification
Feature: ❓ Question Modification

  Scenario: ❓ Question statement is modified and success toast is displayed
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
    When the user fills the input with name "Statement*" with text "What is the capital of Germany?"
    And the user fills the input with name "Answer*" with text "Berlin"
    And the user clicks on the button with name "Edit"
    Then the toast with exact text "Question modified successfully" should be visible

  Scenario: ❓ Question modification modal opens with pre-filled fields
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
    And the button with name "Edit" should be enabled

  Scenario: ❓ Question modification modal closes without saving when clicking close button in the modal header
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
    When the user clicks on the close button in the modal header
    Then the heading with exact name "Edit question" should be hidden

  Scenario: ❓ Question modification modal closes without saving when clicking close button in the modal footer
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
    When the user clicks on the close button in the modal footer
    Then the heading with exact name "Edit question" should be hidden
