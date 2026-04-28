@question-theme-creation

Feature: 🎨 Question Theme Creation

  Scenario: 🎨 Question Theme is created and displayed in the list
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    And the user fills the input with name "Label*" with text "Acceptance Test Theme"
    And the user fills the input with name "Slug*" with text "acceptance-test-theme"
    And the user fills the input with name "Description*" with text "A theme for acceptance testing"
    And the user fills the input with name "Aliases*" with text "test"
    And the user presses the "Enter" key
    And the user fills the input with name "Color" with text "FF5733"
    And the user clicks on the button with name "Create"
    Then the text "Acceptance Test Theme" should be visible