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

  Scenario: ❓ Expand a question row to see its answer, context and trivia
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label  | slug   | description    | aliases |
      | Nature | nature | Nature things | nature  |
    And the user is on questions page
    And a question exists with the following attributes:
      | statement | answer                  | context                               | trivia                                                                    | difficulty | category               | themes | sourceUrls          |
      | Test      | Paris is the capital    | France is a country in Western Europe | Paris was founded in the 3rd century BC, Paris was originally called Lutetia | easy       | Knowledge & fun facts | Nature | https://example.com |
    When the user clicks the expand button on the question row with statement "Test"
    Then the exact text "Answer" should be visible
    And the exact text "Paris is the capital" should be visible
    And the exact text "Context" should be visible
    And the exact text "France is a country in Western Europe" should be visible
    And the exact text "Trivia" should be visible
    And the text "- Paris was founded in the 3rd century BC" should be visible
    And the text "- Paris was originally called Lutetia" should be visible
