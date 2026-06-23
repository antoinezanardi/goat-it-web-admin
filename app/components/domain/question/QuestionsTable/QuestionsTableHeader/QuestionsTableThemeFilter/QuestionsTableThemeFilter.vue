<script setup lang="ts">
import { getThemeIcon, getThemeLocalizedLabel } from "~/composables/domain/question-theme/helpers/question-theme.helpers";
import type { TableFilterSelectItem } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";
import type { QuestionsTableThemeFilterEmits, QuestionsTableThemeFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableThemeFilter/questions-table-theme-filter.types";

defineProps<QuestionsTableThemeFilterProps>();
const emit = defineEmits<QuestionsTableThemeFilterEmits>();

const { t, locale } = useI18n();
const questionThemesStore = useQuestionThemesStore();
const { questionThemes, isFetchingQuestionThemes } = storeToRefs(questionThemesStore);

const activeThemes = computed<QuestionTheme[]>(() => questionThemes.value.filter(theme => theme.status === "active"));

const themeItems = computed<TableFilterSelectItem[]>(() => activeThemes.value.map(theme => ({
  label: getThemeLocalizedLabel(theme, locale.value, t("questions.missingThemeTranslation")),
  value: theme.id,
  icon: getThemeIcon(theme.slug),
})));

function onUpdateModelValue(value: string | string[] | undefined): void {
  if (Array.isArray(value)) {
    emit("update:modelValue", value);
  } else if (typeof value === "string") {
    emit("update:modelValue", [value]);
  } else {
    emit("update:modelValue", []);
  }
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