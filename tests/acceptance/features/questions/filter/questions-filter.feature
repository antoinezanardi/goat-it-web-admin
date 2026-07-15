@questions @questions-filter
Feature: ❓ Questions Filter

  Scenario: ❓ Filter section is collapsed by default
    Given the user is on questions page
    Then the questions status filter should not be visible
    And the questions category filter should not be visible
    And the questions cognitive difficulty filter should not be visible

  Scenario: ❓ User can expand and collapse the filter section
    Given the user is on questions page
    When the user expands the questions filters
    Then the questions status filter should be visible
    And the questions category filter should be visible
    And the questions cognitive difficulty filter should be visible
    When the user collapses the questions filters
    Then the questions status filter should not be visible
    And the questions category filter should not be visible
    And the questions cognitive difficulty filter should not be visible

  Scenario: ❓ User can filter questions by status active
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement    | answer | category              | difficulty | themes | sourceUrls        | status |
      | First topic  | One    | Knowledge & fun facts | easy       | Music  | https://test1.com | active |
      | Second topic | Two    | Knowledge & fun facts | easy       | Music  | https://test2.com | active |
    And multiple questions exist with the following attributes:
      | statement     | answer | category              | difficulty | themes | sourceUrls        | status   |
      | Archived item | Three  | Knowledge & fun facts | easy       | Music  | https://test3.com | archived |
    When the user expands the questions filters
    And the user filters questions by status "Active"
    Then the questions table should contain a row with the following attributes:
      | statement   |
      | First topic |
    And the questions table should contain a row with the following attributes:
      | statement    |
      | Second topic |
    And the questions table should not contain a row with the following attributes:
      | statement     |
      | Archived item |

  Scenario: ❓ User can filter questions by category
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement    | answer | category              | difficulty | themes | sourceUrls        |
      | First topic  | One    | Knowledge & fun facts | easy       | Music  | https://test1.com |
      | Second topic | Two    | Lexicon               | easy       | Music  | https://test2.com |
    When the user expands the questions filters
    And the user filters questions by category "Lexicon"
    Then the questions table should contain a row with the following attributes:
      | statement    |
      | Second topic |
    And the questions table should not contain a row with the following attributes:
      | statement   |
      | First topic |

  Scenario: ❓ User can filter questions by cognitive difficulty
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement    | answer | category              | difficulty | themes | sourceUrls        |
      | First topic  | One    | Knowledge & fun facts | easy       | Music  | https://test1.com |
      | Second topic | Two    | Knowledge & fun facts | hard       | Music  | https://test2.com |
    When the user expands the questions filters
    And the user filters questions by cognitive difficulty "Hard"
    Then the questions table should contain a row with the following attributes:
      | statement    |
      | Second topic |
    And the questions table should not contain a row with the following attributes:
      | statement   |
      | First topic |

  Scenario: ❓ User can combine filters
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement    | answer | category              | difficulty | themes | sourceUrls        |
      | First topic  | One    | Knowledge & fun facts | easy       | Music  | https://test1.com |
      | Second topic | Two    | Knowledge & fun facts | hard       | Music  | https://test2.com |
      | Third topic  | Three  | Lexicon               | easy       | Music  | https://test3.com |
    When the user expands the questions filters
    And the user filters questions by category "Knowledge & fun facts"
    And the user filters questions by cognitive difficulty "Easy"
    Then the questions table should contain a row with the following attributes:
      | statement   |
      | First topic |
    And the questions table should not contain a row with the following attributes:
      | statement    |
      | Second topic |
    And the questions table should not contain a row with the following attributes:
      | statement   |
      | Third topic |

  Scenario: ❓ Badge shows active filter count when section is collapsed
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement   | answer | category              | difficulty | themes | sourceUrls        |
      | First topic | One    | Knowledge & fun facts | easy       | Music  | https://test1.com |
      | Second item | Two    | Lexicon               | hard       | Music  | https://test2.com |
    When the user expands the questions filters
    And the user filters questions by category "Knowledge & fun facts"
    And the user filters questions by cognitive difficulty "Easy"
    And the user collapses the questions filters
    Then the questions filters badge should display "2"

  Scenario: ❓ User can clear all filters
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement    | answer | category              | difficulty | themes | sourceUrls        |
      | First topic  | One    | Knowledge & fun facts | easy       | Music  | https://test1.com |
      | Second topic | Two    | Lexicon               | hard       | Music  | https://test2.com |
    When the user expands the questions filters
    And the user filters questions by category "Knowledge & fun facts"
    Then the questions table should contain a row with the following attributes:
      | statement   |
      | First topic |
    And the questions table should not contain a row with the following attributes:
      | statement    |
      | Second topic |
    When the user clears the questions filters
    Then the questions table should contain a row with the following attributes:
      | statement    |
      | Second topic |

  Scenario: ❓ Empty state indicates active filters
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement   | answer | category              | difficulty | themes | sourceUrls        |
      | First topic | One    | Knowledge & fun facts | easy       | Music  | https://test1.com |
    When the user expands the questions filters
    And the user filters questions by category "Lexicon"
    Then the questions empty state should indicate active filters

  Scenario: ❓ Theme filter is hidden when section is collapsed
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And the user is on questions page
    Then the questions theme filter should not be visible

  Scenario: ❓ Theme filter is visible when section is expanded
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And the user is on questions page
    When the user expands the questions filters
    Then the questions theme filter should be visible

  Scenario: ❓ User can filter questions by a single theme
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label     | slug      | description | aliases |
      | Music     | music     | All music   | tunes   |
      | Geography | geography | All places  | places  |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement    | answer | category              | difficulty | themes    | sourceUrls        |
      | First topic  | One    | Knowledge & fun facts | easy       | Music     | https://test1.com |
      | Second topic | Two    | Knowledge & fun facts | easy       | Geography | https://test2.com |
    When the user expands the questions filters
    And the user filters questions by theme "Music"
    Then the questions table should contain a row with the following attributes:
      | statement   |
      | First topic |
    And the questions table should not contain a row with the following attributes:
      | statement    |
      | Second topic |

  Scenario: ❓ User can filter questions by multiple themes
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label     | slug      | description | aliases |
      | Music     | music     | All music   | tunes   |
      | Geography | geography | All places  | places  |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement    | answer | category              | difficulty | themes    | sourceUrls        |
      | First topic  | One    | Knowledge & fun facts | easy       | Music     | https://test1.com |
      | Second topic | Two    | Knowledge & fun facts | easy       | Geography | https://test2.com |
    When the user expands the questions filters
    And the user filters questions by theme "Music"
    And the user filters questions by theme "Geography"
    Then the questions table should contain a row with the following attributes:
      | statement   |
      | First topic |
    And the questions table should contain a row with the following attributes:
      | statement    |
      | Second topic |

  Scenario: ❓ User can remove a selected theme filter
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label     | slug      | description | aliases |
      | Music     | music     | All music   | tunes   |
      | Geography | geography | All places  | places  |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement    | answer | category              | difficulty | themes    | sourceUrls        |
      | First topic  | One    | Knowledge & fun facts | easy       | Music     | https://test1.com |
      | Second topic | Two    | Knowledge & fun facts | easy       | Geography | https://test2.com |
    When the user expands the questions filters
    And the user filters questions by theme "Music"
    And the user removes the "Music" theme filter
    Then the questions table should contain a row with the following attributes:
      | statement    |
      | Second topic |
    And the questions table should contain a row with the following attributes:
      | statement   |
      | First topic |

  Scenario: ❓ Badge shows active theme filter count when section is collapsed
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement   | answer | category              | difficulty | themes | sourceUrls        |
      | First topic | One    | Knowledge & fun facts | easy       | Music  | https://test1.com |
    When the user expands the questions filters
    And the user filters questions by theme "Music"
    And the user collapses the questions filters
    Then the questions filters badge should display "1"

  Scenario: ❓ Archived themes do not appear in the theme filter dropdown
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label   | slug    | description | aliases |
      | Music   | music   | All music   | tunes   |
    And a question theme exists with the following attributes:
      | label     | slug      | description | aliases | status   |
      | Geography | geography | All places  | places  | archived |
    And the user is on questions page
    When the user expands the questions filters
    Then the user should not be able to select the "Geography" theme filter

  Scenario: ❓ Clear all filters resets theme selection
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label     | slug      | description | aliases |
      | Music     | music     | All music   | tunes   |
      | Geography | geography | All places  | places  |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement    | answer | category              | difficulty | themes    | sourceUrls        |
      | First topic  | One    | Knowledge & fun facts | easy       | Music     | https://test1.com |
      | Second topic | Two    | Knowledge & fun facts | easy       | Geography | https://test2.com |
    When the user expands the questions filters
    And the user filters questions by theme "Music"
    Then the questions table should contain a row with the following attributes:
      | statement   |
      | First topic |
    And the questions table should not contain a row with the following attributes:
      | statement    |
      | Second topic |
    When the user clears the questions filters
    Then the questions table should contain a row with the following attributes:
      | statement    |
      | Second topic |
    And the questions table should contain a row with the following attributes:
      | statement   |
      | First topic |

  Scenario: ❓ User can search themes in the theme filter dropdown
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label     | slug      | description | aliases |
      | Music     | music     | All music   | tunes   |
      | Geography | geography | All places  | places  |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement   | answer | category              | difficulty | themes    | sourceUrls        |
      | First topic | One    | Knowledge & fun facts | easy       | Geography | https://test1.com |
    When the user expands the questions filters
    And the user searches for "Geo" in the theme filter
    Then the theme filter dropdown should contain an option with the text "Geography"
    And the theme filter dropdown should not contain an option with the text "Music"

  Scenario: ❓ User can combine theme filter with status filter
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label | slug  | description | aliases |
      | Music | music | All music   | tunes   |
    And the user is on questions page
    And multiple questions exist with the following attributes:
      | statement    | answer | category              | difficulty | themes | sourceUrls        | status   |
      | First topic  | One    | Knowledge & fun facts | easy       | Music  | https://test1.com | active   |
      | Second topic | Two    | Knowledge & fun facts | easy       | Music  | https://test2.com | archived |
    When the user expands the questions filters
    And the user filters questions by status "Active"
    And the user filters questions by theme "Music"
    Then the questions table should contain a row with the following attributes:
      | statement   |
      | First topic |
    And the questions table should not contain a row with the following attributes:
      | statement    |
      | Second topic |
