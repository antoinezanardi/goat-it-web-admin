<script setup lang="ts">
import type { QuestionThemesTableFullyTranslatedFilterEmits, QuestionThemesTableFullyTranslatedFilterProps } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableHeader/QuestionThemesTableFullyTranslatedFilter/question-themes-table-fully-translated-filter.types";

defineProps<QuestionThemesTableFullyTranslatedFilterProps>();

const emit = defineEmits<QuestionThemesTableFullyTranslatedFilterEmits>();

const { t } = useI18n();

function onUpdateModelValue(value: boolean | undefined): void {
  emit("update:modelValue", value);
}
</script>

<template>
  <BooleanFilterSelect
    data-testid="question-themes-table-fully-translated-filter"
    :label="t('localization.fullyTranslated')"
    :model-value="modelValue"
    @update:model-value="onUpdateModelValue"
  />
</template>