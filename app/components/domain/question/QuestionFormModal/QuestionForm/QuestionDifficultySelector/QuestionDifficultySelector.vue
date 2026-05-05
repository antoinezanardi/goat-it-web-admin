<script setup lang="ts">
import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";
import { QUESTION_COGNITIVE_DIFFICULTIES } from "@goat-it/schemas/question";

import type { QuestionDifficultySelectorEmits, QuestionDifficultySelectorItem, QuestionDifficultySelectorProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionDifficultySelector/question-difficulty-selector.types";
import { QUESTION_DIFFICULTY_UI_METADATA } from "~/composables/domain/question/constants/question-difficulty.constants";

const props = defineProps<QuestionDifficultySelectorProperties>();
const emit = defineEmits<QuestionDifficultySelectorEmits>();

const items = computed<QuestionDifficultySelectorItem[]>(() => QUESTION_COGNITIVE_DIFFICULTIES.map(
  (difficulty) => ({ value: difficulty, ...QUESTION_DIFFICULTY_UI_METADATA[difficulty] }),
));

function getButtonColor(item: QuestionDifficultySelectorItem): string {
  return props.modelValue === item.value ? item.color : "neutral";
}

function getButtonVariant(item: QuestionDifficultySelectorItem): string {
  return props.modelValue === item.value ? "solid" : "outline";
}

function onSelectDifficulty(value: QuestionCognitiveDifficulty): void {
  emit("update:modelValue", value);
}
</script>

<template>
  <div
    class="flex gap-2"
    data-testid="question-difficulty-selector"
  >
    <UButton
      v-for="item in items"
      :key="item.value"
      :color="getButtonColor(item)"
      :data-testid="`question-difficulty-selector-${item.value}`"
      :icon="item.icon"
      :label="$t(item.labelKey)"
      :variant="getButtonVariant(item)"
      @click="onSelectDifficulty(item.value)"
    />
  </div>
</template>