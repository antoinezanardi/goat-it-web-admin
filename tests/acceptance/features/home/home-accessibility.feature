@home @accessibility
Feature: 🏡 Home Page Accessibility

  Scenario Outline: 🏡 Home Page should not contain accessibility issues in light <View> mode
    Given the user is on home page
    Then the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |

  Scenario Outline: 🏡 Home Page should not contain accessibility issues in dark <View> mode
    Given the user is on home page
    When the user switches to dark mode
    Then the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |
