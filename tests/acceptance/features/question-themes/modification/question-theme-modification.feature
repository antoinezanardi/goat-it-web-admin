@question-themes @question-theme-modification
Feature: 🎨 Question Theme Modification

  Scenario: 🎨 Question Theme modification modal opens with pre-filled fields
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    Then the input with name "Label*" should have value "Test Theme"
    And the input with name "Slug*" should have value "test-theme"
    And the input with name "Description*" should have value "A test theme"
    And the button with name "Edit" should be enabled

  Scenario: 🎨 Question Theme label is modified and updated in the list
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    And the user fills the input with name "Label*" with text "Updated Theme"
    And the user clicks on the button with name "Edit"
    Then the question theme table should contain a row with the following attributes:
      | label         | slug       |
      | Updated Theme | test-theme |
    And the toast with exact text "Question theme modified successfully" should be visible

  Scenario: 🎨 Question Theme modification form shows errors when required fields are cleared
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    And the user clears the input with name "Label*"
    And the user clears the input with name "Description*"
    Then the question theme form should display the following errors:
      | field       | error                                             |
      | Label       | Too small: expected string to have >=1 characters |
      | Description | Too small: expected string to have >=1 characters |
    And the button with name "Edit" should be disabled

  Scenario: 🎨 Question Theme modification form shows error for duplicate slug
    Given the user is on question-themes page
    And multiple question themes exist with the following attributes:
      | label   | slug    | description  | aliases |
      | Theme A | theme-a | First theme  | alpha   |
      | Theme B | theme-b | Second theme | beta    |
    When the user clicks on the button with exact name "Edit question theme with slug theme-b"
    And the user clears the input with name "Slug*"
    And the user fills the input with name "Slug*" with text "theme-a"
    Then the question theme form should display the following errors:
      | field | error                                      |
      | Slug  | This slug is already used by another theme |
    And the button with name "Edit" should be disabled

  Scenario: 🎨 Question Theme modification modal closes without saving when clicking close button in the modal header
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    Then the heading with exact name "Edit theme" should be visible
    When the user clicks on the close button in the modal header
    Then the heading with exact name "Edit theme" should be hidden

  Scenario: 🎨 Question Theme modification modal closes without saving when clicking close button in the modal footer
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    Then the heading with exact name "Edit theme" should be visible
    When the user clicks on the close button in the modal footer
    Then the heading with exact name "Edit theme" should be hidden

  Scenario: 🎨 Question theme modification modal autofocuses the label field
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    Then the input with name "Label*" should be focused

  Scenario: 🎨 Question theme modification form submits with Meta+Enter shortcut
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    And the user fills the input with name "Label*" with text "Updated Theme"
    And the user presses the "Meta+Enter" key
    Then the question theme table should contain a row with the following attributes:
      | label         | slug       |
      | Updated Theme | test-theme |
    And the toast with exact text "Question theme modified successfully" should be visible

  @question-theme-form-modal
  Scenario: 🎨 Question theme modification modal should discard changes via keyboard shortcut without submitting
    Given the user is on question-themes page
    And a question theme exists with the following attributes:
      | label      | slug       | description  | aliases |
      | Test Theme | test-theme | A test theme | test    |
    When the user clicks on the button with exact name "Edit question theme with slug test-theme"
    Then the heading with exact name "Edit theme" should be visible
    When the user fills the input with name "Label*" with text "Updated Theme"
    And the user clicks on the close button in the modal footer
    Then the heading with exact name "Unsaved Changes" should be visible
    When the user presses the "Meta+Enter" key
    Then the heading with exact name "Edit theme" should be hidden
    And the exact text "Question theme modified successfully" should be hidden
