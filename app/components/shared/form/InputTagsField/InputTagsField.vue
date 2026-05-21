<script setup lang="ts">
import type { InputTagsFieldEmits, InputTagsFieldProperties, InputTagsFieldSlots } from "~/components/shared/form/InputTagsField/input-tags-field.types";

const props = withDefaults(defineProps<InputTagsFieldProperties>(), {
  modelValue: () => [],
  placeholder: undefined,
  required: false,
  error: undefined,
  duplicate: false,
  addOnBlur: true,
  addOnTab: true,
  ui: undefined,
});

const emit = defineEmits<InputTagsFieldEmits>();

defineSlots<InputTagsFieldSlots>();

const { t } = useI18n();

const appConfig = useAppConfig();

const closeIcon = computed<string>(() => appConfig.ui.icons.close);

function onUpdateModelValue(value: string[]): void {
  emit("update:modelValue", value);
}
</script>

<template>
  <UFormField
    :error="props.error"
    :label="props.label"
    :name="props.name"
    :required="props.required"
  >
    <template #description>
      <span class="flex gap-1 items-center text-muted text-xs">
        {{ t('common.form.press') }}
        <UKbd :value="t('common.form.enterKey')"/>
        {{ props.addHintText }}
      </span>
    </template>

    <UInputTags
      :add-on-blur="props.addOnBlur"
      :add-on-tab="props.addOnTab"
      :duplicate="props.duplicate"
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      :ui="props.ui"
      @update:model-value="onUpdateModelValue"
    >
      <template #item-text="slotProps">
        <slot
          name="itemText"
          v-bind="slotProps"
        />
      </template>

      <template #item-delete="{ item }">
        <UTooltip :text="props.removeTooltipText(item)">
          <span :data-testid="`remove-tag-${item}`">
            <UIcon
              class="cursor-pointer size-3.5"
              :name="closeIcon"
            />
          </span>
        </UTooltip>
      </template>
    </UInputTags>
  </UFormField>
</template>