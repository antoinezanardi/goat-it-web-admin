<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

import type { QuestionThemesTableEmits, QuestionThemesTableRow } from "~/components/domain/question-theme/QuestionThemesTable/question-themes-table.types";
import LocalizedText from "~/components/shared/core/localization/LocalizedText/LocalizedText.vue";
import { createTableColumn } from "~/utils/helpers/table/table.helpers";

const emit = defineEmits<QuestionThemesTableEmits>();

const { t, locale: currentLocale } = useI18n();

const questionThemesStore = useQuestionThemesStore();
const { questionThemes } = storeToRefs(questionThemesStore);

const columns = computed<TableColumn<QuestionThemesTableRow>[]>(() => [
  createTableColumn<QuestionThemesTableRow>({ accessorKey: "icon", isCentered: true }),
  createTableColumn<QuestionThemesTableRow>({ accessorKey: "label", header: t("questionThemes.fields.label"), isCentered: true }),
  createTableColumn<QuestionThemesTableRow>({ accessorKey: "slug", header: t("questionThemes.fields.slug"), isCentered: true }),
  createTableColumn<QuestionThemesTableRow>({ accessorKey: "description", header: t("questionThemes.fields.description") }),
  createTableColumn<QuestionThemesTableRow>({ accessorKey: "aliases", header: t("questionThemes.fields.aliases"), isCentered: true }),
  createTableColumn<QuestionThemesTableRow>({ accessorKey: "status", header: t("questionThemes.fields.status"), isCentered: true }),
  createTableColumn<QuestionThemesTableRow>({ accessorKey: "actions", isCentered: true }),
]);

const rows = computed<QuestionThemesTableRow[]>(() => questionThemes.value.map(theme => ({
  id: theme.id,
  slug: theme.slug,
  color: theme.color,
  label: theme.label,
  description: theme.description,
  aliases: theme.aliases[currentLocale.value],
  status: theme.status,
})));

const fuseKeys = computed<string[]>(() => [
  "slug",
  `label.${currentLocale.value}`,
  `description.${currentLocale.value}`,
  "aliases",
  "status",
]);

const { searchTerm, globalFilter, globalFilterFn, hasActiveFilter } = useTableGlobalFilter<QuestionThemesTableRow>({
  data: rows,
  keys: fuseKeys,
});

const globalFilterOptions = computed(() => ({ globalFilterFn }));

function onStartCreateFromQuestionThemesTableHeader(): void {
  emit("startCreate");
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
        data-testid="question-themes-table-header"
        @start-create="onStartCreateFromQuestionThemesTableHeader"
      />
    </template>

    <UTable
      v-model:global-filter="globalFilter"
      :columns="columns"
      :data="rows"
      data-testid="question-themes-table-data"
      :global-filter-options="globalFilterOptions"
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
        <LocalizedText
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
        <LocalizedText
          :data-testid="`description-cell-text-${row.original.slug}`"
          :localized-text="row.original.description"
        />
      </template>

      <template #aliases-cell="{ row }">
        <QuestionThemeAliasesList
          :aliases="row.original.aliases"
          :data-testid="`aliases-cell-list-${row.original.slug}`"
        />
      </template>

      <template #status-cell="{ row }">
        <QuestionThemeStatusBadge
          :data-testid="`status-cell-badge-${row.original.slug}`"
          :status="row.original.status"
        />
      </template>

      <template #actions-cell="{ row }">
        <QuestionThemesTableActions
          :data-testid="`actions-cell-${row.original.slug}`"
          :question-theme="row.original"
          @start-edit="onStartEditFromQuestionThemesTableActions"
        />
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