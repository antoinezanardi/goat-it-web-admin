<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

import type { QuestionThemesTableEmits, QuestionThemesTableRow } from "~/components/domain/question-theme/QuestionThemesTable/question-themes-table.types";
import LocalizedText from "~/components/shared/core/localization/LocalizedText/LocalizedText.vue";

const emit = defineEmits<QuestionThemesTableEmits>();

const { t, locale: currentLocale } = useI18n();

const questionThemesStore = useQuestionThemesStore();
const { questionThemes } = storeToRefs(questionThemesStore);

const columns = computed<TableColumn<QuestionThemesTableRow>[]>(() => [
  createTableColumn("label", true),
  createTableColumn("slug", true),
  createTableColumn("description"),
  createTableColumn("aliases", true),
  createTableColumn("status", true),
]);

const rows = computed<QuestionThemesTableRow[]>(() => questionThemes.value.map(theme => ({
  id: theme.id,
  slug: theme.slug,
  label: theme.label,
  description: theme.description,
  aliases: theme.aliases[currentLocale.value],
  status: theme.status,
})));

function createTableColumn(accessorKey: keyof QuestionThemesTableRow, isCentered = false): TableColumn<QuestionThemesTableRow> {
  const tableColumn: TableColumn<QuestionThemesTableRow> = {
    accessorKey,
    header: t(`questionThemes.fields.${accessorKey}`),
  };
  if (isCentered) {
    tableColumn.meta = {
      class: {
        th: "text-center",
        td: "text-center",
      },
    };
  }
  return tableColumn;
}

function onStartCreateFromQuestionThemesTableHeader(): void {
  emit("startCreate");
}
</script>

<template>
  <UCard id="question-themes-table">
    <template #header>
      <QuestionThemesTableHeader
        data-testid="question-themes-table-header"
        @start-create="onStartCreateFromQuestionThemesTableHeader"
      />
    </template>

    <UTable
      :columns="columns"
      :data="rows"
      data-testid="question-themes-table-data"
    >
      <template #label-cell="{ row }">
        <LocalizedText
          data-testid="label-cell-text"
          :localized-text="row.original.label"
        />
      </template>

      <template #slug-cell="{ row }">
        <QuestionThemeSlugBadge
          data-testid="question-themes-table-slug-badge"
          :slug="row.original.slug"
        />
      </template>

      <template #description-cell="{ row }">
        <LocalizedText
          data-testid="description-cell-text"
          :localized-text="row.original.description"
        />
      </template>

      <template #aliases-cell="{ row }">
        <QuestionThemeAliasesList
          :aliases="row.original.aliases"
          data-testid="question-themes-table-aliases-list"
        />
      </template>

      <template #status-cell="{ row }">
        <QuestionThemeStatusBadge
          data-testid="question-themes-table-status-badge"
          :status="row.original.status"
        />
      </template>
    </UTable>
  </UCard>
</template>