@question-themes @accessibility
Feature: 🎨 Question Themes Page Accessibility

  Scenario Outline: 🎨 Question Themes Page should not contain accessibility issues in light <View> mode
    Given the user is on question-themes page
    Then the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |

  Scenario Outline: 🎨 Question Themes Page should not contain accessibility issues in dark <View> mode
    Given the user is on question-themes page
    When the user switches to dark mode
    Then the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |

  Scenario Outline: 🎨 Question Themes Page with data should not contain accessibility issues in light <View> mode
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    And the user fills the input with name "Label*" with text "<Label>"
    And the user fills the input with name "Slug*" with text "<Slug>"
    And the user fills the input with name "Description*" with text "Theme for accessibility testing"
    And the user fills the input with name "Aliases*" with text "a11y"
    And the user presses the "Enter" key
    And the user clicks on the button with name "Create"
    Then the text "<Label>" should be visible
    And the page should not contain accessibility issues in <View> mode

    Examples:
      | Label                    | Slug                     | View    |
      | A11y Theme Desktop Light | a11y-theme-desktop-light | desktop |
      | A11y Theme Mobile Light  | a11y-theme-mobile-light  | mobile  |

  Scenario Outline: 🎨 Question Themes Page with data should not contain accessibility issues in dark <View> mode
    Given the user is on question-themes page
    When the user switches to dark mode
    And the user clicks on the button with name "Create a new theme"
    And the user fills the input with name "Label*" with text "<Label>"
    And the user fills the input with name "Slug*" with text "<Slug>"
    And the user fills the input with name "Description*" with text "Theme for accessibility testing"
    And the user fills the input with name "Aliases*" with text "a11y"
    And the user presses the "Enter" key
    And the user clicks on the button with name "Create"
    Then the text "<Label>" should be visible
    And the page should not contain accessibility issues in <View> mode

    Examples:
      | Label                   | Slug                    | View    |
      | A11y Theme Desktop Dark | a11y-theme-desktop-dark | desktop |
      | A11y Theme Mobile Dark  | a11y-theme-mobile-dark  | mobile  |
