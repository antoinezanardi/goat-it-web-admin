<script setup lang="ts">
import type { FormSubmitEvent, FormError } from "@nuxt/ui";
import { QUESTION_THEME_CREATION_DTO, QUESTION_THEME_MODIFICATION_DTO } from "@goat-it/schemas/question-theme";
import type { QuestionThemeCreationDto, QuestionThemeModificationDto } from "@goat-it/schemas/question-theme";

import type { QuestionThemeCreationDtoShell } from "#shared/types/question-theme.types";
import type { Form } from "#ui/types";
import type { QuestionThemeFormProperties, QuestionThemeFormEmits } from "~/components/domain/question-theme/QuestionThemeFormModal/QuestionThemeForm/question-theme-form.types";
import { prepareZodSchemaForFormValidation } from "~/utils/helpers/zod/zod.helpers";
import { createQuestionThemeCreationDtoShell } from "~/composables/domain/question-theme/helpers/shell/question-theme.shell.helpers";
import { stripEmptyValues } from "#shared/utils/helpers/object/object.helpers";

const props = withDefaults(defineProps<QuestionThemeFormProperties>(), {
  mode: "create",
  questionTheme: undefined,
});

const emit = defineEmits<QuestionThemeFormEmits>();

const { locale: currentLocale, t } = useI18n();

const form = useTemplateRef<Form<QuestionThemeCreationDto | QuestionThemeModificationDto>>("form");

function createInitialFormState(): QuestionThemeCreationDtoShell {
  if (props.mode !== "edit" || !props.questionTheme) {
    return createQuestionThemeCreationDtoShell();
  }
  const theme = props.questionTheme;

  return {
    slug: theme.slug,
    color: theme.color,
    label: { [currentLocale.value]: theme.label[currentLocale.value] },
    description: { [currentLocale.value]: theme.description[currentLocale.value] },
    aliases: { [currentLocale.value]: theme.aliases[currentLocale.value] ?? [] },
  };
}
const isSubmitting = ref<boolean>(false);

const formState = reactive<QuestionThemeCreationDtoShell>(createInitialFormState());

const formStateToSubmit = computed<QuestionThemeCreationDtoShell>(() => (isSubmitting.value ? stripEmptyValues(formState) : formState));

const dtoSchema = computed(() => (props.mode === "edit" ? QUESTION_THEME_MODIFICATION_DTO : QUESTION_THEME_CREATION_DTO));
const formSchema = computed(() => prepareZodSchemaForFormValidation(dtoSchema.value));

const canSubmit = computed<boolean>(() => {
  const hasSlug = !!formState.slug;
  const hasLabel = !!formState.label[currentLocale.value];
  const hasDescription = !!formState.description[currentLocale.value];
  const hasAliases = !!formState.aliases[currentLocale.value]?.length;
  const hasNoFormErrors = !form.value?.getErrors()?.length;

  return hasSlug && hasLabel && hasDescription && hasAliases && hasNoFormErrors;
});

function validateSlugUniqueness(state: Partial<QuestionThemeCreationDto>): FormError[] {
  const isOwnSlugInEditMode = props.mode === "edit" && state.slug === props.questionTheme?.slug;
  const isSlugTaken = !!state.slug && !isOwnSlugInEditMode && props.existingSlugs.includes(state.slug);

  if (isSlugTaken) {
    return [{ name: "slug", message: t("validation.slugAlreadyTaken") }];
  }
  return [];
}

function onSubmit(event: FormSubmitEvent<QuestionThemeCreationDto | QuestionThemeModificationDto>): void {
  if (props.mode === "edit") {
    emit("submitModification", QUESTION_THEME_MODIFICATION_DTO.parse(event.data));

    return;
  }
  emit("submitCreation", QUESTION_THEME_CREATION_DTO.parse(event.data));
}

async function triggerFormSubmit(): Promise<void> {
  isSubmitting.value = true;
  try {
    await form.value?.submit();
  } finally {
    isSubmitting.value = false;
  }
}

function removeAliasTooltipText(item: string): string {
  return t("questionThemes.form.removeAlias", { value: item });
}

defineExpose({
  canSubmit,
  triggerFormSubmit,
});
</script>

<template>
  <UForm
    ref="form"
    class="space-y-2"
    data-testid="question-theme-form"
    :schema="formSchema"
    :state="formStateToSubmit"
    :validate="validateSlugUniqueness"
    @submit="onSubmit"
  >
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-3">
      <UFormField
        data-testid="question-theme-form-label-field"
        :label="$t('questionThemes.fields.label')"
        :name="`label.${currentLocale}`"
        required
      >
        <UInput
          v-model="formState.label[currentLocale]"
          :placeholder="$t('questionThemes.placeholders.label')"
        />
      </UFormField>

      <UFormField
        data-testid="question-theme-form-slug-field"
        :label="$t('questionThemes.fields.slug')"
        name="slug"
        required
      >
        <UInput
          v-model="formState.slug"
          :placeholder="$t('questionThemes.placeholders.slug')"
        />
      </UFormField>

      <UFormField
        data-testid="question-theme-form-color-field"
        :label="$t('questionThemes.fields.color')"
        name="color"
      >
        <InputColorPicker
          v-model:color="formState.color"
        />
      </UFormField>
    </div>

    <TranslationFieldContext
      v-if="mode === 'edit' && questionTheme"
      data-testid="translation-field-context-label"
      :label="$t('questionThemes.fields.label')"
      :localized-text="questionTheme.label"
    />

    <UFormField
      class="w-full"
      data-testid="question-theme-form-description-field"
      :label="$t('questionThemes.fields.description')"
      :name="`description.${currentLocale}`"
      required
    >
      <UTextarea
        v-model="formState.description[currentLocale]"
        class="w-full"
        :placeholder="$t('questionThemes.placeholders.description')"
        :rows="3"
      />
    </UFormField>

    <TranslationFieldContext
      v-if="mode === 'edit' && questionTheme"
      key="translation-field-context-2"
      data-testid="translation-field-context-description"
      :label="$t('questionThemes.fields.description')"
      :localized-text="questionTheme.description"
    />

    <InputTagsField
      v-model="formState.aliases[currentLocale]"
      :add-hint-text="$t('questionThemes.form.addAliasHint')"
      class="sm:w-1/2 w-full"
      data-testid="question-theme-form-aliases-field"
      :label="$t('questionThemes.fields.aliases')"
      :name="`aliases.${currentLocale}`"
      :placeholder="$t('questionThemes.placeholders.aliases')"
      :remove-tooltip-text="removeAliasTooltipText"
      required
    />

    <TranslationFieldContext
      v-if="mode === 'edit' && questionTheme"
      key="translation-field-context-3"
      data-testid="translation-field-context-aliases"
      :label="$t('questionThemes.fields.aliases')"
      :localized-texts="questionTheme.aliases"
    />
  </UForm>
</template>