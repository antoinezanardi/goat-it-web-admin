@questions @question-creation
Feature: ❓ Question Creation

  Scenario: ❓ Question is created and displayed successfully
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label     | slug      | description       | aliases |
      | Geography | geography | A geography theme | geo     |
    And the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement                      | answer | difficulty | category | themes    | sourceUrls                      |
      | What is the capital of France? | Paris  | easy       | Trivia   | Geography | https://en.wikipedia.org/France |
    And the user clicks on the button with name "Create"
    Then the toast with exact text "Question created successfully" should be visible

  Scenario: ❓ Question creation form Create button is disabled when required fields are empty
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    Then the button with name "Create" should be disabled

  Scenario: ❓ Question creation form Create button is disabled when themes are missing
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label     | slug      | description       | aliases |
      | Geography | geography | A geography theme | geo     |
    And the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement | answer | difficulty | category | sourceUrls          |
      | Test      | Answer | easy       | Trivia   | https://example.com |
    Then the button with name "Create" should be disabled

  Scenario: ❓ Question creation modal closes without creating when clicking close button in the modal footer
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    Then the heading with exact name "Create a new question" should be visible
    When the user clicks on the close button in the modal footer
    Then the heading with exact name "Create a new question" should be hidden

  Scenario: ❓ Question can be created with optional context field
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label   | slug    | description     | aliases |
      | History | history | A history theme | hist    |
    And the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement | answer | context            | difficulty | category | themes  | sourceUrls          |
      | Test      | Answer | Some extra context | medium     | Riddle   | History | https://example.com |
    And the user clicks on the button with name "Create"
    Then the toast with exact text "Question created successfully" should be visible

  Scenario: ❓ Theme can be re-added after removal
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label     | slug      | description       | aliases |
      | Geography | geography | A geography theme | geo     |
    And the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | themes    |
      | Geography |
    Then the theme "Geography" should be visible in the question theme selector list
    When the user removes the theme "Geography" from the selected themes
    Then the theme "Geography" should be hidden in the question theme selector list
    When the user fills the question form with the following attributes:
      | themes    |
      | Geography |
    Then the theme "Geography" should be visible in the question theme selector list

  Scenario: ❓ Source URL validation blocks invalid URLs
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user types "not-a-url" in the source urls input and presses Enter
    Then the text "Must be a valid URL" should be visible
    And the source urls input should have no tags

  Scenario: ❓ Source URL validation blocks duplicate URLs
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label     | slug      | description       | aliases |
      | Geography | geography | A geography theme | geo     |
    And the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | sourceUrls          |
      | https://example.com |
    And the user types "https://example.com" in the source urls input and presses Enter
    Then the text "This URL has already been added" should be visible
