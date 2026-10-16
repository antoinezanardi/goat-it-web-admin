@questions @question-adult-content
Feature: ❓ Question Adult Content

  Background:
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label     | slug      | description       | aliases |
      | Geography | geography | A geography theme | geo     |
    And the user is on questions page

  Scenario: ❓ New question has adult content off by default
    When the user clicks on the button with name "Create a new question"
    Then the question adult content switch should be off
    When the user fills the question form with the following attributes:
      | statement | answer | difficulty | category              | themes    | sourceUrls          |
      | Test      | Answer | easy       | Knowledge & fun facts | Geography | https://example.com |
    And the user clicks on the button with name "Create"
    Then the toast with exact text "Question created successfully" should be visible
    When the user reloads the page
    And the user clicks on the button with name "Edit the question"
    Then the question adult content switch should be off

  Scenario: ❓ Question can be created marked as adult content
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement | answer | difficulty | category              | themes    | sourceUrls          | isAdultContent |
      | Test      | Answer | easy       | Knowledge & fun facts | Geography | https://example.com | true           |
    And the user clicks on the button with name "Create"
    Then the toast with exact text "Question created successfully" should be visible
    When the user reloads the page
    And the user clicks on the button with name "Edit the question"
    Then the question adult content switch should be on

  Scenario: ❓ Adult content question can be switched off and persisted as false
    Given a question exists with the following attributes:
      | statement | answer | difficulty | category              | themes    | sourceUrls          | isAdultContent |
      | Test      | Answer | easy       | Knowledge & fun facts | Geography | https://example.com | true           |
    When the user clicks on the button with name "Edit the question"
    Then the question adult content switch should be on
    When the user toggles the question adult content switch
    And the user clicks on the button with name "Edit"
    Then the toast with exact text "Question modified successfully" should be visible
    When the user reloads the page
    And the user clicks on the button with name "Edit the question"
    Then the question adult content switch should be off

  Scenario: ❓ Non adult content question keeps the switch off unless enabled
    Given a question exists with the following attributes:
      | statement | answer | difficulty | category              | themes    | sourceUrls          |
      | Test      | Answer | easy       | Knowledge & fun facts | Geography | https://example.com |
    When the user clicks on the button with name "Edit the question"
    Then the question adult content switch should be off
    When the user fills the input with name "Statement*" with text "What is the capital of Germany?"
    And the user clicks on the button with name "Edit"
    Then the toast with exact text "Question modified successfully" should be visible
    When the user reloads the page
    And the user clicks on the button with name "Edit the question"
    Then the question adult content switch should be off
