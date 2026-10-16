<script setup lang="ts">
import type { QuestionsTableAdultContentFilterEmits, QuestionsTableAdultContentFilterProps } from "~/components/domain/question/QuestionsTable/QuestionsTableHeader/QuestionsTableAdultContentFilter/questions-table-adult-content-filter.types";

defineProps<QuestionsTableAdultContentFilterProps>();

const emit = defineEmits<QuestionsTableAdultContentFilterEmits>();

const { t } = useI18n();

function onUpdateModelValue(value: boolean | undefined): void {
  emit("update:modelValue", value);
}
</script>

<template>
  <BooleanFilterSelect
    data-testid="questions-table-adult-content-filter"
    :label="t('questions.fields.isAdultContent')"
    :model-value="modelValue"
    @update:model-value="onUpdateModelValue"
  />
</template>