<script setup lang="ts">
const color = defineModel<string>("color");

const { t } = useI18n();

const chipColor = computed<string>(() => color.value ?? "#000000");

const chipStyle = computed<Record<string, string>>(() => ({ backgroundColor: chipColor.value }));

const buttonLabel = computed<string>(() => color.value ?? t("form.chooseColor"));
</script>

<template>
  <UPopover>
    <UButton
      class="w-full"
      color="neutral"
      :label="buttonLabel"
      variant="outline"
    >
      <template #leading>
        <span
          class="rounded-full size-3"
          :style="chipStyle"
        />
      </template>
    </UButton>

    <template #content>
      <UColorPicker
        v-model="color"
        format="hex"
      />
    </template>
  </UPopover>
</template>