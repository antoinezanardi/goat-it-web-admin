import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { createFakeQuestionCreationDto } from "~~/tests/unit/utils/faketories/questions/dto/question.dto.faketory";
import { createFakeQuestionModificationDto } from "~~/tests/unit/utils/faketories/questions/dto/question-modification/question-modification.dto.faketory";
import { createFakeQuestion } from "~~/tests/unit/utils/faketories/questions/entity/question.entity.faketory";
import { createFakeQuestionContent } from "~~/tests/unit/utils/faketories/questions/entity/question-content/question-content.entity.faketory";
import { createFakeQuestionThemeAssignment } from "~~/tests/unit/utils/faketories/questions/entity/question-theme-assignment/question-theme-assignment.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import type { ComponentVm } from "~~/tests/unit/utils/types/vtu.types";

import type { UForm, UFormField, UInput, UTextarea, QuestionCategorySelector, QuestionCognitiveDifficultySelector, QuestionSourceUrlsInput, QuestionThemeSelector, QuestionTriviaInput, TranslationFieldContext } from "#components";
import { QuestionForm } from "#components";

import type { QuestionFormProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/question-form.types";

type QuestionFormVm = ComponentVm & {
  canSubmit: boolean;
  triggerFormSubmit: () => Promise<void>;
};

describe("QuestionForm Component", () => {
  let wrapper: VueWrapper;
  const fakeThemes = [
    createFakeQuestionTheme({ id: "theme-1" }),
    createFakeQuestionTheme({ id: "theme-2" }),
  ];

  const defaultProperties: QuestionFormProperties = {
    availableThemes: fakeThemes,
  };

  async function mountQuestionFormComponent(options: MountSuspendedOptions<typeof QuestionForm> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionForm, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionFormComponent();
  });

  it("should render the question form component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Form Fields", () => {
    it("should render the statement form field with the correct i18n key when mounted.", () => {
      const statementField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");

      expect(statementField.props("label")).toBe("questions.fields.statement");
    });

    it("should render the statement form field with the current locale in the name when mounted.", () => {
      const statementField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");

      expect(statementField.props("name")).toBe(`content.statement.${DEFAULT_MOCKED_LOCALE}`);
    });

    it("should render the answer form field with the correct i18n key when mounted.", () => {
      const answerField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-answer-field']");

      expect(answerField.props("label")).toBe("questions.fields.answer");
    });

    it("should render the answer form field with the current locale in the name when mounted.", () => {
      const answerField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-answer-field']");

      expect(answerField.props("name")).toBe(`content.answer.${DEFAULT_MOCKED_LOCALE}`);
    });

    it("should render the context form field with the correct i18n key when mounted.", () => {
      const contextField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-context-field']");

      expect(contextField.props("label")).toBe("questions.fields.context");
    });

    it("should render the difficulty form field with the correct i18n key when mounted.", () => {
      const difficultyField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-difficulty-field']");

      expect(difficultyField.props("label")).toBe("questions.fields.cognitiveDifficulty");
    });

    it("should render the category form field with the correct i18n key when mounted.", () => {
      const categoryField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-category-field']");

      expect(categoryField.props("label")).toBe("questions.fields.category");
    });

    it("should render the themes form field with the correct i18n key when mounted.", () => {
      const themeSelector = wrapper.findComponent<typeof QuestionThemeSelector>("[data-testid='question-theme-selector']");
      const innerFormField = themeSelector.findComponent<typeof UFormField>({ name: "UFormField" });

      expect(innerFormField.props("label")).toBe("questions.fields.themes");
    });

    it("should render the source urls form field with the correct i18n key when mounted.", () => {
      const sourceUrlsInput = wrapper.findComponent<typeof QuestionSourceUrlsInput>("[data-testid='question-source-urls-input']");
      const innerFormField = sourceUrlsInput.findComponent<typeof UFormField>({ name: "UFormField" });

      expect(innerFormField.props("label")).toBe("questions.fields.sourceUrls");
    });

    it("should render the trivia form field with the correct i18n key when mounted.", () => {
      const triviaInput = wrapper.findComponent<typeof QuestionTriviaInput>("[data-testid='question-trivia-input']");
      const innerFormField = triviaInput.findComponent<typeof UFormField>({ name: "UFormField" });

      expect(innerFormField.props("label")).toBe("questions.fields.trivia");
    });
  });

  describe("Form v-model bindings", () => {
    it("should update the statement in the form state when the statement input value changes.", async() => {
      const statementField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");
      const statementInput = statementField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(statementInput).$emit("update:modelValue", "What is the capital of France?");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const content = state.content as { statement: Record<string, unknown>; answer: Record<string, unknown>; context: Record<string, unknown> };

      expect(content.statement[DEFAULT_MOCKED_LOCALE]).toBe("What is the capital of France?");
    });

    it("should update the answer in the form state when the answer input value changes.", async() => {
      const answerField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-answer-field']");
      const answerInput = answerField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(answerInput).$emit("update:modelValue", "Paris");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const content = state.content as { statement: Record<string, unknown>; answer: Record<string, unknown>; context: Record<string, unknown> };

      expect(content.answer[DEFAULT_MOCKED_LOCALE]).toBe("Paris");
    });

    it("should update the context in the form state when the context textarea value changes.", async() => {
      const contextField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-context-field']");
      const contextTextarea = contextField.findComponent<typeof UTextarea>({ name: "UTextarea" });
      getWrapperVm(contextTextarea).$emit("update:modelValue", "Geography trivia");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const content = state.content as { statement: Record<string, unknown>; answer: Record<string, unknown>; context: Record<string, unknown> };

      expect(content.context[DEFAULT_MOCKED_LOCALE]).toBe("Geography trivia");
    });

    it("should update the difficulty in the form state when the difficulty selector emits.", async() => {
      const difficultySelector = wrapper.findComponent<typeof QuestionCognitiveDifficultySelector>("[data-testid='question-difficulty-selector']");
      getWrapperVm(difficultySelector).$emit("update:modelValue", "medium");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;

      expect(state.cognitiveDifficulty).toBe("medium");
    });

    it("should update the category in the form state when the category selector emits.", async() => {
      const categorySelector = wrapper.findComponent<typeof QuestionCategorySelector>({ name: "QuestionCategorySelector" });
      getWrapperVm(categorySelector).$emit("update:modelValue", "trivia");
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;

      expect(state.category).toBe("trivia");
    });

    it("should update the themes in the form state when the theme selector emits.", async() => {
      const themeSelector = wrapper.findComponent<typeof QuestionThemeSelector>("[data-testid='question-theme-selector']");
      const themes = [{ themeId: "theme-1", isPrimary: true, isHint: false }];
      getWrapperVm(themeSelector).$emit("update:modelValue", themes);
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;

      expect(state.themes).toStrictEqual(themes);
    });

    it("should update the source urls in the form state when the source urls input emits.", async() => {
      const sourceUrlsInput = wrapper.findComponent<typeof QuestionSourceUrlsInput>("[data-testid='question-source-urls-input']");
      getWrapperVm(sourceUrlsInput).$emit("update:modelValue", ["https://example.com"]);
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;

      expect(state.sourceUrls).toStrictEqual(["https://example.com"]);
    });

    it("should update the trivia in the form state when the trivia input emits.", async() => {
      const triviaInput = wrapper.findComponent<typeof QuestionTriviaInput>("[data-testid='question-trivia-input']");
      getWrapperVm(triviaInput).$emit("update:modelValue", ["Fun fact about geography"]);
      await nextTick();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const content = state.content as { trivia: Record<string, unknown> };

      expect(content.trivia[DEFAULT_MOCKED_LOCALE]).toStrictEqual(["Fun fact about geography"]);
    });
  });

  describe("Exposed canSubmit", () => {
    it("should expose canSubmit as false when no required fields are filled.", () => {
      expect(getWrapperVm<QuestionFormVm>(wrapper).canSubmit).toBeFalsy();
    });

    it("should expose canSubmit as false when only statement is filled.", async() => {
      const statementField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");
      const statementInput = statementField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(statementInput).$emit("update:modelValue", "Test");
      await nextTick();

      expect(getWrapperVm<QuestionFormVm>(wrapper).canSubmit).toBeFalsy();
    });

    it("should expose canSubmit as true when all required fields are filled.", async() => {
      const statementField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");
      const statementInput = statementField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(statementInput).$emit("update:modelValue", "What is the capital?");

      const answerField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-answer-field']");
      const answerInput = answerField.findComponent<typeof UInput>({ name: "UInput" });
      getWrapperVm(answerInput).$emit("update:modelValue", "Paris");

      const difficultySelector = wrapper.findComponent<typeof QuestionCognitiveDifficultySelector>("[data-testid='question-difficulty-selector']");
      getWrapperVm(difficultySelector).$emit("update:modelValue", "easy");

      const categorySelector = wrapper.findComponent<typeof QuestionCategorySelector>({ name: "QuestionCategorySelector" });
      getWrapperVm(categorySelector).$emit("update:modelValue", "trivia");

      const themeSelector = wrapper.findComponent<typeof QuestionThemeSelector>("[data-testid='question-theme-selector']");
      getWrapperVm(themeSelector).$emit("update:modelValue", [{ themeId: "theme-1", isPrimary: true, isHint: false }]);

      const sourceUrlsInput = wrapper.findComponent<typeof QuestionSourceUrlsInput>("[data-testid='question-source-urls-input']");
      getWrapperVm(sourceUrlsInput).$emit("update:modelValue", ["https://example.com"]);
      await nextTick();

      expect(getWrapperVm<QuestionFormVm>(wrapper).canSubmit).toBeTruthy();
    });
  });

  describe("Exposed triggerFormSubmit", () => {
    it("should not emit submitCreation when form is not submitted.", () => {
      expect(wrapper.emitted("submitCreation")).toBeUndefined();
    });

    it("should not submit when triggerFormSubmit is called and form ref is null.", async() => {
      const vm = getWrapperVm<QuestionFormVm>(wrapper);
      vm.$.refs.form = null;
      await vm.triggerFormSubmit();

      expect(wrapper.emitted("submitCreation")).toBeUndefined();
    });

    it("should not nullify context when context has a value and triggerFormSubmit is called.", async() => {
      const contextField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-context-field']");
      const contextTextarea = contextField.findComponent<typeof UTextarea>({ name: "UTextarea" });
      getWrapperVm(contextTextarea).$emit("update:modelValue", "Some context");
      await nextTick();

      const vm = getWrapperVm<QuestionFormVm>(wrapper);
      vm.$.refs.form = null;
      await vm.triggerFormSubmit();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const content = state.content as { context: Record<string, unknown> };

      expect(content.context[DEFAULT_MOCKED_LOCALE]).toBe("Some context");
    });

    it("should not nullify trivia when trivia has values and triggerFormSubmit is called.", async() => {
      const triviaInput = wrapper.findComponent<typeof QuestionTriviaInput>("[data-testid='question-trivia-input']");
      getWrapperVm(triviaInput).$emit("update:modelValue", ["Fun fact"]);
      await nextTick();

      const vm = getWrapperVm<QuestionFormVm>(wrapper);
      vm.$.refs.form = null;
      await vm.triggerFormSubmit();

      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      const state = uForm.props("state") as Record<string, unknown>;
      const content = state.content as { trivia: Record<string, unknown> };

      expect(content.trivia[DEFAULT_MOCKED_LOCALE]).toStrictEqual(["Fun fact"]);
    });

    it("should not display trivia when trivia is not set in form state.", async() => {
      const vm = getWrapperVm<QuestionFormVm>(wrapper);
      (vm.$.setupState.formState as { content: { trivia: undefined } }).content.trivia = undefined;
      await nextTick();

      const triviaInput = wrapper.findComponent<typeof QuestionTriviaInput>("[data-testid='question-trivia-input']");

      expect(triviaInput.exists()).toBe(false);
    });
  });

  describe("Form Submission", () => {
    it("should emit submitCreation when form submits in create mode.", async() => {
      const fakeCreationDto = createFakeQuestionCreationDto();
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      getWrapperVm(uForm).$emit("submit", { data: fakeCreationDto });
      await nextTick();

      expect(wrapper.emitted("submitCreation")).toStrictEqual([[fakeCreationDto]]);
    });

    it("should emit submitModification when form submits in edit mode.", async() => {
      wrapper = await mountQuestionFormComponent({
        props: {
          ...defaultProperties,
          mode: "edit",
        },
      });
      const fakeModificationDto = createFakeQuestionModificationDto();
      const uForm = wrapper.findComponent<typeof UForm>({ name: "UForm" });
      getWrapperVm(uForm).$emit("submit", { data: fakeModificationDto });
      await nextTick();

      expect(wrapper.emitted("submitModification")).toStrictEqual([[fakeModificationDto]]);
    });
  });

  describe("Available Themes", () => {
    it("should pass available themes to the theme selector component when mounted.", () => {
      const themeSelector = wrapper.findComponent<typeof QuestionThemeSelector>("[data-testid='question-theme-selector']");

      expect(themeSelector.props("availableThemes")).toStrictEqual(fakeThemes);
    });
  });

  describe("Edit mode", () => {
    const fakeThemeAssignments = [
      createFakeQuestionThemeAssignment({ isPrimary: true, isHint: false }),
      createFakeQuestionThemeAssignment({ isPrimary: false, isHint: true }),
    ];
    const fakeContent = createFakeQuestionContent({
      context: { [DEFAULT_MOCKED_LOCALE]: "Some context" },
      trivia: { [DEFAULT_MOCKED_LOCALE]: ["Fun fact"] },
    });
    const fakeQuestion = createFakeQuestion({
      content: fakeContent,
      themes: fakeThemeAssignments,
    });

    async function mountInEditMode(): Promise<VueWrapper> {
      return mountQuestionFormComponent({
        props: {
          ...defaultProperties,
          mode: "edit",
          question: fakeQuestion,
        },
      });
    }

    beforeEach(async() => {
      wrapper = await mountInEditMode();
    });

    it("should hydrate statement from question prop when rendered in edit mode.", () => {
      const statementField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-statement-field']");
      const statementInput = statementField.findComponent<typeof UInput>({ name: "UInput" });

      expect(statementInput.props("modelValue")).toBe(fakeQuestion.content.statement[DEFAULT_MOCKED_LOCALE]);
    });

    it("should hydrate answer from question prop when rendered in edit mode.", () => {
      const answerField = wrapper.findComponent<typeof UFormField>("[data-testid='question-form-answer-field']");
      const answerInput = answerField.findComponent<typeof UInput>({ name: "UInput" });

      expect(answerInput.props("modelValue")).toBe(fakeQuestion.content.answer[DEFAULT_MOCKED_LOCALE]);
    });

    it("should hydrate difficulty from question prop when rendered in edit mode.", () => {
      const difficultySelector = wrapper.findComponent<typeof QuestionCognitiveDifficultySelector>("[data-testid='question-difficulty-selector']");

      expect(difficultySelector.props("modelValue")).toBe(fakeQuestion.cognitiveDifficulty);
    });

    it("should hydrate category from question prop when rendered in edit mode.", () => {
      const categorySelector = wrapper.findComponent<typeof QuestionCategorySelector>({ name: "QuestionCategorySelector" });

      expect(categorySelector.props("modelValue")).toBe(fakeQuestion.category);
    });

    it("should hydrate themes mapped from QuestionThemeAssignment to QuestionThemeAssignmentCreationDto when rendered in edit mode.", () => {
      const themeSelector = wrapper.findComponent<typeof QuestionThemeSelector>("[data-testid='question-theme-selector']");
      const expectedThemes = fakeThemeAssignments.map(t => ({ themeId: t.theme.id, isPrimary: t.isPrimary, isHint: t.isHint }));

      expect(themeSelector.props("modelValue")).toStrictEqual(expectedThemes);
    });

    it("should hydrate sourceUrls from question prop when rendered in edit mode.", () => {
      const sourceUrlsInput = wrapper.findComponent<typeof QuestionSourceUrlsInput>("[data-testid='question-source-urls-input']");

      expect(sourceUrlsInput.props("modelValue")).toStrictEqual(fakeQuestion.sourceUrls);
    });

    it("should pass disabled as true to QuestionThemeSelector when rendered in edit mode.", () => {
      const themeSelector = wrapper.findComponent<typeof QuestionThemeSelector>("[data-testid='question-theme-selector']");

      expect(themeSelector.props("disabled")).toBe(true);
    });

    it("should not pass disabled to QuestionThemeSelector when rendered in create mode.", async() => {
      wrapper = await mountQuestionFormComponent();
      const themeSelector = wrapper.findComponent<typeof QuestionThemeSelector>("[data-testid='question-theme-selector']");

      expect(themeSelector.props("disabled")).toBe(false);
    });

    it("should render TranslationFieldContext for statement when rendered in edit mode.", () => {
      const translationContext = wrapper.findComponent<typeof TranslationFieldContext>("[data-testid='translation-field-context-statement']");

      expect(translationContext.exists()).toBe(true);
    });

    it("should pass question statement to TranslationFieldContext when rendered in edit mode.", () => {
      const translationContext = wrapper.findComponent<typeof TranslationFieldContext>("[data-testid='translation-field-context-statement']");

      expect(translationContext.props("localizedText")).toStrictEqual(fakeQuestion.content.statement);
    });

    it("should render TranslationFieldContext for answer when rendered in edit mode.", () => {
      const translationContext = wrapper.findComponent<typeof TranslationFieldContext>("[data-testid='translation-field-context-answer']");

      expect(translationContext.exists()).toBe(true);
    });

    it("should render TranslationFieldContext for context when question has context in edit mode.", () => {
      const translationContext = wrapper.findComponent<typeof TranslationFieldContext>("[data-testid='translation-field-context-context']");

      expect(translationContext.exists()).toBe(true);
    });

    it("should pass question context to TranslationFieldContext when rendered in edit mode.", () => {
      const translationContext = wrapper.findComponent<typeof TranslationFieldContext>("[data-testid='translation-field-context-context']");

      expect(translationContext.props("localizedText")).toStrictEqual(fakeQuestion.content.context);
    });

    it("should render TranslationFieldContext for trivia when question has trivia in edit mode.", () => {
      const translationContext = wrapper.findComponent<typeof TranslationFieldContext>("[data-testid='translation-field-context-trivia']");

      expect(translationContext.exists()).toBe(true);
    });

    it("should pass question trivia to TranslationFieldContext localizedTexts when rendered in edit mode.", () => {
      const translationContext = wrapper.findComponent<typeof TranslationFieldContext>("[data-testid='translation-field-context-trivia']");

      expect(translationContext.props("localizedTexts")).toStrictEqual(fakeQuestion.content.trivia);
    });

    it("should not render TranslationFieldContext for context when question has no context in edit mode.", async() => {
      const questionWithoutContext = createFakeQuestion({
        content: createFakeQuestionContent({ context: undefined, trivia: undefined }),
        themes: fakeThemeAssignments,
      });
      wrapper = await mountQuestionFormComponent({
        props: { ...defaultProperties, mode: "edit", question: questionWithoutContext },
      });
      const translationContext = wrapper.find("[data-testid='translation-field-context-context']");

      expect(translationContext.exists()).toBe(false);
    });

    it("should not render TranslationFieldContext for trivia when question has no trivia in edit mode.", async() => {
      const questionWithoutTrivia = createFakeQuestion({
        content: createFakeQuestionContent({ context: undefined, trivia: undefined }),
        themes: fakeThemeAssignments,
      });
      wrapper = await mountQuestionFormComponent({
        props: { ...defaultProperties, mode: "edit", question: questionWithoutTrivia },
      });
      const translationContext = wrapper.find("[data-testid='translation-field-context-trivia']");

      expect(translationContext.exists()).toBe(false);
    });

    it("should not render TranslationFieldContext for statement when rendered in create mode.", async() => {
      wrapper = await mountQuestionFormComponent();
      const translationContext = wrapper.find("[data-testid='translation-field-context-statement']");

      expect(translationContext.exists()).toBe(false);
    });

    it("should not render TranslationFieldContext for answer when rendered in create mode.", async() => {
      wrapper = await mountQuestionFormComponent();
      const translationContext = wrapper.find("[data-testid='translation-field-context-answer']");

      expect(translationContext.exists()).toBe(false);
    });
  });
});