@questions @accessibility @question-creation
Feature: ❓ Question Creation Form Accessibility

  Scenario Outline: ❓ Question Creation Form should not contain accessibility issues in light <View> mode
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    Then the heading with exact name "Create a new question" should be visible
    And the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |

  Scenario Outline: ❓ Question Creation Form should not contain accessibility issues in dark <View> mode
    Given the user is on questions page
    When the user switches to dark mode
    And the user clicks on the button with name "Create a new question"
    Then the heading with exact name "Create a new question" should be visible
    And the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |
