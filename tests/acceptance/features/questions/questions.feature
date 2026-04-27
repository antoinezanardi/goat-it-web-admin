@questions-page

Feature: ❓ Questions Page

  Scenario: ❓ Questions Page is displayed with correct heading
    Given the user is on questions page
    Then the heading with exact name "Questions" should be visible

  Scenario: ❓ Questions Page should not contain accessibility issues in desktop mode
    Given the user is on questions page
    Then the page should not contain accessibility issues in desktop mode

  Scenario: ❓ Questions Page should not contain accessibility issues in mobile mode
    Given the user is on questions page
    Then the page should not contain accessibility issues in mobile mode