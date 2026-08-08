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

  @question-themes-page
  Scenario: 🎨 Question Themes page should show confirmation dialog when navigating away with dirty form open
    Given the user is on questions page
    When the user clicks on the navigation link with name "Question Themes"
    And the user clicks on the button with name "Create a new theme"
    And the user fills the question theme form with the following attributes:
      | label | slug      | description | aliases |
      | Test  | test-slug | Test desc   | test    |
    And the user navigates back
    Then the heading with exact name "Unsaved Changes" should be visible

  @question-themes-page
  Scenario: 🎨 Question Themes page should stay on page when cancelling navigation away from dirty form
    Given the user is on questions page
    When the user clicks on the navigation link with name "Question Themes"
    And the user clicks on the button with name "Create a new theme"
    And the user fills the question theme form with the following attributes:
      | label | slug      | description | aliases |
      | Test  | test-slug | Test desc   | test    |
    And the user navigates back
    Then the heading with exact name "Unsaved Changes" should be visible
    When the user clicks on the button with name "Cancel"
    Then the heading with exact name "Create a new theme" should be visible

  @question-themes-page
  Scenario: 🎨 Question Themes page should navigate to questions after confirming discard of dirty form
    Given the user is on questions page
    When the user clicks on the navigation link with name "Question Themes"
    And the user clicks on the button with name "Create a new theme"
    And the user fills the question theme form with the following attributes:
      | label | slug      | description | aliases |
      | Test  | test-slug | Test desc   | test    |
    And the user navigates back
    Then the heading with exact name "Unsaved Changes" should be visible
    When the user clicks on the button with name "Confirm"
    Then the user should be on questions page
