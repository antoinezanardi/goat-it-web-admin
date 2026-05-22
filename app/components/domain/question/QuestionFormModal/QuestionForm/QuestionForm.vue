<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { QUESTION_CREATION_DTO, QUESTION_MODIFICATION_DTO } from "@goat-it/schemas/question";
import type { QuestionCreationDto, QuestionModificationDto, QuestionThemeAssignmentCreationDto } from "@goat-it/schemas/question";

import type { QuestionCreationDtoShell } from "#shared/types/question.types";
import type { Form } from "#ui/types";
import { QUESTION_FORM_CONTEXT_TEXTAREA_ROWS } from "~/components/domain/question/QuestionFormModal/QuestionForm/question-form.constants";
import type { QuestionFormEmits, QuestionFormProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/question-form.types";
import { createQuestionCreationDtoShell } from "~/composables/domain/question/helpers/shell/question.shell.helpers";
import { createLocalizedTextShell, createLocalizedTextsShell } from "~/composables/core/localization/helpers/shell/localization.shell.helpers";
import { QUESTION_DEFAULT_AUTHOR } from "~/composables/domain/question/constants/question-author.constants";
import { stripEmptyValues } from "#shared/utils/helpers/object/object.helpers";
import { prepareZodSchemaForFormValidation } from "~/utils/helpers/zod/zod.helpers";

const props = withDefaults(defineProps<QuestionFormProperties>(), {
  mode: "create",
  question: undefined,
});

const emit = defineEmits<QuestionFormEmits>();

const { locale: currentLocale } = useI18n();

const form = useTemplateRef<Form<QuestionCreationDto | QuestionModificationDto>>("form");

const isSubmitting = ref<boolean>(false);

function createInitialFormState(): QuestionCreationDtoShell {
  if (props.mode !== "edit" || !props.question) {
    return createQuestionCreationDtoShell();
  }
  const { question } = props;

  return {
    content: {
      statement: { [currentLocale.value]: question.content.statement[currentLocale.value] },
      answer: { [currentLocale.value]: question.content.answer[currentLocale.value] },
      context: question.content.context ? { [currentLocale.value]: question.content.context[currentLocale.value] } : createLocalizedTextShell(),
      trivia: question.content.trivia ? { [currentLocale.value]: question.content.trivia[currentLocale.value] } : createLocalizedTextsShell(),
    },
    cognitiveDifficulty: question.cognitiveDifficulty,
    category: question.category,
    themes: question.themes.map(themeAssignment => ({ themeId: themeAssignment.theme.id, isPrimary: themeAssignment.isPrimary, isHint: themeAssignment.isHint })),
    sourceUrls: [...question.sourceUrls],
    author: { ...QUESTION_DEFAULT_AUTHOR },
  };
}
const formState = reactive<QuestionCreationDtoShell>(createInitialFormState());

const formStateToSubmit = computed<QuestionCreationDtoShell>(() => (isSubmitting.value ? stripEmptyValues(formState) : formState));

const formSchema = computed(() => prepareZodSchemaForFormValidation(props.mode === "edit" ? QUESTION_MODIFICATION_DTO : QUESTION_CREATION_DTO));

const hasStatement = computed<boolean>(() => !!formState.content?.statement[currentLocale.value]);
const hasAnswer = computed<boolean>(() => !!formState.content?.answer[currentLocale.value]);
const hasDifficulty = computed<boolean>(() => !!formState.cognitiveDifficulty);
const hasCategory = computed<boolean>(() => !!formState.category);
const hasThemes = computed<boolean>(() => !!formState.themes?.length);
const hasSourceUrls = computed<boolean>(() => !!formState.sourceUrls?.length);
const hasNoFormErrors = computed<boolean>(() => !form.value?.getErrors()?.length);

const canSubmit = computed<boolean>(() => hasStatement.value && hasAnswer.value && hasDifficulty.value && hasCategory.value &&
  hasThemes.value && hasSourceUrls.value && hasNoFormErrors.value);

function onUpdateThemes(themes: QuestionThemeAssignmentCreationDto[]): void {
  formState.themes = themes;
}

function onSubmit(event: FormSubmitEvent<QuestionCreationDto | QuestionModificationDto>): void {
  if (props.mode === "edit") {
    emit("submitModification", QUESTION_MODIFICATION_DTO.parse(event.data));

    return;
  }
  emit("submitCreation", QUESTION_CREATION_DTO.parse(event.data));
}

async function triggerFormSubmit(): Promise<void> {
  isSubmitting.value = true;
  try {
    await form.value?.submit();
  } finally {
    isSubmitting.value = false;
  }
}

defineExpose({
  canSubmit,
  triggerFormSubmit,
});
</script>

<template>
  <UForm
    ref="form"
    class="space-y-4"
    data-testid="question-form"
    :schema="formSchema"
    :state="formStateToSubmit"
    @submit="onSubmit"
  >
    <div>
      <p class="border-b border-default flex font-bold gap-1 items-center mb-2 pb-1 text-muted text-xs tracking-wide uppercase">
        <UIcon name="i-lucide-text"/>
        {{ $t("questions.sections.content") }}
      </p>

      <div class="space-y-2">
        <UFormField
          data-testid="question-form-statement-field"
          :label="$t('questions.fields.statement')"
          :name="`content.statement.${currentLocale}`"
          required
        >
          <UInput
            v-model="formState.content.statement[currentLocale]"
            class="w-full"
            :placeholder="$t('questions.placeholders.statement')"
          />
        </UFormField>

        <TranslationFieldContext
          v-if="mode === 'edit' && question"
          data-testid="translation-field-context-statement"
          :label="$t('questions.fields.statement')"
          :localized-text="question.content.statement"
        />

        <UFormField
          data-testid="question-form-answer-field"
          :label="$t('questions.fields.answer')"
          :name="`content.answer.${currentLocale}`"
          required
        >
          <UInput
            v-model="formState.content.answer[currentLocale]"
            class="w-full"
            :placeholder="$t('questions.placeholders.answer')"
          />
        </UFormField>

        <TranslationFieldContext
          v-if="mode === 'edit' && question"
          key="translation-field-context-2"
          data-testid="translation-field-context-answer"
          :label="$t('questions.fields.answer')"
          :localized-text="question.content.answer"
        />

        <UFormField
          v-if="formState.content.context"
          data-testid="question-form-context-field"
          :label="$t('questions.fields.context')"
          :name="`content.context.${currentLocale}`"
        >
          <UTextarea
            v-model="formState.content.context[currentLocale]"
            class="w-full"
            :placeholder="$t('questions.placeholders.context')"
            :rows="QUESTION_FORM_CONTEXT_TEXTAREA_ROWS"
          />
        </UFormField>

        <TranslationFieldContext
          v-if="mode === 'edit' && question?.content.context"
          key="translation-field-context-3"
          data-testid="translation-field-context-context"
          :label="$t('questions.fields.context')"
          :localized-text="question.content.context"
        />

        <QuestionTriviaInput
          v-if="formState.content.trivia"
          v-model="formState.content.trivia[currentLocale]"
        />

        <TranslationFieldContext
          v-if="mode === 'edit' && question?.content.trivia"
          key="translation-field-context-4"
          data-testid="translation-field-context-trivia"
          :label="$t('questions.fields.trivia')"
          :localized-texts="question.content.trivia"
        />
      </div>
    </div>

    <div>
      <p class="border-b border-default flex font-bold gap-1 items-center mb-2 pb-1 text-muted text-xs tracking-wide uppercase">
        <UIcon name="i-lucide-tags"/>
        {{ $t("questions.sections.classification") }}
      </p>

      <div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
        <UFormField
          data-testid="question-form-difficulty-field"
          :label="$t('questions.fields.cognitiveDifficulty')"
          name="cognitiveDifficulty"
          required
        >
          <QuestionCognitiveDifficultySelector
            v-model="formState.cognitiveDifficulty"
          />
        </UFormField>

        <UFormField
          data-testid="question-form-category-field"
          :label="$t('questions.fields.category')"
          name="category"
          required
        >
          <QuestionCategorySelector
            v-model="formState.category"
            class="w-full"
          />
        </UFormField>
      </div>

      <QuestionThemeSelector
        :available-themes="availableThemes"
        class="mt-4"
        :disabled="mode === 'edit'"
        :model-value="formState.themes"
        @update:model-value="onUpdateThemes"
      />
    </div>

    <div>
      <p class="border-b border-default flex font-bold gap-1 items-center mb-2 pb-1 text-muted text-xs tracking-wide uppercase">
        <UIcon name="i-lucide-link"/>
        {{ $t("questions.sections.sources") }}
      </p>

      <QuestionSourceUrlsInput v-model="formState.sourceUrls"/>
    </div>
  </UForm>
</template>