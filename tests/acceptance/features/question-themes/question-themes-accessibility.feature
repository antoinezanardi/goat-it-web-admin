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
    And a question theme exists with the following attributes:
      | label   | slug   | description                     | aliases |
      | <Label> | <Slug> | Theme for accessibility testing | a11y    |
    Then the page should not contain accessibility issues in <View> mode

    Examples:
      | Label                    | Slug                     | View    |
      | A11y Theme Desktop Light | a11y-theme-desktop-light | desktop |
      | A11y Theme Mobile Light  | a11y-theme-mobile-light  | mobile  |

  Scenario Outline: 🎨 Question Themes Page with data should not contain accessibility issues in dark <View> mode
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label   | slug   | description                     | aliases |
      | <Label> | <Slug> | Theme for accessibility testing | a11y    |
    When the user switches to dark mode
    Then the page should not contain accessibility issues in <View> mode

    Examples:
      | Label                   | Slug                    | View    |
      | A11y Theme Desktop Dark | a11y-theme-desktop-dark | desktop |
      | A11y Theme Mobile Dark  | a11y-theme-mobile-dark  | mobile  |