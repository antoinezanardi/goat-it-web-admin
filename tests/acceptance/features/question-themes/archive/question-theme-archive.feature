@question-theme-archive
Feature: 🎨 Question Theme Archive

  Scenario: 🎨 Question Theme is archived after confirmation
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    When the user clicks on the button with name "Archive"
    Then the heading with exact name "Archive this theme?" should be visible
    When the user clicks on the button with name "Confirm"
    Then the question theme table should contain a row with the following attributes:
      | label | slug  | status   |
      | Music | music | Archived |
    And the exact toast with text "Question theme archived successfully" should be visible

  Scenario: 🎨 Question Theme archive is cancelled and theme remains unchanged
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    When the user clicks on the button with name "Archive"
    Then the heading with exact name "Archive this theme?" should be visible
    When the user clicks on the button with name "Cancel"
    Then the heading with exact name "Archive this theme?" should be hidden
    And the question theme table should contain a row with the following attributes:
      | label | slug  | status |
      | Music | music | Active |