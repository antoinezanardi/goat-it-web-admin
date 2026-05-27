@question-themes @accessibility @question-theme-creation
Feature: 🎨 Question Theme Creation Form Accessibility

  Scenario Outline: 🎨 Question Theme Creation Form should not contain accessibility issues in light <View> mode
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    Then the heading with exact name "Create a new theme" should be visible
    And the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |

  Scenario Outline: 🎨 Question Theme Creation Form should not contain accessibility issues in dark <View> mode
    Given the user is on question-themes page
    When the user switches to dark mode
    And the user clicks on the button with name "Create a new theme"
    Then the heading with exact name "Create a new theme" should be visible
    And the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |
