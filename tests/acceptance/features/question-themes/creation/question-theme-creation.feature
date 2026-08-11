@question-themes @question-theme-creation @question-theme-form-modal
Feature: 🎨 Question Theme Creation

  Scenario: 🎨 Question Theme is created and displayed in the list
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    And the user fills the question theme form with the following attributes:
      | label                 | slug                  | description                    | aliases | color  |
      | Acceptance Test Theme | acceptance-test-theme | A theme for acceptance testing | test    | FF5733 |
    And the user clicks on the button with name "Create"
    Then the question theme table should contain a row with the following attributes:
      | label                 | slug                  | description                    | aliases | status |
      | Acceptance Test Theme | acceptance-test-theme | A theme for acceptance testing | test    | Active |
    And the toast with exact text "Question theme created successfully" should be visible

  Scenario: 🎨 Question Theme form shows errors for empty required text fields
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    And the user fills the question theme form with the following attributes:
      | label | slug      | description | aliases |
      | test  | test-slug | test desc   | test    |
    And the user clears the input with name "Label*"
    And the user clears the input with name "Description*"
    Then the question theme form should display the following errors:
      | field       | error                                             |
      | Label       | Too small: expected string to have >=1 characters |
      | Description | Too small: expected string to have >=1 characters |
    And the button with name "Create" should be disabled

  Scenario: 🎨 Question Theme form shows errors for invalid slug
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label    | slug         | description  | aliases |
      | Existing | existing-one | Existing one | exist   |
    When the user clicks on the button with name "Create a new theme"
    And the user fills the question theme form with the following attributes:
      | label | slug | description | aliases |
      | test  | ab   | test desc   | test    |
    Then the question theme form should display the following errors:
      | field | error                                             |
      | Slug  | Too small: expected string to have >=3 characters |
    When the user fills the input with name "Slug*" with text "existing-one"
    Then the question theme form should display the following errors:
      | field | error                                      |
      | Slug  | This slug is already used by another theme |
    And the button with name "Create" should be disabled

  Scenario: 🎨 Question Theme form Create button is disabled when aliases are missing
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    And the user fills the question theme form with the following attributes:
      | label | slug      | description |
      | test  | test-slug | test desc   |
    Then the button with name "Create" should be disabled

  Scenario: 🎨 Question Theme creation modal closes without creating when clicking close button in the modal header
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    Then the heading with exact name "Create a new theme" should be visible
    When the user clicks on the close button in the modal header
    Then the heading with exact name "Create a new theme" should be hidden

  Scenario: 🎨 Question Theme creation modal closes without creating when clicking close button in the modal footer
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    Then the heading with exact name "Create a new theme" should be visible
    When the user clicks on the close button in the modal footer
    Then the heading with exact name "Create a new theme" should be hidden

  Scenario: 🎨 Question theme creation modal autofocuses the label field
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    Then the input with name "Label*" should be focused

  Scenario: 🎨 Question theme form submits with Meta+Enter shortcut
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    And the user fills the question theme form with the following attributes:
      | label                 | slug                  | description                    | aliases | color  |
      | Acceptance Test Theme | acceptance-test-theme | A theme for acceptance testing | test    | FF5733 |
    And the user presses the "Meta+Enter" key
    Then the question theme table should contain a row with the following attributes:
      | label                 | slug                  | description                    | aliases | status |
      | Acceptance Test Theme | acceptance-test-theme | A theme for acceptance testing | test    | Active |
    And the toast with exact text "Question theme created successfully" should be visible

  @question-theme-form-modal
  Scenario: 🎨 Question Theme creation modal should show confirmation dialog when closing dirty create form via X button
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    And the user fills the question theme form with the following attributes:
      | label | slug      | description | aliases |
      | Test  | test-slug | Test desc   | test    |
    And the user clicks on the close button in the modal header
    Then the heading with exact name "Unsaved Changes" should be visible

  @question-theme-form-modal
  Scenario: 🎨 Question Theme creation modal should show confirmation dialog when closing dirty create form via Escape key
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    And the user fills the question theme form with the following attributes:
      | label | slug      | description | aliases |
      | Test  | test-slug | Test desc   | test    |
    And the user presses the "Escape" key
    Then the heading with exact name "Unsaved Changes" should be visible

  @question-theme-form-modal
  Scenario: 🎨 Question Theme creation modal should show confirmation dialog when clicking overlay backdrop with dirty form
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    And the user fills the question theme form with the following attributes:
      | label | slug      | description | aliases |
      | Test  | test-slug | Test desc   | test    |
    And the user clicks on the overlay outside of the modal
    Then the heading with exact name "Unsaved Changes" should be visible

  @question-theme-form-modal
  Scenario: 🎨 Question Theme creation modal should close clean create form immediately via X button
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    Then the heading with exact name "Create a new theme" should be visible
    When the user clicks on the close button in the modal header
    Then the heading with exact name "Create a new theme" should be hidden

  @question-theme-form-modal
  Scenario: 🎨 Question Theme creation modal should close clean create form via overlay click
    Given the user is on question-themes page
    When the user clicks on the button with name "Create a new theme"
    Then the heading with exact name "Create a new theme" should be visible
    When the user clicks on the overlay outside of the modal
    Then the heading with exact name "Create a new theme" should be hidden
