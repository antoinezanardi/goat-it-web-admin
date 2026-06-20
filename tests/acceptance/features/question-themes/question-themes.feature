@question-themes @question-themes-page
Feature: 🎨 Question Themes Page

  Scenario: 🎨 Question Themes Page is displayed with correct heading
    Given the user is on question-themes page
    Then the heading with exact name "Question Themes" should be visible

  Scenario: 🎨 Display row count for question themes table
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label       | slug        | description       | aliases |
      | Alpha Theme | alpha-theme | Alpha description | alpha   |
      | Beta Theme  | beta-theme  | Beta description  | beta    |
    Then the exact text "2 themes" should be visible
    When the user fills the input with name "Search..." with text "Alpha"
    Then the exact text "1 theme" should be visible
