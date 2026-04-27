@question-theme @accessibility
Feature: 🎨 Question Themes Page Accessibility

  Scenario: 🎨 Question Themes Page should not contain accessibility issues in light desktop mode
    Given the user is on question-themes page
    Then the page should not contain accessibility issues in desktop mode

  Scenario: 🎨 Question Themes Page should not contain accessibility issues in light mobile mode
    Given the user is on question-themes page
    Then the page should not contain accessibility issues in mobile mode

  Scenario: 🎨 Question Themes Page should not contain accessibility issues in dark desktop mode
    Given the user is on question-themes page
    When the user switches to dark mode
    Then the page should not contain accessibility issues in desktop mode

  Scenario: 🎨 Question Themes Page should not contain accessibility issues in dark mobile mode
    Given the user is on question-themes page
    When the user switches to dark mode
    Then the page should not contain accessibility issues in mobile mode

  Scenario: 🎨 Question Themes Page with data should not contain accessibility issues in light desktop mode
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    And the user fills the input with name "Label*" with text "A11y Theme Desktop Light"
    And the user fills the input with name "Slug*" with text "a11y-theme-desktop-light"
    And the user fills the input with name "Description*" with text "Theme for accessibility testing"
    And the user fills the input with name "Aliases*" with text "a11y"
    And the user presses the "Enter" key
    And the user clicks on the button with name "Create"
    And the text "A11y Theme Desktop Light" should be visible
    Then the page should not contain accessibility issues in desktop mode

  Scenario: 🎨 Question Themes Page with data should not contain accessibility issues in light mobile mode
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    And the user fills the input with name "Label*" with text "A11y Theme Mobile Light"
    And the user fills the input with name "Slug*" with text "a11y-theme-mobile-light"
    And the user fills the input with name "Description*" with text "Theme for accessibility testing"
    And the user fills the input with name "Aliases*" with text "a11y"
    And the user presses the "Enter" key
    And the user clicks on the button with name "Create"
    And the text "A11y Theme Mobile Light" should be visible
    Then the page should not contain accessibility issues in mobile mode

  Scenario: 🎨 Question Themes Page with data should not contain accessibility issues in dark desktop mode
    Given the user is on question-themes page
    When the user switches to dark mode
    And the user clicks on the button with name "Create a new theme"
    And the user fills the input with name "Label*" with text "A11y Theme Desktop Dark"
    And the user fills the input with name "Slug*" with text "a11y-theme-desktop-dark"
    And the user fills the input with name "Description*" with text "Theme for accessibility testing"
    And the user fills the input with name "Aliases*" with text "a11y"
    And the user presses the "Enter" key
    And the user clicks on the button with name "Create"
    And the text "A11y Theme Desktop Dark" should be visible
    Then the page should not contain accessibility issues in desktop mode

  Scenario: 🎨 Question Themes Page with data should not contain accessibility issues in dark mobile mode
    Given the user is on question-themes page
    When the user switches to dark mode
    And the user clicks on the button with name "Create a new theme"
    And the user fills the input with name "Label*" with text "A11y Theme Mobile Dark"
    And the user fills the input with name "Slug*" with text "a11y-theme-mobile-dark"
    And the user fills the input with name "Description*" with text "Theme for accessibility testing"
    And the user fills the input with name "Aliases*" with text "a11y"
    And the user presses the "Enter" key
    And the user clicks on the button with name "Create"
    And the text "A11y Theme Mobile Dark" should be visible
    Then the page should not contain accessibility issues in mobile mode