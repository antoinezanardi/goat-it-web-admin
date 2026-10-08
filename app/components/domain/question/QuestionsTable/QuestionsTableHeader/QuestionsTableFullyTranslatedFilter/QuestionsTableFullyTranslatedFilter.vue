<script setup lang="ts">
import type { QuestionsTableFullyTranslatedFilterEmits, QuestionsTableFullyTranslatedFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableFullyTranslatedFilter/questions-table-fully-translated-filter.types";

defineProps<QuestionsTableFullyTranslatedFilterProps>();

const emit = defineEmits<QuestionsTableFullyTranslatedFilterEmits>();

const { t } = useI18n();

function onUpdateModelValue(value: boolean | undefined): void {
  emit("update:modelValue", value);
}
</script>

<template>
  <BooleanFilterSelect
    data-testid="questions-table-fully-translated-filter"
    :label="t('localization.fullyTranslated')"
    :model-value="modelValue"
    @update:model-value="onUpdateModelValue"
  />
</template>