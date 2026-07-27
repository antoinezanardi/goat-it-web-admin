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
    Given the user is on home page
    When the user clicks on the element with testid "stats-card-by-status-bar-toggle"
    Then the element with testid "stats-card-by-status-bar-chart" should be visible
    When the user clicks on the element with testid "stats-card-by-status-doughnut-toggle"
    Then the element with testid "stats-card-by-status-doughnut-chart" should be visible
