<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

import type { QuestionThemesTableRow } from "~/components/domain/question-theme/QuestionThemesTable/question-themes-table.types";

const { t, locale: currentLocale } = useI18n();

const questionThemesStore = useQuestionThemesStore();
const { questionThemes } = storeToRefs(questionThemesStore);

const columns = computed<TableColumn<QuestionThemesTableRow>[]>(() => [
  {
    accessorKey: "label",
    header: t("questionThemes.fields.label"),
  },
  {
    accessorKey: "slug",
    header: t("questionThemes.fields.slug"),
  },
  {
    accessorKey: "description",
    header: t("questionThemes.fields.description"),
  },
  {
    accessorKey: "aliases",
    header: t("questionThemes.fields.aliases"),
  },
  {
    accessorKey: "status",
    header: t("questionThemes.fields.status"),
  },
]);

const rows = computed<QuestionThemesTableRow[]>(() => questionThemes.value.map(theme => ({
  id: theme.id,
  slug: theme.slug,
  label: theme.label[currentLocale.value],
  description: theme.description[currentLocale.value],
  aliases: theme.aliases[currentLocale.value],
  status: theme.status,
})));
</script>

<template>
  <div id="question-themes-table">
    <UTable
      :columns="columns"
      :data="rows"
    >
      <template #slug-cell="{ row }">
        <QuestionThemeSlugBadge :slug="row.original.slug"/>
      </template>

      <template #aliases-cell="{ row }">
        <QuestionThemeAliasesList :aliases="row.original.aliases"/>
      </template>

      <template #status-cell="{ row }">
        <QuestionThemeStatusBadge :status="row.original.status"/>
      </template>
    </UTable>
  </div>
</template>