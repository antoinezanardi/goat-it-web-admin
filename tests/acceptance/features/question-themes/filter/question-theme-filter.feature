@question-themes @question-theme-filter
Feature: 🎨 Question Theme Filter

  Background:
    Given the user is on question-themes page

  Scenario: 🎨 Filter section is collapsed by default
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    Then the question themes status filter should not be visible

  Scenario: 🎨 User can expand and collapse the filter section
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    When the user expands the question themes filters
    Then the question themes status filter should be visible
    When the user collapses the question themes filters
    Then the question themes status filter should not be visible

  Scenario: 🎨 User can filter question themes by status active
    And multiple question themes exist with the following attributes:
      | label    | slug     | description  | aliases | status   |
      | Music    | music    | All music    | tunes   | active   |
      | Cinema   | cinema   | All cinema   | movies  | archived |
    When the user expands the question themes filters
    And the user filters question themes by status "Active"
    Then the question theme table should contain a row with the following attributes:
      | label |
      | Music |
    And the question theme table should not contain a row with the following attributes:
      | label  |
      | Cinema |

  Scenario: 🎨 User can filter question themes by status archived
    And multiple question themes exist with the following attributes:
      | label    | slug     | description  | aliases | status   |
      | Music    | music    | All music    | tunes   | active   |
      | Cinema   | cinema   | All cinema   | movies  | archived |
    When the user expands the question themes filters
    And the user filters question themes by status "Archived"
    Then the question theme table should contain a row with the following attributes:
      | label  |
      | Cinema |
    And the question theme table should not contain a row with the following attributes:
      | label |
      | Music |

  Scenario: 🎨 Badge shows active filter count when section is collapsed
    And multiple question themes exist with the following attributes:
      | label    | slug     | description  | aliases | status   |
      | Music    | music    | All music    | tunes   | active   |
      | Cinema   | cinema   | All cinema   | movies  | archived |
    When the user expands the question themes filters
    And the user filters question themes by status "Active"
    And the user collapses the question themes filters
    Then the question themes filters badge should display "1"

  Scenario: 🎨 User can clear all filters
    And multiple question themes exist with the following attributes:
      | label    | slug     | description  | aliases | status   |
      | Music    | music    | All music    | tunes   | active   |
      | Cinema   | cinema   | All cinema   | movies  | archived |
    When the user expands the question themes filters
    And the user filters question themes by status "Active"
    Then the question theme table should not contain a row with the following attributes:
      | label  |
      | Cinema |
    When the user clears the question themes filters
    Then the question theme table should contain a row with the following attributes:
      | label |
      | Music |
    And the question theme table should contain a row with the following attributes:
      | label  |
      | Cinema |

  Scenario: 🎨 Filter persists across section collapse and expand
    And multiple question themes exist with the following attributes:
      | label    | slug     | description  | aliases | status   |
      | Music    | music    | All music    | tunes   | active   |
      | Cinema   | cinema   | All cinema   | movies  | archived |
    When the user expands the question themes filters
    And the user filters question themes by status "Active"
    And the user collapses the question themes filters
    And the user expands the question themes filters
    Then the question theme table should not contain a row with the following attributes:
      | label  |
      | Cinema |

  Scenario: 🎨 User can filter question themes by fully translated
    And a fully translated question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And a question theme exists with the following attributes:
      | label  | slug   | description | aliases |
      | Cinema | cinema | All cinema  | movies  |
    When the user expands the question themes filters
    And the user filters question themes by fully translated "Yes"
    Then the element with testid "question-themes-table-fully-translated-filter" should contain text "Yes"
    And the question theme table should contain a row with the following attributes:
      | label |
      | Music |
    And the question theme table should not contain a row with the following attributes:
      | label  |
      | Cinema |

  Scenario: 🎨 User can filter question themes that are not fully translated
    And a fully translated question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And a question theme exists with the following attributes:
      | label  | slug   | description | aliases |
      | Cinema | cinema | All cinema  | movies  |
    When the user expands the question themes filters
    And the user filters question themes by fully translated "No"
    Then the element with testid "question-themes-table-fully-translated-filter" should contain text "No"
    And the question theme table should contain a row with the following attributes:
      | label  |
      | Cinema |
    And the question theme table should not contain a row with the following attributes:
      | label |
      | Music |

  Scenario: 🎨 User can clear the question themes fully translated filter
    And a fully translated question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And multiple question themes exist with the following attributes:
      | label           | slug            | description         | aliases | status   |
      | Cinema          | cinema          | All cinema          | movies  | active   |
      | Archived Cinema | archived-cinema | All archived cinema | archive | archived |
    When the user expands the question themes filters
    And the user filters question themes by status "Active"
    And the user filters question themes by fully translated "Yes"
    Then the question theme table should not contain a row with the following attributes:
      | label  |
      | Cinema |
    When the user filters question themes by fully translated "Any"
    Then the element with testid "question-themes-table-fully-translated-filter" should contain text "Any"
    And the question theme table should contain a row with the following attributes:
      | label  |
      | Cinema |
    And the question theme table should contain a row with the following attributes:
      | label |
      | Music |
    And the question theme table should not contain a row with the following attributes:
      | label           |
      | Archived Cinema |
