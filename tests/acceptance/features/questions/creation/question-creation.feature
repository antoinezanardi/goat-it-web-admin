@questions @question-creation @question-form-modal
Feature: ❓ Question Creation

  Scenario: ❓ Question is created and displayed successfully
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label     | slug      | description       | aliases |
      | Geography | geography | A geography theme | geo     |
    And the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement                      | answer | difficulty | category | themes    | sourceUrls                      |
      | What is the capital of France? | Paris  | easy       | Knowledge & fun facts | Geography | https://en.wikipedia.org/France |
    And the user clicks on the button with name "Create"
    Then the toast with exact text "Question created successfully" should be visible

  Scenario: ❓ Question creation form Create button is disabled when required fields are empty
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    Then the button with name "Create" should be disabled

  Scenario: ❓ Question creation form Create button is disabled when themes are missing
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label     | slug      | description       | aliases |
      | Geography | geography | A geography theme | geo     |
    And the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement | answer | difficulty | category | sourceUrls          |
      | Test      | Answer | easy       | Knowledge & fun facts | https://example.com |
    Then the button with name "Create" should be disabled

  Scenario: ❓ Question creation modal closes without creating when clicking close button in the modal footer
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    Then the heading with exact name "Create a new question" should be visible
    When the user clicks on the close button in the modal footer
    Then the heading with exact name "Create a new question" should be hidden

  Scenario: ❓ Question can be created with optional context field
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label   | slug    | description     | aliases |
      | History | history | A history theme | hist    |
    And the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement | answer | context            | difficulty | category | themes  | sourceUrls          |
      | Test      | Answer | Some extra context | medium     | Mysteries & riddles   | History | https://example.com |
    And the user clicks on the button with name "Create"
    Then the toast with exact text "Question created successfully" should be visible

  Scenario: ❓ Theme can be re-added after removal
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label     | slug      | description       | aliases |
      | Geography | geography | A geography theme | geo     |
    And the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | themes    |
      | Geography |
    Then the theme "Geography" should be visible in the question theme selector list
    When the user removes the theme "Geography" from the question form selected themes
    Then the theme "Geography" should be hidden in the question theme selector list
    When the user fills the question form with the following attributes:
      | themes    |
      | Geography |
    Then the theme "Geography" should be visible in the question theme selector list

  Scenario: ❓ Source URL validation blocks invalid URLs
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user types "not-a-url" in the question form source urls input and presses Enter
    Then the text "Must be a valid URL" should be visible
    And the question form source urls input should have no tags

  Scenario: ❓ Source URL validation blocks duplicate URLs
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | sourceUrls          |
      | https://example.com |
    And the user types "https://example.com" in the question form source urls input and presses Enter
    Then the text "This URL has already been added" should be visible

  Scenario: ❓ Source URL validation blocks adding URLs when maximum is reached
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | sourceUrls                                                                                                          |
      | https://example.com/1,https://example.com/2,https://example.com/3,https://example.com/4,https://example.com/5 |
    And the user types "https://example.com/6" in the question form source urls input and presses Enter
    Then the text "Maximum number of source URLs reached" should be visible

  Scenario: ❓ Source URL tag displays domain and opens URL in new tab when clicked
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | sourceUrls                      |
      | https://en.wikipedia.org/France |
    Then the source URL tag with domain "en.wikipedia.org" should be visible in the question form
    When the user clicks on the source URL tag with domain "en.wikipedia.org" in the question form
    Then a new tab should have been opened with URL "https://en.wikipedia.org/France"

  Scenario: ❓ Source URL tag can be removed by clicking the delete button
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | sourceUrls                                              |
      | https://en.wikipedia.org/France,https://example.com/abc |
    Then the source URL tag with domain "en.wikipedia.org" should be visible in the question form
    And the source URL tag with domain "example.com" should be visible in the question form
    When the user removes the source URL tag with domain "example.com" from the question form
    Then the source URL tag with domain "example.com" should be hidden in the question form
    And the source URL tag with domain "en.wikipedia.org" should be visible in the question form

  Scenario: ❓ Question can be created with optional trivia field
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label   | slug    | description     | aliases |
      | Science | science | A science theme | sci     |
    And the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement          | answer | trivia                            | difficulty | category | themes  | sourceUrls          |
      | What is H2O?      | Water  | H2O is the most common substance | hard       | Knowledge & fun facts | Science | https://example.com |
    And the user clicks on the button with name "Create"
    Then the toast with exact text "Question created successfully" should be visible

  Scenario: ❓ Question creation modal autofocuses the statement field
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    Then the input with name "Statement*" should be focused

  Scenario: ❓ Question form submits with Meta+Enter shortcut
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label     | slug      | description       | aliases |
      | Geography | geography | A geography theme | geo     |
    And the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement                      | answer | difficulty | category | themes    | sourceUrls                      |
      | What is the capital of France? | Paris  | easy       | Knowledge & fun facts | Geography | https://en.wikipedia.org/France |
    And the user presses the "Meta+Enter" key
    Then the toast with exact text "Question created successfully" should be visible

  @question-form-modal
  Scenario: ❓ Question creation modal should show confirmation dialog when closing dirty create form via X button
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement | answer | difficulty | category | sourceUrls          |
      | Test      | Answer | easy       | Knowledge & fun facts | https://example.com |
    And the user clicks on the close button in the modal header
    Then the heading with exact name "Unsaved Changes" should be visible

  @question-form-modal
  Scenario: ❓ Question creation modal should show confirmation dialog when closing dirty create form via footer close button
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement | answer | difficulty | category | sourceUrls          |
      | Test      | Answer | easy       | Knowledge & fun facts | https://example.com |
    And the user clicks on the close button in the modal footer
    Then the heading with exact name "Unsaved Changes" should be visible

  @question-form-modal
  Scenario: ❓ Question creation modal should NOT close dirty form when clicking overlay backdrop
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement | answer | difficulty | category | sourceUrls          |
      | Test      | Answer | easy       | Knowledge & fun facts | https://example.com |
    And the user clicks on the overlay outside of the modal
    Then the heading with exact name "Create a new question" should be visible

  @question-form-modal
  Scenario: ❓ Question creation modal should close clean create form immediately via X button
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    Then the heading with exact name "Create a new question" should be visible
    When the user clicks on the close button in the modal header
    Then the heading with exact name "Create a new question" should be hidden

  @question-form-modal
  Scenario: ❓ Question creation modal should close clean create form via overlay click
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    Then the heading with exact name "Create a new question" should be visible
    When the user clicks on the overlay outside of the modal
    Then the heading with exact name "Create a new question" should be hidden

  @question-form-modal
  Scenario: ❓ Question creation modal should discard changes on confirmation and close modal
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement | answer | difficulty | category | sourceUrls          |
      | Test      | Answer | easy       | Knowledge & fun facts | https://example.com |
    And the user clicks on the close button in the modal footer
    Then the heading with exact name "Unsaved Changes" should be visible
    When the user clicks on the button with name "Confirm"
    Then the heading with exact name "Create a new question" should be hidden

  @question-form-modal
  Scenario: ❓ Question creation modal should keep modal open on cancellation of confirmation dialog
    Given the user is on questions page
    When the user clicks on the button with name "Create a new question"
    And the user fills the question form with the following attributes:
      | statement | answer | difficulty | category | sourceUrls          |
      | Test      | Answer | easy       | Knowledge & fun facts | https://example.com |
    And the user clicks on the close button in the modal footer
    Then the heading with exact name "Unsaved Changes" should be visible
    When the user clicks on the button with name "Cancel"
    Then the heading with exact name "Create a new question" should be visible
