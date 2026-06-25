<script setup lang="ts">
import type { LocalizedText } from "@goat-it/schemas/shared/locale";

import type { QuestionsTableExpandedRowProps } from "~/components/domain/question/QuestionsTable/QuestionsTableExpandedRow/questions-table-expanded-row.types";

const props = defineProps<QuestionsTableExpandedRowProps>();

const { locale: currentLocale } = useI18n();

const triviaList = computed(() => props.question.content.trivia?.[currentLocale.value] ?? []);

function getLocalizedTrivium(trivium: string): Partial<LocalizedText> {
  return { [currentLocale.value]: trivium };
}
</script>

<template>
  <div class="p-4 space-y-4">
    <div>
      <p class="font-semibold mb-1 text-muted text-sm">
        {{ $t("questions.fields.answer") }}
      </p>

      <TranslatedText
        :data-testid="`expanded-answer-${question.id}`"
        :localized-text="question.content.answer"
      />
    </div>

    <div v-if="question.content.context">
      <p class="font-semibold mb-1 text-muted text-sm">
        {{ $t("questions.fields.context") }}
      </p>

      <TranslatedText
        :data-testid="`expanded-context-${question.id}`"
        :localized-text="question.content.context"
      />
    </div>

    <div v-if="triviaList.length">
      <p class="font-semibold mb-1 text-muted text-sm">
        {{ $t("questions.fields.trivia") }}
      </p>

      <ul>
        <li
          v-for="(trivium, index) in triviaList"
          :key="`trivia-${question.id}-${index}`"
        >
          - <TranslatedText
            :data-testid="`expanded-trivia-${question.id}-${index}`"
            :localized-text="getLocalizedTrivium(trivium)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>