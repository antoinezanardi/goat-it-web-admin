@questions @accessibility
Feature: ❓ Questions Page Accessibility

  Scenario Outline: ❓ Questions Page should not contain accessibility issues in light <View> mode
    Given the user is on questions page
    Then the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |

  Scenario Outline: ❓ Questions Page should not contain accessibility issues in dark <View> mode
    Given the user is on questions page
    When the user switches to dark mode
    Then the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |
