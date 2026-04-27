@question-theme @accessibility @question-theme-creation
Feature: 🎨 Question Theme Creation Form Accessibility

  Scenario: 🎨 Question Theme Creation Form should not contain accessibility issues in light desktop mode
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    Then the page should not contain accessibility issues in desktop mode

  Scenario: 🎨 Question Theme Creation Form should not contain accessibility issues in light mobile mode
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    Then the page should not contain accessibility issues in mobile mode

  Scenario: 🎨 Question Theme Creation Form should not contain accessibility issues in dark desktop mode
    Given the user is on question-themes page
    When the user switches to dark mode
    And the user clicks on the button with name "Create a new theme"
    Then the page should not contain accessibility issues in desktop mode

  Scenario: 🎨 Question Theme Creation Form should not contain accessibility issues in dark mobile mode
    Given the user is on question-themes page
    When the user switches to dark mode
    And the user clicks on the button with name "Create a new theme"
    Then the page should not contain accessibility issues in mobile mode