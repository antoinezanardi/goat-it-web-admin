@question-themes @accessibility @question-theme-archive
Feature: 🎨 Question Theme Archive Dialog Accessibility

  Scenario Outline: 🎨 Question Theme Archive Dialog should not contain accessibility issues in light <View> mode
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    When the user clicks on the button with name "Archive"
    Then the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |

  Scenario Outline: 🎨 Question Theme Archive Dialog should not contain accessibility issues in dark <View> mode
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    When the user switches to dark mode
    And the user clicks on the button with name "Archive"
    Then the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |