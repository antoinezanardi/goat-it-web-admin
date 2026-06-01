@question-themes @question-theme-filter
Feature: 🎨 Question Theme Filter

  Scenario: 🎨 Question themes are filtered and only matching rows are shown
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label  | slug   | description | aliases |
      | Music  | music  | All music   | tunes   |
      | Cinema | cinema | All cinema  | movies  |
    When the user fills the input with name "Search..." with text "Music"
    Then the question theme table should contain a row with the following attributes:
      | label |
      | Music |
    And the question theme table should not contain a row with the following attributes:
      | label  |
      | Cinema |

  Scenario: 🎨 Question themes filter supports fuzzy search
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label  | slug   | description | aliases |
      | Music  | music  | All music   | tunes   |
      | Cinema | cinema | All cinema  | movies  |
    When the user fills the input with name "Search..." with text "Musc"
    Then the question theme table should contain a row with the following attributes:
      | label |
      | Music |
    And the question theme table should not contain a row with the following attributes:
      | label  |
      | Cinema |

  Scenario: 🎨 Question themes filter shows no results when nothing matches
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    When the user fills the input with name "Search..." with text "nonexistent"
    Then the question theme table should not contain a row with the following attributes:
      | label |
      | Music |
    And the text "No results found" should be visible

  Scenario: 🎨 Question themes filter is cleared and all rows are restored
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label  | slug   | description | aliases |
      | Music  | music  | All music   | tunes   |
      | Cinema | cinema | All cinema  | movies  |
    When the user fills the input with name "Search..." with text "Music"
    Then the question theme table should not contain a row with the following attributes:
      | label  |
      | Cinema |
    When the user clicks on the button with name "Clear search"
    Then the question theme table should contain a row with the following attributes:
      | label |
      | Music |
    And the question theme table should contain a row with the following attributes:
      | label  |
      | Cinema |
