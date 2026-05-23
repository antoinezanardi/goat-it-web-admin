<script setup lang="ts">
import type { QuestionThemeAssignmentCreationDto, QuestionThemeAssignmentModificationDto } from "@goat-it/schemas/question";
import { QUESTION_THEME_ASSIGNMENTS_MAX_ITEMS, QUESTION_THEME_ASSIGNMENTS_MIN_ITEMS } from "@goat-it/schemas/question";

import { getThemeLocalizedLabel } from "~/composables/domain/question-theme/helpers/question-theme.helpers";
import type { ButtonVariant } from "~/utils/types/button.types";
import type { AppColor } from "~/utils/types/color.types";
import type { QuestionThemeSelectorEmits, QuestionThemeSelectorProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/question-theme-selector.types";

const props = withDefaults(defineProps<QuestionThemeSelectorProperties>(), {
  disabled: false,
  mode: "create",
  isSubmitting: false,
});
const emit = defineEmits<QuestionThemeSelectorEmits>();

const { t, locale: currentLocale } = useI18n();

const missingThemeTranslation = computed<string>(() => t("questions.missingThemeTranslation"));

const selectedThemeIds = computed<string[]>(() => props.modelValue.map(assignment => assignment.themeId));

const selectMenuKey = ref<number>(0);

const selectableThemes = computed(() => props.availableThemes.filter(theme => !selectedThemeIds.value.includes(theme.id)));

const isEditMode = computed<boolean>(() => props.mode === "edit");

const isInteractionDisabled = computed<boolean>(() => props.disabled || props.isSubmitting);

const isSelectDisabled = computed<boolean>(() => isInteractionDisabled.value || props.modelValue.length >= QUESTION_THEME_ASSIGNMENTS_MAX_ITEMS);

const isLastThemeInEditMode = computed<boolean>(() => isEditMode.value && props.modelValue.length <= QUESTION_THEME_ASSIGNMENTS_MIN_ITEMS);

const selectMenuItems = computed(() => selectableThemes.value.map(theme => ({
  label: getThemeLocalizedLabel(theme, currentLocale.value, missingThemeTranslation.value),
  value: theme.id,
})));

function isPrimaryButtonDisabled(assignment: QuestionThemeAssignmentCreationDto): boolean {
  return isInteractionDisabled.value || assignment.isPrimary;
}

function isRemoveButtonDisabled(assignment: QuestionThemeAssignmentCreationDto): boolean {
  return isInteractionDisabled.value || isEditMode.value && assignment.isPrimary;
}

function isRemoveButtonVisible(assignment: QuestionThemeAssignmentCreationDto): boolean {
  if (isLastThemeInEditMode.value) {
    return false;
  }
  return !props.disabled || !isEditMode.value || !assignment.isPrimary;
}

function getRemoveButtonTooltip(assignment: QuestionThemeAssignmentCreationDto): string | undefined {
  if (!isEditMode.value || !assignment.isPrimary) {
    return undefined;
  }
  return t("questions.cantRemovePrimaryTheme");
}

function getThemeLabelFromAvailableThemes(themeId: string): string {
  const theme = props.availableThemes.find(availableTheme => availableTheme.id === themeId);

  return getThemeLocalizedLabel(theme, currentLocale.value, missingThemeTranslation.value);
}

function getPrimaryButtonColor(assignment: QuestionThemeAssignmentCreationDto): AppColor {
  return assignment.isPrimary ? "warning" : "neutral";
}

function getPrimaryButtonVariant(assignment: QuestionThemeAssignmentCreationDto): ButtonVariant {
  return assignment.isPrimary ? "solid" : "ghost";
}

function onAddTheme(themeId: string): void {
  const isFirstThemeEver = props.modelValue.length === 0;
  const addedAssignment: QuestionThemeAssignmentCreationDto = {
    themeId,
    isPrimary: isFirstThemeEver,
    isHint: false,
  };
  selectMenuKey.value += 1;

  if (isEditMode.value) {
    emit("assignThemeInEditMode", addedAssignment);

    return;
  }
  emit("update:modelValue", [...props.modelValue, addedAssignment]);
}

function onSetPrimary(themeId: string): void {
  if (isEditMode.value) {
    const dto: QuestionThemeAssignmentModificationDto = { isPrimary: true };
    emit("modifyThemeAssignmentInEditMode", themeId, dto);

    return;
  }
  const updated = props.modelValue.map(assignment => ({
    ...assignment,
    isPrimary: assignment.themeId === themeId,
  }));
  emit("update:modelValue", updated);
}

function onToggleHint(themeId: string): void {
  const assignment = props.modelValue.find(themeAssignment => themeAssignment.themeId === themeId);

  if (isEditMode.value) {
    const dto: QuestionThemeAssignmentModificationDto = { isHint: !assignment?.isHint };
    emit("modifyThemeAssignmentInEditMode", themeId, dto);

    return;
  }
  const updated = props.modelValue.map(themeAssignment => (themeAssignment.themeId === themeId ? { ...themeAssignment, isHint: !themeAssignment.isHint } : themeAssignment));
  emit("update:modelValue", updated);
}

function onRemoveTheme(themeId: string): void {
  if (isEditMode.value) {
    emit("removeThemeInEditMode", themeId);

    return;
  }
  const filtered = props.modelValue.filter(assignment => assignment.themeId !== themeId);
  const hasPrimary = filtered.some(assignment => assignment.isPrimary);
  const firstAssignment = filtered[0];

  if (!hasPrimary && firstAssignment) {
    filtered[0] = { themeId: firstAssignment.themeId, isPrimary: true, isHint: firstAssignment.isHint };
  }
  selectMenuKey.value += 1;
  emit("update:modelValue", filtered);
}
</script>

<template>
  <UFormField
    data-testid="question-theme-selector"
    :label="$t('questions.fields.themes')"
    name="themes"
    required
  >
    <USelectMenu
      :key="selectMenuKey"
      data-testid="question-theme-selector-select"
      :disabled="isSelectDisabled"
      :items="selectMenuItems"
      :model-value="undefined"
      :placeholder="$t('questions.selectThemes')"
      searchable
      value-key="value"
      @update:model-value="onAddTheme"
    />

    <div
      v-if="modelValue.length > 0"
      class="mt-2 space-y-1"
      data-testid="question-theme-selector-list"
    >
      <div
        v-for="assignment in modelValue"
        :key="assignment.themeId"
        class="border border-default flex gap-2 items-center p-2 rounded-md"
        :data-testid="`question-theme-selector-item-${assignment.themeId}`"
      >
        <UButton
          :aria-label="getThemeLabelFromAvailableThemes(assignment.themeId)"
          :color="getPrimaryButtonColor(assignment)"
          :data-testid="`question-theme-selector-primary-${assignment.themeId}`"
          :disabled="isPrimaryButtonDisabled(assignment)"
          icon="i-lucide-star"
          size="xs"
          :variant="getPrimaryButtonVariant(assignment)"
          @click="onSetPrimary(assignment.themeId)"
        />

        <span class="flex-1 text-default text-sm">
          {{ getThemeLabelFromAvailableThemes(assignment.themeId) }}
        </span>

        <span class="text-muted text-xs">{{ $t("questions.fields.hint") }}</span>

        <USwitch
          :data-testid="`question-theme-selector-hint-${assignment.themeId}`"
          :disabled="isInteractionDisabled"
          :model-value="assignment.isHint"
          size="xs"
          @update:model-value="onToggleHint(assignment.themeId)"
        />

        <UButton
          v-if="isRemoveButtonVisible(assignment)"
          :aria-label="$t('questions.removeTheme', { 'theme': getThemeLabelFromAvailableThemes(assignment.themeId) })"
          color="neutral"
          :data-testid="`question-theme-selector-remove-${assignment.themeId}`"
          :disabled="isRemoveButtonDisabled(assignment)"
          icon="i-lucide-x"
          size="xs"
          :tooltip="getRemoveButtonTooltip(assignment)"
          variant="ghost"
          @click="onRemoveTheme(assignment.themeId)"
        />
      </div>
    </div>
  </UFormField>
</template>