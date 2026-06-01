@question-themes @question-theme-status-filter
Feature: 🎨 Question Theme Status Filter

  Scenario: 🎨 Filter section is collapsed by default
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    Then the element with testid "table-filters-section-toggle" should be visible
    And the element with testid "question-themes-table-status-filter" should not be visible

  Scenario: 🎨 User can expand and collapse the filter section
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    When the user clicks on the element with testid "table-filters-section-toggle"
    Then the element with testid "question-themes-table-status-filter" should be visible
    When the user clicks on the element with testid "table-filters-section-toggle"
    Then the element with testid "question-themes-table-status-filter" should not be visible

  Scenario: 🎨 User can filter question themes by status active
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label    | slug     | description  | aliases | status   |
      | Music    | music    | All music    | tunes   | active   |
      | Cinema   | cinema   | All cinema   | movies  | archived |
    When the user clicks on the element with testid "table-filters-section-toggle"
    And the user selects "Active" from the element with testid "question-themes-table-status-filter"
    Then the question theme table should contain a row with the following attributes:
      | label |
      | Music |
    And the question theme table should not contain a row with the following attributes:
      | label  |
      | Cinema |

  Scenario: 🎨 User can filter question themes by status archived
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label    | slug     | description  | aliases | status   |
      | Music    | music    | All music    | tunes   | active   |
      | Cinema   | cinema   | All cinema   | movies  | archived |
    When the user clicks on the element with testid "table-filters-section-toggle"
    And the user selects "Archived" from the element with testid "question-themes-table-status-filter"
    Then the question theme table should contain a row with the following attributes:
      | label  |
      | Cinema |
    And the question theme table should not contain a row with the following attributes:
      | label |
      | Music |

  Scenario: 🎨 Badge shows active filter count when section is collapsed
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label    | slug     | description  | aliases | status   |
      | Music    | music    | All music    | tunes   | active   |
      | Cinema   | cinema   | All cinema   | movies  | archived |
    When the user clicks on the element with testid "table-filters-section-toggle"
    And the user selects "Active" from the element with testid "question-themes-table-status-filter"
    And the user clicks on the element with testid "table-filters-section-toggle"
    Then the element with testid "table-filters-section-badge" should contain text "1"

  Scenario: 🎨 User can clear all filters
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label    | slug     | description  | aliases | status   |
      | Music    | music    | All music    | tunes   | active   |
      | Cinema   | cinema   | All cinema   | movies  | archived |
    When the user clicks on the element with testid "table-filters-section-toggle"
    And the user selects "Active" from the element with testid "question-themes-table-status-filter"
    Then the question theme table should not contain a row with the following attributes:
      | label  |
      | Cinema |
    When the user clicks on the element with testid "table-filters-section-clear"
    Then the question theme table should contain a row with the following attributes:
      | label |
      | Music |
    And the question theme table should contain a row with the following attributes:
      | label  |
      | Cinema |

  Scenario: 🎨 Filter persists across section collapse and expand
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label    | slug     | description  | aliases | status   |
      | Music    | music    | All music    | tunes   | active   |
      | Cinema   | cinema   | All cinema   | movies  | archived |
    When the user clicks on the element with testid "table-filters-section-toggle"
    And the user selects "Active" from the element with testid "question-themes-table-status-filter"
    And the user clicks on the element with testid "table-filters-section-toggle"
    And the user clicks on the element with testid "table-filters-section-toggle"
    Then the question theme table should not contain a row with the following attributes:
      | label  |
      | Cinema |
