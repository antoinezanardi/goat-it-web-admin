@question @accessibility
Feature: ❓ Questions Page Accessibility

  Scenario: ❓ Questions Page should not contain accessibility issues in light desktop mode
    Given the user is on questions page
    Then the page should not contain accessibility issues in desktop mode

  Scenario: ❓ Questions Page should not contain accessibility issues in light mobile mode
    Given the user is on questions page
    Then the page should not contain accessibility issues in mobile mode

  Scenario: ❓ Questions Page should not contain accessibility issues in dark desktop mode
    Given the user is on questions page
    When the user switches to dark mode
    Then the page should not contain accessibility issues in desktop mode

  Scenario: ❓ Questions Page should not contain accessibility issues in dark mobile mode
    Given the user is on questions page
    When the user switches to dark mode
    Then the page should not contain accessibility issues in mobile mode