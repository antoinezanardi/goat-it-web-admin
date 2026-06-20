@questions-page
Feature: ❓ Questions Page

  Scenario: ❓ Questions Page is displayed with correct heading
    Given the user is on questions page
    Then the heading with exact name "Questions" should be visible

  Scenario: ❓ Display row count for questions table
    Given the user is on questions page
    And multiple questions exist with the following attributes:
      | statement      | difficulty | category                | status |
      | Alpha question | easy       | Knowledge & fun facts  | active |
      | Beta question  | easy       | Knowledge & fun facts  | active |
    Then the exact text "2 questions" should be visible
    When the user fills the input with name "Search..." with text "Alpha"
    Then the exact text "1 question" should be visible