<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

import type { QuestionsTableGlobalFilterOptions } from "~/components/domain/question/QuestionsTable/questions-table.types";
import { createTableColumn } from "~/utils/helpers/table/table.helpers";

const { t, locale: currentLocale } = useI18n();

const questionsStore = useQuestionsStore();
const { questions } = storeToRefs(questionsStore);

const columns = computed<TableColumn<Question>[]>(() => [
  createTableColumn<Question>({ accessorKey: "category", header: t("questions.fields.category"), isCentered: true }),
  createTableColumn<Question>({ accessorKey: "themes", header: t("questions.fields.themes"), isCentered: true }),
  createTableColumn<Question>({ accessorKey: "statement", header: t("questions.fields.statement") }),
  createTableColumn<Question>({ accessorKey: "cognitiveDifficulty", header: t("questions.fields.cognitiveDifficulty"), isCentered: true }),
  createTableColumn<Question>({ accessorKey: "status", header: t("questions.fields.status"), isCentered: true }),
  createTableColumn<Question>({ accessorKey: "translations", header: t("questions.fields.translations"), isCentered: true }),
  createTableColumn<Question>({ accessorKey: "actions", header: t("common.table.actions"), isCentered: true }),
]);

const fuseKeys = computed<string[]>(() => [
  `content.statement.${currentLocale.value}`,
  "category",
  "status",
]);

const { searchTerm, globalFilter, globalFilterFunction, hasActiveFilter } = useTableGlobalFilter<Question>({
  data: questions,
  keys: fuseKeys,
});

const globalFilterOptions = computed<QuestionsTableGlobalFilterOptions>(() => ({ globalFilterFn: globalFilterFunction }));
</script>

<template>
  <UCard id="questions-table">
    <template #header>
      <QuestionsTableHeader
        v-model:search-term="searchTerm"
        data-testid="questions-table-header"
      />
    </template>

    <UTable
      v-model:global-filter="globalFilter"
      :columns="columns"
      :data="questions"
      data-testid="questions-table-data"
      :global-filter-options="globalFilterOptions"
      sticky
      :tabindex="0"
    >
      <template #category-cell="{ row }">
        <QuestionCategoryBadge
          :category="row.original.category"
          :data-testid="`category-cell-badge-${row.original.id}`"
        />
      </template>

      <template #themes-cell="{ row }">
        <QuestionThemesList
          :data-testid="`themes-cell-list-${row.original.id}`"
          :themes="row.original.themes"
        />
      </template>

      <template #statement-cell="{ row }">
        <TranslatedText
          :data-testid="`statement-cell-text-${row.original.id}`"
          :localized-text="row.original.content.statement"
        />
      </template>

      <template #cognitiveDifficulty-cell="{ row }">
        <QuestionDifficultyBadge
          :data-testid="`difficulty-cell-badge-${row.original.id}`"
          :difficulty="row.original.cognitiveDifficulty"
        />
      </template>

      <template #status-cell="{ row }">
        <QuestionStatusBadge
          :data-testid="`status-cell-badge-${row.original.id}`"
          :status="row.original.status"
        />
      </template>

      <template #translations-cell="{ row }">
        <QuestionTranslationCompletenessIndicator
          :data-testid="`translations-cell-indicator-${row.original.id}`"
          :question="row.original"
        />
      </template>

      <template #actions-cell="{ row }">
        <div class="flex justify-center">
          <QuestionsTableActions
            :data-testid="`actions-cell-${row.original.id}`"
            :question="row.original"
          />
        </div>
      </template>

      <template #empty>
        <TableEmptyState
          data-testid="questions-table-empty-state"
          :has-active-filter="hasActiveFilter"
        />
      </template>
    </UTable>
  </UCard>
</template>