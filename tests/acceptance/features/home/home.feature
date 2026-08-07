@home-page
Feature: 🏡 Home Page

  Scenario: 🏡 Home Page is displayed with correct heading
    Given the user is on home page
    Then the heading with exact name "Home" should be visible

  Scenario: 🏡 Home Page displays question stats dashboard with summary tabs
    Given the user is on home page
    Then the tab with exact name "Questions" should be visible
    And the tab with exact name "Question Themes" should be visible
    And the text "By Status" should be visible
    And the text "By Category" should be visible
    And the text "By Difficulty" should be visible
    And the text "By Author Role" should be visible
    And the text "By Rejection Type" should be visible

  Scenario: 🏡 Home Page switches to question theme stats when clicking themes tab
    Given the user is on home page
    When the user clicks on the tab with exact name "Question Themes"
    Then the text "By Status" should be visible
    And the text "Questions per Theme" should be visible
    And the text "By Category" should be hidden
    And the text "By Difficulty" should be hidden

  Scenario: 🏡 Home Page switches back to question stats when clicking questions tab
    Given the user is on home page
    When the user clicks on the tab with exact name "Question Themes"
    And the user clicks on the tab with exact name "Questions"
    Then the text "By Category" should be visible
    And the text "By Difficulty" should be visible
    And the text "Questions per Theme" should be hidden

  Scenario: 🏡 Home Page toggles chart view on a stat card
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description          | aliases |
      | Home Theme | home-theme | Theme for home stats | home    |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement       | answer | difficulty | category              | themes     | sourceUrls          | status |
      | Home Question 1 | Answer | easy       | Knowledge & fun facts | Home Theme | https://example.com | active |
      | Home Question 2 | Answer | medium     | Knowledge & fun facts | Home Theme | https://example.com | active |
      | Home Question 3 | Answer | hard       | Knowledge & fun facts | Home Theme | https://example.com | active |
    And the user is on home page
    When the user clicks on the element with testid "stats-card-by-status-bar-toggle"
    Then the element with testid "stats-card-by-status-bar-chart" should be visible
    When the user clicks on the element with testid "stats-card-by-status-doughnut-toggle"
    Then the element with testid "stats-card-by-status-doughnut-chart" should be visible

  Scenario: 🏡 Home Page displays correct stats counts when questions and themes exist
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description          | aliases |
      | Home Theme | home-theme | Theme for home stats | home    |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement       | answer | difficulty | category              | themes     | sourceUrls          | status |
      | Home Question 1 | Answer | easy       | Knowledge & fun facts | Home Theme | https://example.com | active |
      | Home Question 2 | Answer | medium     | Knowledge & fun facts | Home Theme | https://example.com | active |
      | Home Question 3 | Answer | hard       | Knowledge & fun facts | Home Theme | https://example.com | active |
      | Home Question 4 | Answer | easy       | Lexicon               | Home Theme | https://example.com | active |
      | Home Question 5 | Answer | medium     | Knowledge & fun facts | Home Theme | https://example.com | active |
    And the user is on home page
    Then the element with testid "dashboard-summary-tab-questions" should contain exact text "5"
    And the element with testid "dashboard-summary-tab-question-themes" should contain exact text "1"

  Scenario: 🏡 Home Page displays "No data available" when no stats exist
    Given the user is on home page
    Then the question by category stat should display no data
    And the question by difficulty stat should display no data
    And the question by status stat should display no data
    And the question by author role stat should display no data
    And the question by rejection type stat should display no data
    When the user clicks on the tab with exact name "Question Themes"
    Then the question theme by question count stat should display no data
    And the question theme by status stat should display no data
