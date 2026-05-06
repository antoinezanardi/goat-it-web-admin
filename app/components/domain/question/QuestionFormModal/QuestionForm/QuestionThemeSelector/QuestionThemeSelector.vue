<script setup lang="ts">
import type { QuestionThemeAssignmentCreationDto } from "@goat-it/schemas/question";
import { QUESTION_THEME_ASSIGNMENTS_MAX_ITEMS } from "@goat-it/schemas/question";

import type { ButtonVariant } from "~/utils/types/button.types.ts";
import type { AppColor } from "~/utils/types/color.types.ts";
import type { QuestionThemeSelectorEmits, QuestionThemeSelectorProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/question-theme-selector.types";

const props = defineProps<QuestionThemeSelectorProperties>();
const emit = defineEmits<QuestionThemeSelectorEmits>();

const { locale: currentLocale } = useI18n();

const selectedThemeReference = ref<string>();

const selectedThemeIds = computed<string[]>(() => props.modelValue.map(assignment => assignment.themeId));

const selectableThemes = computed(() => props.availableThemes.filter(theme => !selectedThemeIds.value.includes(theme.id)));

const isMaxReached = computed<boolean>(() => props.modelValue.length >= QUESTION_THEME_ASSIGNMENTS_MAX_ITEMS);

const selectMenuItems = computed(() => selectableThemes.value.map(theme => ({
  label: theme.label[currentLocale.value] ?? theme.label.en ?? "",
  value: theme.id,
})));

function getThemeLabel(themeId: string): string {
  const theme = props.availableThemes.find(availableTheme => availableTheme.id === themeId);

  return theme?.label[currentLocale.value] ?? theme?.label.en ?? themeId;
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
  emit("update:modelValue", [...props.modelValue, addedAssignment]);
  selectedThemeReference.value = undefined;
}

function onSetPrimary(themeId: string): void {
  const updated = props.modelValue.map(assignment => ({
    ...assignment,
    isPrimary: assignment.themeId === themeId,
  }));
  emit("update:modelValue", updated);
}

function onToggleHint(themeId: string): void {
  const updated = props.modelValue.map(assignment => (assignment.themeId === themeId ? { ...assignment, isHint: !assignment.isHint } : assignment));
  emit("update:modelValue", updated);
}

function onRemoveTheme(themeId: string): void {
  const filtered = props.modelValue.filter(assignment => assignment.themeId !== themeId);
  const hasPrimary = filtered.some(assignment => assignment.isPrimary);
  const firstAssignment = filtered[0];

  if (!hasPrimary && firstAssignment) {
    filtered[0] = { themeId: firstAssignment.themeId, isPrimary: true, isHint: firstAssignment.isHint };
  }
  emit("update:modelValue", filtered);
}
</script>

<template>
  <div data-testid="question-theme-selector">
    <USelectMenu
      data-testid="question-theme-selector-menu"
      :disabled="isMaxReached"
      :items="selectMenuItems"
      :model-value="selectedThemeReference"
      :placeholder="$t('questions.fields.themes')"
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
          :color="getPrimaryButtonColor(assignment)"
          :data-testid="`question-theme-selector-primary-${assignment.themeId}`"
          :disabled="assignment.isPrimary"
          icon="i-lucide-star"
          size="xs"
          :variant="getPrimaryButtonVariant(assignment)"
          @click="onSetPrimary(assignment.themeId)"
        />

        <span class="flex-1 text-default text-sm">
          {{ getThemeLabel(assignment.themeId) }}
        </span>

        <span class="text-muted text-xs">{{ $t("questions.fields.hint") }}</span>

        <USwitch
          :data-testid="`question-theme-selector-hint-${assignment.themeId}`"
          :model-value="assignment.isHint"
          size="xs"
          @update:model-value="onToggleHint(assignment.themeId)"
        />

        <UButton
          color="neutral"
          :data-testid="`question-theme-selector-remove-${assignment.themeId}`"
          icon="i-lucide-x"
          size="xs"
          variant="ghost"
          @click="onRemoveTheme(assignment.themeId)"
        />
      </div>
    </div>
  </div>
</template>