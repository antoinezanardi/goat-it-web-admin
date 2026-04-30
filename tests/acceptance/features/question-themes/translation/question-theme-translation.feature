@question-themes @question-theme-translation
Feature: 🎨 Question Theme Translations

  Scenario: 🎨 Translation completeness indicator is visible in the question themes table
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    Then the button with exact name "Translation status" should be visible

  Scenario: 🎨 Translation field context buttons are visible in the edit modal
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    Then the button with name "See translations for Label" should be visible
    And the button with name "See translations for Description" should be visible
    And the button with name "See translations for Aliases" should be visible

  Scenario: 🎨 Translation field context expands to show translations when clicked
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    And the user clicks on the button with exact name "See translations for Label"
    Then the text "FR" should be visible
    And the text "DE" should be visible
    And the text "ES" should be visible
    And the text "IT" should be visible
    And the text "PT" should be visible
