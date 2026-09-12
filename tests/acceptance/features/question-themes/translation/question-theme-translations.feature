@question-themes @question-theme-translation
Feature: 🎨 Question Theme Translations

  Background:
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |

  Scenario: 🎨 Translation completeness indicator is visible in the question themes table
    Then the button with exact name "Translation status" should be visible

  Scenario: 🎨 Translation completeness indicator is visible in the edit modal header
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    Then the heading with exact name "Edit theme" should be visible
    And the button with exact name "Translation status" should be visible

  Scenario: 🎨 Translation field context buttons are visible in the edit modal
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    Then the button with name "See translations for Label" should be visible
    And the button with name "See translations for Description" should be visible
    And the button with name "See translations for Aliases" should be visible

  Scenario: 🎨 Translation field context expands to show translations except current locale when clicked
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    And the user clicks on the button with exact name "See translations for Label"
    Then the text "FR" should be visible
    And the text "DE" should be visible
    And the text "ES" should be visible
    And the text "IT" should be visible
    And the text "PT" should be visible
    And the exact text "EN" should be hidden

  Scenario: 🎨 Translation completeness indicator updates in table and modal when locales are filled one by one
    When the user clicks on the button with exact name "Translation status"
    Then the locale "en" should be marked as complete in the translation status
    And the locale "fr" should be marked as incomplete in the translation status
    And the locale "de" should be marked as incomplete in the translation status
    And the locale "es" should be marked as incomplete in the translation status
    And the locale "it" should be marked as incomplete in the translation status
    And the locale "pt" should be marked as incomplete in the translation status
    When the user presses the "Escape" key
    And the user clicks on the button with exact name "Edit question theme with slug test-theme"
    And the user clicks on the button with exact name "Translation status"
    Then the locale "en" should be marked as complete in the translation status
    And the locale "fr" should be marked as incomplete in the translation status
    When the user presses the "Escape" key
    And the user clicks on the close button in the modal header
    Then the heading with exact name "Edit theme" should be hidden
    When the user switches the locale to "Français"
    And the user clicks on the element with testid "edit-button-test-theme"
    And the user fills and submits the question theme edit form with the following attributes:
      | label         | description      | aliases |
      | Thème de test | Un thème de test | test-fr |
    And the user clicks on the button with exact name "Statut de traduction"
    Then the locale "en" should be marked as complete in the translation status
    And the locale "fr" should be marked as complete in the translation status
    And the locale "de" should be marked as incomplete in the translation status
    And the locale "es" should be marked as incomplete in the translation status
    And the locale "it" should be marked as incomplete in the translation status
    And the locale "pt" should be marked as incomplete in the translation status
    When the user presses the "Escape" key
    And the user clicks on the element with testid "edit-button-test-theme"
    And the user clicks on the button with exact name "Statut de traduction"
    Then the locale "en" should be marked as complete in the translation status
    And the locale "fr" should be marked as complete in the translation status
    And the locale "de" should be marked as incomplete in the translation status

  Scenario: 🎨 Translation overview shows filled locale values in table popover and modal collapsibles
    When the user switches the locale to "Français"
    And the user clicks on the text "Aucune traduction disponible"
    Then the text "Test Theme" should be visible
    When the user presses the "Escape" key
    Then the exact text "Test Theme" should be hidden
    When the user clicks on the element with testid "edit-button-test-theme"
    And the user fills and submits the question theme edit form with the following attributes:
      | label         | description      | aliases |
      | Thème de test | Un thème de test | test-fr |
    And the user switches the locale to "English"
    And the user clicks on the element with testid "edit-button-test-theme"
    And the user clicks on the button with exact name "See translations for Label"
    Then the text "Thème de test" should be visible
    When the user clicks on the button with exact name "See translations for Description"
    Then the text "Un thème de test" should be visible
    When the user clicks on the button with exact name "See translations for Aliases"
    Then the text "test-fr" should be visible