<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { QUESTION_THEME_CREATION_DTO } from "@goat-it/schemas/question-theme";
import type { QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";

import type { QuestionThemeCreationDtoShell } from "#shared/types/question-theme.types";
import type { Form } from "#ui/types";
import type { QuestionThemeFormEmits } from "~/components/domain/question-theme/QuestionThemeFormModal/QuestionThemeForm/question-theme-form.types";
import { createQuestionThemeCreationDtoShell } from "~/composables/domain/question-theme/helpers/shell/question-theme.shell.helpers";

const emit = defineEmits<QuestionThemeFormEmits>();

const { locale: currentLocale } = useI18n();

const form = useTemplateRef<Form<QuestionThemeCreationDto>>("form");

const isFormValid = ref<boolean>(false);

const formState = reactive<QuestionThemeCreationDtoShell>(createQuestionThemeCreationDtoShell());

async function validateForm(): Promise<void> {
  if (!form.value) {
    return;
  }
  const result = await form.value.validate({ silent: true });
  isFormValid.value = typeof result === "object";
}

async function onSubmit(event: FormSubmitEvent<QuestionThemeCreationDto>): Promise<void> {
  emit("submitCreation", event.data);
}

async function triggerFormSubmit(): Promise<void> {
  if (!form.value) {
    return;
  }
  await form.value.submit();
}

defineExpose({
  isFormValid,
  triggerFormSubmit,
});
</script>

<template>
  <UForm
    ref="form"
    class="space-y-2"
    :schema="QUESTION_THEME_CREATION_DTO"
    :state="formState"
    @blur="validateForm"
    @change="validateForm"
    @submit="onSubmit"
  >
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-3">
      <UFormField
        :label="$t('questionThemes.fields.label')"
        :name="`label.${currentLocale}`"
        required
      >
        <UInput
          v-model="formState.label[currentLocale]"
          :placeholder="$t('questionThemes.fields.label')"
        />
      </UFormField>

      <UFormField
        :label="$t('questionThemes.fields.slug')"
        name="slug"
        required
      >
        <UInput
          v-model="formState.slug"
          :placeholder="$t('questionThemes.fields.slug')"
        />
      </UFormField>

      <UFormField
        :label="$t('questionThemes.fields.color')"
        name="color"
      >
        <InputColorPicker
          v-model:color="formState.color"
        />
      </UFormField>
    </div>

    <UFormField
      class="w-full"
      :label="$t('questionThemes.fields.description')"
      :name="`description.${currentLocale}`"
      required
    >
      <UTextarea
        v-model="formState.description[currentLocale]"
        class="w-full"
        :placeholder="$t('questionThemes.fields.description')"
        :rows="3"
      />
    </UFormField>

    <UFormField
      :label="$t('questionThemes.fields.aliases')"
      :name="`aliases.${currentLocale}`"
    >
      <UInputTags
        v-model="formState.aliases[currentLocale]"
        add-on-blur
        add-on-tab
        :placeholder="$t('questionThemes.fields.aliases')"
      />
    </UFormField>
  </UForm>
</template>