<script setup lang="ts">
import { QUESTION_COGNITIVE_DIFFICULTIES } from "@goat-it/schemas/question";
import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

import { QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA } from "~/composables/domain/question/constants/question-cognitive-difficulty.constants";
import type { QuestionsTableCognitiveDifficultyFilterEmits, QuestionsTableCognitiveDifficultyFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableCognitiveDifficultyFilter/questions-table-cognitive-difficulty-filter.types";
import type { TableFilterSelectItem } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

defineProps<QuestionsTableCognitiveDifficultyFilterProps>();
const emit = defineEmits<QuestionsTableCognitiveDifficultyFilterEmits>();

const { t } = useI18n();

const cognitiveDifficultyItems = computed<TableFilterSelectItem<QuestionCognitiveDifficulty>[]>(() => QUESTION_COGNITIVE_DIFFICULTIES.map(cognitiveDifficulty => ({
  label: t(`questions.difficulty.${cognitiveDifficulty}`),
  value: cognitiveDifficulty,
  icon: QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA[cognitiveDifficulty].icon,
})));

function onUpdateModelValue(value: QuestionCognitiveDifficulty | undefined): void {
  emit("update:modelValue", value);
}
</script>

<template>
  <TableFilterSelect
    data-testid="questions-table-cognitive-difficulty-filter"
    :items="cognitiveDifficultyItems"
    :label="t('questions.fields.cognitiveDifficulty')"
    :model-value="modelValue"
    @update:model-value="onUpdateModelValue"
  />
</template>