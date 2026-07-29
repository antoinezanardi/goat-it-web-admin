@home-page @accessibility
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

  Scenario Outline: 🏡 Home Page with data should not contain accessibility issues in light <View> mode
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label           | slug            | description                  | aliases |
      | Home A11y Theme | home-a11y-theme | Theme for home accessibility | a11y    |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement            | answer | difficulty | category              | themes          | sourceUrls          | status |
      | Home A11y Question 1 | Answer | easy       | Knowledge & fun facts | Home A11y Theme | https://example.com | active |
      | Home A11y Question 2 | Answer | medium     | Knowledge & fun facts | Home A11y Theme | https://example.com | active |
      | Home A11y Question 3 | Answer | hard       | Knowledge & fun facts | Home A11y Theme | https://example.com | active |
      | Home A11y Question 4 | Answer | easy       | Lexicon               | Home A11y Theme | https://example.com | active |
      | Home A11y Question 5 | Answer | medium     | Knowledge & fun facts | Home A11y Theme | https://example.com | active |
    And the user is on home page
    Then the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |

  Scenario Outline: 🏡 Home Page with data should not contain accessibility issues in dark <View> mode
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label           | slug            | description                  | aliases |
      | Home A11y Theme | home-a11y-theme | Theme for home accessibility | a11y    |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement            | answer | difficulty | category              | themes          | sourceUrls          | status |
      | Home A11y Question 1 | Answer | easy       | Knowledge & fun facts | Home A11y Theme | https://example.com | active |
      | Home A11y Question 2 | Answer | medium     | Knowledge & fun facts | Home A11y Theme | https://example.com | active |
      | Home A11y Question 3 | Answer | hard       | Knowledge & fun facts | Home A11y Theme | https://example.com | active |
      | Home A11y Question 4 | Answer | easy       | Lexicon               | Home A11y Theme | https://example.com | active |
      | Home A11y Question 5 | Answer | medium     | Knowledge & fun facts | Home A11y Theme | https://example.com | active |
    And the user is on home page
    When the user switches to dark mode
    Then the page should not contain accessibility issues in <View> mode

    Examples:
      | View    |
      | desktop |
      | mobile  |
