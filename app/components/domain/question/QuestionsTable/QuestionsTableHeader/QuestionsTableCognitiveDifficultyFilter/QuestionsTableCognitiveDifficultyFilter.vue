<script setup lang="ts">
import { QUESTION_COGNITIVE_DIFFICULTIES } from "@goat-it/schemas/question";
import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";

import { getQuestionCognitiveDifficultyUiMetadata } from "~/composables/domain/question/helpers/question.helpers";
import type { QuestionsTableCognitiveDifficultyFilterEmits, QuestionsTableCognitiveDifficultyFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableCognitiveDifficultyFilter/questions-table-cognitive-difficulty-filter.types";
import type { TableFilterSelectItem } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

defineProps<QuestionsTableCognitiveDifficultyFilterProps>();
const emit = defineEmits<QuestionsTableCognitiveDifficultyFilterEmits>();

const { t } = useI18n();

const cognitiveDifficultyItems = computed<TableFilterSelectItem<QuestionCognitiveDifficulty>[]>(() => QUESTION_COGNITIVE_DIFFICULTIES.map(cognitiveDifficulty => {
  const metadata = getQuestionCognitiveDifficultyUiMetadata(cognitiveDifficulty);

  return {
    label: t(metadata.labelKey),
    value: cognitiveDifficulty,
    icon: metadata.icon,
  };
}));

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