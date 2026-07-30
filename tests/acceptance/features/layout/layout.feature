@layout @layout-page
Feature: 📱 Layout

  Scenario: 📱 Full app name is displayed on desktop viewport
    Given the user is on home page
    Then the app name in navbar should be "Goat It Admin"

  Scenario: 📱 Short app name is displayed on mobile viewport
    Given the user is on home page
    When the user resizes the viewport to mobile
    Then the app name in navbar should be "Admin"
