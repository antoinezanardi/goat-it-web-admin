@questions-page
Feature: ❓ Questions Page

  Scenario: ❓ Questions Page is displayed with correct heading
    Given the user is on questions page
    Then the heading with exact name "Questions" should be visible

  Scenario: ❓ Display row count for questions table
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label  | slug   | description    | aliases |
      | Nature | nature | Nature things | nature  |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement      | answer | difficulty | category               | themes | sourceUrls          |
      | Alpha question | Alpha  | easy       | Knowledge & fun facts | Nature | https://example.com |
      | Beta question  | Beta   | easy       | Knowledge & fun facts | Nature | https://example.com |
    Then the exact text "2 questions" should be visible
    When the user fills the input with name "Search..." with text "Alpha"
    Then the exact text "1 question" should be visible
