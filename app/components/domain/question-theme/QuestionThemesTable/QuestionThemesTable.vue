<script setup lang="ts">
import type { AdminFindQuestionThemesQueryDto } from "@goat-it/schemas/question-theme";
import type { TableColumn } from "@nuxt/ui";

import type { QuestionThemesTableEmits, QuestionThemesTableGlobalFilterOptions } from "~/components/domain/question-theme/QuestionThemesTable/question-themes-table.types";
import type { QuestionThemesTableFilters } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableHeader/question-themes-table-header.types";
import { TABLE_UI } from "~/utils/constants/table/table.constants.ts";
import { createTableColumn } from "~/utils/helpers/table/table.helpers";

const emit = defineEmits<QuestionThemesTableEmits>();

const { t, locale: currentLocale } = useI18n();

const questionThemesStore = useQuestionThemesStore();
const { questionThemes, isFetchingQuestionThemes } = storeToRefs(questionThemesStore);

const { filters, activeFilterCount, clearFilters, setFilterValue } = useTableFilters({
  definitions: {
    status: { default: undefined as QuestionThemesTableFilters["status"] },
  },
});

watch(() => filters.status.value, async status => {
  const query = status === undefined ? undefined : { status } as AdminFindQuestionThemesQueryDto;
  await questionThemesStore.fetchAndStoreQuestionThemes(query);
});

const columns = computed<TableColumn<QuestionTheme>[]>(() => [
  createTableColumn<QuestionTheme>({ accessorKey: "icon", header: t("questionThemes.fields.icon"), isCentered: true }),
  createTableColumn<QuestionTheme>({ accessorKey: "label", header: t("questionThemes.fields.label"), isCentered: true }),
  createTableColumn<QuestionTheme>({ accessorKey: "slug", header: t("questionThemes.fields.slug"), isCentered: true }),
  createTableColumn<QuestionTheme>({ accessorKey: "description", header: t("questionThemes.fields.description"), tdClass: "whitespace-normal break-words" }),
  createTableColumn<QuestionTheme>({ accessorKey: "aliases", header: t("questionThemes.fields.aliases"), isCentered: true }),
  createTableColumn<QuestionTheme>({ accessorKey: "status", header: t("questionThemes.fields.status"), isCentered: true }),
  createTableColumn<QuestionTheme>({ accessorKey: "translations", header: t("questionThemes.fields.translations"), isCentered: true }),
  createTableColumn<QuestionTheme>({ accessorKey: "actions", header: t("common.table.actions"), isCentered: true }),
]);

const fuseKeys = computed<string[]>(() => [
  "slug",
  `label.${currentLocale.value}`,
  `description.${currentLocale.value}`,
  `aliases.${currentLocale.value}`,
  "status",
]);

const { searchTerm, globalFilter, globalFilterFunction, hasActiveFilter } = useTableGlobalFilter<QuestionTheme>({
  data: questionThemes,
  keys: fuseKeys,
});

const globalFilterOptions = computed<QuestionThemesTableGlobalFilterOptions>(() => ({ globalFilterFn: globalFilterFunction }));

const headerFilters = computed<QuestionThemesTableFilters>(() => ({ status: filters.status.value }));

function onStartCreateFromQuestionThemesTableHeader(): void {
  emit("startCreate");
}

function onUpdateFilterFromQuestionThemesTableHeader(updatedFilters: Partial<QuestionThemesTableFilters>): void {
  setFilterValue("status", updatedFilters.status);
}

function onStartEditFromQuestionThemesTableActions(id: string): void {
  emit("startEdit", id);
}
</script>

<template>
  <UCard id="question-themes-table">
    <template #header>
      <QuestionThemesTableHeader
        v-model:search-term="searchTerm"
        :active-filter-count="activeFilterCount"
        data-testid="question-themes-table-header"
        :filters="headerFilters"
        @clear-filters="clearFilters"
        @start-create="onStartCreateFromQuestionThemesTableHeader"
        @update:filter="onUpdateFilterFromQuestionThemesTableHeader"
      />
    </template>

    <UTable
      v-model:global-filter="globalFilter"
      :columns="columns"
      :data="questionThemes"
      data-testid="question-themes-table-data"
      :global-filter-options="globalFilterOptions"
      :loading="isFetchingQuestionThemes"
      sticky
      :tabindex="0"
      :ui="TABLE_UI"
    >
      <template #icon-cell="{ row }">
        <QuestionThemeIcon
          :color="row.original.color"
          :data-testid="`icon-cell-${row.original.slug}`"
          :size="24"
          :slug="row.original.slug"
        />
      </template>

      <template #label-cell="{ row }">
        <TranslatedText
          :data-testid="`label-cell-text-${row.original.slug}`"
          :localized-text="row.original.label"
        />
      </template>

      <template #slug-cell="{ row }">
        <QuestionThemeSlugBadge
          :data-testid="`slug-cell-badge-${row.original.slug}`"
          :slug="row.original.slug"
        />
      </template>

      <template #description-cell="{ row }">
        <TranslatedText
          :data-testid="`description-cell-text-${row.original.slug}`"
          :localized-text="row.original.description"
        />
      </template>

      <template #aliases-cell="{ row }">
        <QuestionThemeAliasesList
          :data-testid="`aliases-cell-list-${row.original.slug}`"
          :localized-texts="row.original.aliases"
        />
      </template>

      <template #status-cell="{ row }">
        <QuestionThemeStatusBadge
          :data-testid="`status-cell-badge-${row.original.slug}`"
          :status="row.original.status"
        />
      </template>

      <template #translations-cell="{ row }">
        <QuestionThemeTranslationCompletenessIndicator
          :data-testid="`translations-cell-indicator-${row.original.slug}`"
          :question-theme="row.original"
        />
      </template>

      <template #actions-cell="{ row }">
        <div class="flex justify-center">
          <QuestionThemesTableActions
            :data-testid="`actions-cell-${row.original.slug}`"
            :question-theme="row.original"
            @start-edit="onStartEditFromQuestionThemesTableActions"
          />
        </div>
      </template>

      <template #loading>
        <div class="animate-fade-slide-up-in">
          <LoadingSpinner :label="$t('questionThemes.fetching')"/>
        </div>
      </template>

      <template #empty>
        <TableEmptyState
          data-testid="question-themes-table-empty-state"
          :has-active-filter="hasActiveFilter"
        />
      </template>
    </UTable>
  </UCard>
</template>