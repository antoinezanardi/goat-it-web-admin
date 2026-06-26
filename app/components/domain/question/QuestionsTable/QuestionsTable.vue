<script setup lang="ts">
import { h } from "vue";
import type { AdminFindQuestionsQueryDto, QuestionCategory, QuestionCognitiveDifficulty, QuestionStatus } from "@goat-it/schemas/question";
import type { TableColumn } from "@nuxt/ui";
import type { Locale } from "@goat-it/schemas/shared/locale";

import type { QuestionsTableFilters } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/questions-table-header.types";
import type { QuestionsTableEmits, QuestionsTableGlobalFilterOptions } from "~/components/domain/question/QuestionsTable/questions-table.types";
import { createTableColumn } from "~/utils/helpers/table/table.helpers";
import { TABLE_UI } from "~/utils/constants/table/table.constants.ts";
import { getLocalizedDisplayValue } from "#shared/utils/helpers/localization/localization.helpers";
import { toKebabCaseKeys } from "#shared/utils/helpers/object/object.helpers";

const emit = defineEmits<QuestionsTableEmits>();

const { t, locale: currentLocale } = useI18n();

const expanded = ref<Record<string, boolean>>({});

const questionsStore = useQuestionsStore();
const { questions, isFetchingQuestions } = storeToRefs(questionsStore);

const { filters, activeFilterCount, clearFilters, setFilterValue, hasActiveFilters } = useTableFilters({
  definitions: {
    status: { default: undefined as QuestionStatus | undefined },
    category: { default: undefined as QuestionCategory | undefined },
    cognitiveDifficulty: { default: undefined as QuestionCognitiveDifficulty | undefined },
    themeIds: { default: [] as string[] },
  },
});
const filterValues = computed(() => ({
  status: filters.status.value,
  category: filters.category.value,
  cognitiveDifficulty: filters.cognitiveDifficulty.value,
  themeIds: filters.themeIds.value,
}));

watch(filterValues, async(values): Promise<void> => {
  await questionsStore.fetchAndStoreQuestions(toKebabCaseKeys(values) as AdminFindQuestionsQueryDto);
});

const columns = computed<TableColumn<Question>[]>(() => [
  createTableColumn<Question>({ accessorKey: "expand", header: () => h("span", { class: "sr-only" }, t("questions.table.expandTooltip")), isCentered: true }),
  createTableColumn<Question>({ accessorKey: "category", header: t("questions.fields.category"), isCentered: true }),
  createTableColumn<Question>({ accessorKey: "themes", header: t("questions.fields.themes"), isCentered: true }),
  createTableColumn<Question>({ accessorKey: "statement", header: t("questions.fields.statement"), tdClass: "whitespace-normal break-words" }),
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

const { searchTerm, globalFilter, globalFilterFunction, hasActiveFilter: hasActiveGlobalFilter, filteredCount } = useTableGlobalFilter<Question>({
  data: questions,
  keys: fuseKeys,
});

const globalFilterOptions = computed<QuestionsTableGlobalFilterOptions>(() => ({ globalFilterFn: globalFilterFunction }));

const hasActiveFilter = computed<boolean>(() => hasActiveGlobalFilter.value || hasActiveFilters.value);

const headerFilters = computed<QuestionsTableFilters>(() => ({
  status: filters.status.value,
  category: filters.category.value,
  cognitiveDifficulty: filters.cognitiveDifficulty.value,
  themeIds: filters.themeIds.value,
}));

function getStatementText(statement: Record<string, string | undefined>): string {
  return getLocalizedDisplayValue(statement, currentLocale.value as Locale) ?? "";
}

function getExpandAriaLabel(isExpanded: boolean | undefined, statementText: string): string {
  const action = isExpanded ? t("questions.table.collapseTooltip") : t("questions.table.expandTooltip");

  return t("questions.table.expandAriaLabel", { action, statement: statementText });
}

function onStartCreateFromQuestionsTableHeader(): void {
  emit("startCreate");
}

function onUpdateFilterFromQuestionsTableHeader(updatedFilters: Partial<QuestionsTableFilters>): void {
  const filterKeys: (keyof QuestionsTableFilters)[] = ["status", "category", "cognitiveDifficulty", "themeIds"];

  for (const key of filterKeys) {
    if (key in updatedFilters) {
      setFilterValue(key, updatedFilters[key]);
    }
  }
}

function onClearFiltersFromQuestionsTableHeader(): void {
  clearFilters();
}

function onStartEditFromQuestionsTableActions(id: string): void {
  emit("startEdit", id);
}
</script>

<template>
  <UCard id="questions-table">
    <template #header>
      <QuestionsTableHeader
        v-model:search-term="searchTerm"
        :active-filter-count="activeFilterCount"
        data-testid="questions-table-header"
        :filtered-count="filteredCount"
        :filters="headerFilters"
        :is-loading="isFetchingQuestions"
        @clear-filters="onClearFiltersFromQuestionsTableHeader"
        @start-create="onStartCreateFromQuestionsTableHeader"
        @update:filter="onUpdateFilterFromQuestionsTableHeader"
      />
    </template>

    <UTable
      v-model:expanded="expanded"
      v-model:global-filter="globalFilter"
      :columns="columns"
      :data="questions"
      data-testid="questions-table-data"
      :global-filter-options="globalFilterOptions"
      :loading="isFetchingQuestions"
      sticky
      :tabindex="0"
      :ui="TABLE_UI"
    >
      <template #expand-cell="{ row }">
        <div class="flex justify-center">
          <UTooltip
            :data-testid="`expand-tooltip-${row.original.id}`"
            :text="row.getIsExpanded() ? $t('questions.table.collapseTooltip') : $t('questions.table.expandTooltip')"
          >
            <UButton
              :aria-label="getExpandAriaLabel(row.getIsExpanded(), getStatementText(row.original.content.statement))"
              class="duration-200 transition-transform"
              :class="{ 'rotate-180': row.getIsExpanded() }"
              color="neutral"
              :data-testid="`expand-button-${row.original.id}`"
              icon="i-lucide-chevron-down"
              variant="ghost"
              @click="row.toggleExpanded()"
            />
          </UTooltip>
        </div>
      </template>

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
        <QuestionCognitiveDifficultyBadge
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
            @start-edit="onStartEditFromQuestionsTableActions"
          />
        </div>
      </template>

      <template #expanded="{ row }">
        <QuestionsTableExpandedRow
          :data-testid="`questions-table-expanded-row-${row.original.id}`"
          :question="row.original"
        />
      </template>

      <template #loading>
        <div class="animate-fade-slide-up-in">
          <LoadingSpinner :label="$t('questions.fetching')"/>
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