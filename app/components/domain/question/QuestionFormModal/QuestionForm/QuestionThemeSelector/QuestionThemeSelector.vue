<script setup lang="ts">
import type { QuestionThemeAssignmentCreationDto } from "@goat-it/schemas/question";
import { QUESTION_THEME_ASSIGNMENTS_MAX_ITEMS } from "@goat-it/schemas/question";

import type { QuestionThemeSelectorEmits, QuestionThemeSelectorProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionThemeSelector/question-theme-selector.types";

const props = defineProps<QuestionThemeSelectorProperties>();
const emit = defineEmits<QuestionThemeSelectorEmits>();

const { locale: currentLocale } = useI18n();

const selectedThemeIds = computed<string[]>(() => props.modelValue.map((assignment) => assignment.themeId));

const selectableThemes = computed(() => props.availableThemes.filter(
  (theme) => !selectedThemeIds.value.includes(theme.id),
));

const isMaxReached = computed<boolean>(() => props.modelValue.length >= QUESTION_THEME_ASSIGNMENTS_MAX_ITEMS);

const selectMenuItems = computed(() => selectableThemes.value.map((theme) => ({
  label: theme.label[currentLocale.value] ?? theme.label.en ?? "",
  value: theme.id,
})));

function getThemeLabel(themeId: string): string {
  const theme = props.availableThemes.find((t) => t.id === themeId);

  return theme?.label[currentLocale.value] ?? theme?.label.en ?? themeId;
}

function getPrimaryButtonColor(assignment: QuestionThemeAssignmentCreationDto): string {
  return assignment.isPrimary ? "warning" : "neutral";
}

function getPrimaryButtonVariant(assignment: QuestionThemeAssignmentCreationDto): string {
  return assignment.isPrimary ? "solid" : "ghost";
}

function onAddTheme(themeId: string): void {
  const isFirstThemeEver = props.modelValue.length === 0;
  const newAssignment: QuestionThemeAssignmentCreationDto = {
    themeId,
    isPrimary: isFirstThemeEver,
    isHint: false,
  };
  emit("update:modelValue", [...props.modelValue, newAssignment]);
}

function onSetPrimary(themeId: string): void {
  const updated = props.modelValue.map((assignment) => ({
    ...assignment,
    isPrimary: assignment.themeId === themeId,
  }));
  emit("update:modelValue", updated);
}

function onToggleHint(themeId: string): void {
  const updated = props.modelValue.map((assignment) =>
    assignment.themeId === themeId ? { ...assignment, isHint: !assignment.isHint } : assignment,
  );
  emit("update:modelValue", updated);
}

function onRemoveTheme(themeId: string): void {
  const filtered = props.modelValue.filter((a) => a.themeId !== themeId);
  const hasPrimary = filtered.some((a) => a.isPrimary);

  if (!hasPrimary && filtered.length > 0) {
    filtered[0] = { ...filtered[0], isPrimary: true };
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
      :placeholder="$t('questions.fields.themes')"
      searchable
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
        class="flex items-center gap-2 rounded-md border border-default p-2"
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

        <span class="flex-1 text-sm text-default">
          {{ getThemeLabel(assignment.themeId) }}
        </span>

        <span class="text-xs text-muted">{{ $t("questions.fields.hint") }}</span>
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