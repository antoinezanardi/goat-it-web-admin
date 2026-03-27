<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormSubmitEvent } from "@nuxt/ui";
import { QUESTION_THEME_CREATION_DTO } from "@goat-it/schemas/question-theme";
import type { QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";

import type { QuestionThemeCreationDtoShell } from "#shared/types/question-theme.types";
import type { Form } from "#ui/types";
import type { QuestionThemeFormEmits } from "~/components/domain/question-theme/QuestionThemeFormModal/QuestionThemeForm/question-theme-form.types";
import { createQuestionThemeCreationDtoShell } from "~/composables/domain/question-theme/helpers/shell/question-theme.shell.helpers";

const emit = defineEmits<QuestionThemeFormEmits>();

const isFormValid = ref<boolean>(false);

defineExpose({
  isFormValid,
  triggerFormSubmit,
});

const { locale: currentLocale } = useI18n();

const form = useTemplateRef<Form<QuestionThemeCreationDto>>("form");

const formState = reactive<QuestionThemeCreationDtoShell>(createQuestionThemeCreationDtoShell());

async function validateForm(): Promise<void> {
  if (!form.value) {
    return;
  }
  const result = await form.value.validate({ silent: true });
  isFormValid.value = typeof result === "object";
}

/* [V8 SOURCE MAPPING ISSUE] Acceptable, the onSubmit method is tested, but the coverage report is not able to recognize it. */
/* v8 ignore start */
function onSubmit(event: FormSubmitEvent<QuestionThemeCreationDto>): void {
  emit("submitCreation", event.data);
}
/* v8 ignore stop */

async function triggerFormSubmit(): Promise<void> {
  if (!form.value) {
    return;
  }
  await form.value.submit();
}
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