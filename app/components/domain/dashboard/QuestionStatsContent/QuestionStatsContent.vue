<script setup lang="ts">
import type { QuestionStatsDto } from "@goat-it/schemas/question";

import type { StatsCardItem } from "~/components/domain/dashboard/StatsCard/stats-card.types";
import { QUESTION_CATEGORY_UI_METADATA } from "~/composables/domain/question/constants/question-category.constants";
import { QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA } from "~/composables/domain/question/constants/question-cognitive-difficulty.constants";

/** Props for the QuestionStatsContent component. */
const props = defineProps<{
  /** The question statistics DTO to display. */
  stats: QuestionStatsDto;
}>();

const byStatusItems = computed<StatsCardItem[]>(() => [
  { labelKey: "questions.status.pending", value: props.stats.byStatus.pending, color: "info" },
  { labelKey: "questions.status.active", value: props.stats.byStatus.active, color: "success" },
  { labelKey: "questions.status.archived", value: props.stats.byStatus.archived, color: "warning" },
  { labelKey: "questions.status.rejected", value: props.stats.byStatus.rejected, color: "error" },
]);

const byCategoryItems = computed<StatsCardItem[]>(() => [
  { labelKey: "questions.category.trivia", value: props.stats.byCategory.trivia, color: QUESTION_CATEGORY_UI_METADATA.trivia.color },
  { labelKey: "questions.category.lexicon", value: props.stats.byCategory.lexicon, color: QUESTION_CATEGORY_UI_METADATA.lexicon.color },
  { labelKey: "questions.category.riddle", value: props.stats.byCategory.riddle, color: QUESTION_CATEGORY_UI_METADATA.riddle.color },
  { labelKey: "questions.category.explanation", value: props.stats.byCategory.explanation, color: QUESTION_CATEGORY_UI_METADATA.explanation.color },
]);

const byDifficultyItems = computed<StatsCardItem[]>(() => [
  { labelKey: "questions.difficulty.easy", value: props.stats.byCognitiveDifficulty.easy, color: QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA.easy.color },
  { labelKey: "questions.difficulty.medium", value: props.stats.byCognitiveDifficulty.medium, color: QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA.medium.color },
  { labelKey: "questions.difficulty.hard", value: props.stats.byCognitiveDifficulty.hard, color: QUESTION_COGNITIVE_DIFFICULTY_UI_METADATA.hard.color },
]);

const byAuthorRoleItems = computed<StatsCardItem[]>(() => [
  { labelKey: "questions.authorRole.admin", value: props.stats.byAuthorRole.admin, color: "info" },
  { labelKey: "questions.authorRole.game", value: props.stats.byAuthorRole.game, color: "success" },
  { labelKey: "questions.authorRole.ai", value: props.stats.byAuthorRole.ai, color: "warning" },
]);

const byRejectionTypeItems = computed<StatsCardItem[]>(() => [
  { labelKey: "questions.rejectionType.inappropriate-content", value: props.stats.byRejectionType["inappropriate-content"], color: "error" },
  { labelKey: "questions.rejectionType.incorrect-information", value: props.stats.byRejectionType["incorrect-information"], color: "warning" },
  { labelKey: "questions.rejectionType.poor-quality", value: props.stats.byRejectionType["poor-quality"], color: "info" },
  { labelKey: "questions.rejectionType.duplicate-question", value: props.stats.byRejectionType["duplicate-question"], color: "secondary" },
  { labelKey: "questions.rejectionType.other", value: props.stats.byRejectionType.other, color: "neutral" },
]);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="gap-4 grid grid-cols-2">
      <StatsCard
        default-view="doughnut"
        :items="byStatusItems"
        test-id="stats-card-by-status"
        title-key="home.stats.byStatus"
      />

      <StatsCard
        default-view="doughnut"
        :items="byCategoryItems"
        test-id="stats-card-by-category"
        title-key="home.stats.byCategory"
      />

      <StatsCard
        default-view="doughnut"
        :items="byDifficultyItems"
        test-id="stats-card-by-difficulty"
        title-key="home.stats.byCognitiveDifficulty"
      />

      <StatsCard
        default-view="doughnut"
        :items="byAuthorRoleItems"
        test-id="stats-card-by-author-role"
        title-key="home.stats.byAuthorRole"
      />
    </div>

    <StatsCard
      default-view="bar"
      :items="byRejectionTypeItems"
      test-id="stats-card-by-rejection-type"
      title-key="home.stats.byRejectionType"
    />
  </div>
</template>