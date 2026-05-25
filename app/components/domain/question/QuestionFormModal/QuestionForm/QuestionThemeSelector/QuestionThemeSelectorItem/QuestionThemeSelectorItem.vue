<script setup lang="ts">
import { getThemeLocalizedLabel } from "~/composables/domain/question-theme/helpers/question-theme.helpers";
import type { ButtonVariant } from "~/utils/types/button.types";
import type { AppColor } from "~/utils/types/color.types";
import type { QuestionThemeSelectorItemEmits, QuestionThemeSelectorItemProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/QuestionThemeSelectorItem/question-theme-selector-item.types";

const props = defineProps<QuestionThemeSelectorItemProperties>();
const emit = defineEmits<QuestionThemeSelectorItemEmits>();

const { t, locale: currentLocale } = useI18n();

const missingThemeTranslation = computed<string>(() => t("questions.missingThemeTranslation"));

const themeLabel = computed<string>(() => getThemeLocalizedLabel(props.theme, currentLocale.value, missingThemeTranslation.value));

const primaryButtonColor = computed<AppColor>(() => (props.assignment.isPrimary ? "warning" : "neutral"));

const primaryButtonVariant = computed<ButtonVariant>(() => (props.assignment.isPrimary ? "soft" : "outline"));

const primaryButtonTooltip = computed<string>(() => (props.assignment.isPrimary ? t("questions.primaryTheme") : t("questions.promoteAsPrimaryTheme")));

const removeButtonTooltip = computed<string>(() => {
  if (props.isRemoveDisabled && props.assignment.isPrimary) {
    return t("questions.cantRemovePrimaryTheme");
  }
  return t("questions.removeTheme", { theme: themeLabel.value });
});

function onSetPrimary(): void {
  emit("setPrimary");
}

function onToggleHint(): void {
  emit("toggleHint");
}

function onRemove(): void {
  emit("remove");
}
</script>

<template>
  <div
    class="border border-default flex gap-2 items-center p-2 rounded-md"
    :data-testid="`question-theme-selector-item-${assignment.themeId}`"
  >
    <UTooltip :text="primaryButtonTooltip">
      <UButton
        :aria-label="primaryButtonTooltip"
        :color="primaryButtonColor"
        :data-testid="`question-theme-selector-primary-${assignment.themeId}`"
        :disabled="isPrimaryDisabled"
        icon="i-lucide-star"
        size="xs"
        :variant="primaryButtonVariant"
        @click="onSetPrimary"
      />
    </UTooltip>

    <QuestionThemeIcon
      :color="theme?.color"
      :data-testid="`question-theme-selector-icon-${assignment.themeId}`"
      :size="20"
      :slug="theme?.slug ?? ''"
    />

    <span class="flex-1 text-default text-sm">
      {{ themeLabel }}
    </span>

    <span class="text-muted text-xs">{{ $t("questions.fields.hint") }}</span>

    <USwitch
      :data-testid="`question-theme-selector-hint-${assignment.themeId}`"
      :disabled="isHintDisabled"
      :model-value="assignment.isHint"
      size="xs"
      @update:model-value="onToggleHint"
    />

    <UTooltip
      v-if="isRemoveVisible"
      :text="removeButtonTooltip"
    >
      <UButton
        :aria-label="$t('questions.removeTheme', { 'theme': themeLabel })"
        color="neutral"
        :data-testid="`question-theme-selector-remove-${assignment.themeId}`"
        :disabled="isRemoveDisabled"
        icon="i-lucide-x"
        size="xs"
        variant="ghost"
        @click="onRemove"
      />
    </UTooltip>
  </div>
</template>