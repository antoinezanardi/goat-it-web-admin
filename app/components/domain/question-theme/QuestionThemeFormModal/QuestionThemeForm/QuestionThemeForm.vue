<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { QUESTION_THEME_CREATION_DTO } from "@goat-it/schemas/question-theme";
import type { QuestionThemeCreationDto } from "@goat-it/schemas/question-theme";

import type { Form } from "#ui/types";
import type { QuestionThemeFormEmits } from "~/components/domain/question-theme/QuestionThemeFormModal/QuestionThemeForm/question-theme-form.types";

const emit = defineEmits<QuestionThemeFormEmits>();

const { locale: currentLocale } = useI18n();

const form = useTemplateRef<Form<QuestionThemeCreationDto>>("form");

const isFormValid = ref<boolean>(false);

const formState = reactive<QuestionThemeCreationDto>({
  slug: "",
  label: { en: undefined, fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
  description: { en: undefined, fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
  aliases: { en: undefined, fr: undefined, es: undefined, de: undefined, it: undefined, pt: undefined },
  color: undefined,
});
const chip = computed(() => ({ backgroundColor: formState.color }));

async function validateForm(): Promise<void> {
  if (!form.value) {
    return;
  }
  const result = await form.value.validate({ silent: true });
  isFormValid.value = result !== false;
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
        :placeholder="$t('questionThemes.fields.aliases')"
      />
    </UFormField>

    <UFormField
      :label="$t('questionThemes.fields.color')"
      name="color"
    >
      <UPopover>
        <UButton
          color="neutral"
          label="Choose color"
          variant="outline"
        >
          <template #leading>
            <span
              class="rounded-full size-3"
              :style="chip"
            />
          </template>
        </UButton>

        <template #content>
          <UColorPicker
            v-model="formState.color"
            format="hex"
          />
        </template>
      </UPopover>
    </UFormField>
  </UForm>
</template>