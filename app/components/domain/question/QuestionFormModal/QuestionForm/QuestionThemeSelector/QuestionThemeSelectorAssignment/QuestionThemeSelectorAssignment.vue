<script setup lang="ts">
import { getThemeLocalizedLabel } from "~/composables/domain/question-theme/helpers/question-theme.helpers";
import type { ButtonVariant } from "~/utils/types/button.types";
import type { AppColor } from "~/utils/types/color.types";
import { QUESTION_THEME_SELECTOR_ASSIGNMENT_ICON_SIZE } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/QuestionThemeSelectorAssignment/question-theme-selector-assignment.constants";
import type { QuestionThemeSelectorAssignmentEmits, QuestionThemeSelectorAssignmentProps } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/QuestionThemeSelectorAssignment/question-theme-selector-assignment.types";

const props = defineProps<QuestionThemeSelectorAssignmentProps>();
const emit = defineEmits<QuestionThemeSelectorAssignmentEmits>();

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

const containerBorderClass = computed<string>(() => (props.assignment.isPrimary ? "border-warning" : "border-default"));

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
    class="border flex gap-2 items-center p-2 rounded-md"
    :class="containerBorderClass"
    :data-testid="`question-theme-selector-assignment-${assignment.themeId}`"
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
      :size="QUESTION_THEME_SELECTOR_ASSIGNMENT_ICON_SIZE"
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