<script setup lang="ts">
import { getThemeLocalizedLabel } from "~/composables/domain/question-theme/helpers/question-theme.helpers";
import type { TableFilterSelectItem } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";
import type { QuestionsTableThemeFilterEmits, QuestionsTableThemeFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableThemeFilter/questions-table-theme-filter.types";

defineProps<QuestionsTableThemeFilterProps>();
const emit = defineEmits<QuestionsTableThemeFilterEmits>();

const { t, locale } = useI18n();
const questionThemesStore = useQuestionThemesStore();
const { questionThemes, isFetchingQuestionThemes } = storeToRefs(questionThemesStore);

const activeThemes = computed(() => questionThemes.value.filter(theme => theme.status === "active"));

const themeItems = computed<TableFilterSelectItem<string>[]>(() => activeThemes.value.map(theme => ({
  label: getThemeLocalizedLabel(theme, locale.value, t("questions.missingThemeTranslation")),
  value: theme.id,
})));

function onUpdateModelValue(value: string | string[] | undefined): void {
  emit("update:modelValue", value as string[]);
}
</script>

<template>
  <TableFilterSelect
    data-testid="questions-table-theme-filter"
    :items="themeItems"
    :label="t('questions.fields.themes')"
    :loading="isFetchingQuestionThemes"
    :model-value="modelValue"
    multiple
    @update:model-value="onUpdateModelValue"
  />
</template>