<script setup lang="ts">
import type { QuestionCognitiveDifficulty } from "@goat-it/schemas/question";
import { QUESTION_COGNITIVE_DIFFICULTIES } from "@goat-it/schemas/question";

import type { ButtonVariant } from "~/utils/types/button.types";
import type { AppColor } from "~/utils/types/color.types";
import type { QuestionCognitiveDifficultySelectorEmits, QuestionCognitiveDifficultySelectorItem, QuestionCognitiveDifficultySelectorProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionCognitiveDifficultySelector/question-cognitive-difficulty-selector.types";
import { getQuestionCognitiveDifficultyUiMetadata } from "~/composables/domain/question/helpers/question.helpers";

const props = defineProps<QuestionCognitiveDifficultySelectorProperties>();
const emit = defineEmits<QuestionCognitiveDifficultySelectorEmits>();

const items = computed<QuestionCognitiveDifficultySelectorItem[]>(() => QUESTION_COGNITIVE_DIFFICULTIES.map(difficulty => {
  const metadata = getQuestionCognitiveDifficultyUiMetadata(difficulty);

  return {
    value: difficulty,
    icon: metadata.icon,
    color: metadata.color,
    labelKey: metadata.labelKey,
  };
}));

function getButtonColor(item: QuestionCognitiveDifficultySelectorItem): AppColor {
  return props.modelValue === item.value ? item.color : "neutral";
}

function getButtonVariant(item: QuestionCognitiveDifficultySelectorItem): ButtonVariant {
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
      class="justify-center w-full"
      :color="getButtonColor(item)"
      :data-testid="`question-difficulty-selector-${item.value}`"
      :icon="item.icon"
      :label="$t(item.labelKey)"
      :variant="getButtonVariant(item)"
      @click="onSelectDifficulty(item.value)"
    />
  </div>
</template>