@home-page

Feature: 🏡 Home Page

  Scenario: 🏡 Home Page is displayed with correct heading
    Given the user is on home page
    Then the heading with exact name "Home" should be visible

  Scenario: 🏡 Home Page should not contain accessibility issues in desktop mode
    Given the user is on home page
    Then the page should not contain accessibility issues in desktop mode

  Scenario: 🏡 Home Page should not contain accessibility issues in mobile mode
    Given the user is on home page
    Then the page should not contain accessibility issues in mobile mode