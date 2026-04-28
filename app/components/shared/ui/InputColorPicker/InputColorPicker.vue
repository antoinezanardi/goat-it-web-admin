<script setup lang="ts">
import { INPUT_COLOR_PICKER_DEFAULT_COLOR, INPUT_COLOR_PICKER_HEX_FILTER_REGEX, INPUT_COLOR_PICKER_HEX_MAX_LENGTH } from "./input-color-picker.constants";

const color = defineModel<string>("color");

const { t } = useI18n();

const hexText = ref<string>("");
const isFocused = ref<boolean>(false);

const isColorPrefixShown = computed<boolean>(() => isFocused.value || hexText.value.length > 0);

const chipColor = computed<string>(() => color.value ?? INPUT_COLOR_PICKER_DEFAULT_COLOR);

const chipStyle = computed<Record<string, string>>(() => ({ backgroundColor: chipColor.value }));

const inputPlaceholder = computed<string>(() => (isColorPrefixShown.value ? "" : t("form.chooseColor")));

function onInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  const filtered = input.value.replace(INPUT_COLOR_PICKER_HEX_FILTER_REGEX, "").slice(0, INPUT_COLOR_PICKER_HEX_MAX_LENGTH);
  hexText.value = filtered;
  input.value = filtered;

  if (filtered.length === INPUT_COLOR_PICKER_HEX_MAX_LENGTH) {
    color.value = `#${filtered}`;
  } else if (filtered.length === 0) {
    color.value = undefined;
  }
}

function onFocus(): void {
  isFocused.value = true;
}

function onBlur(): void {
  isFocused.value = false;
}

watch(color, colorValue => {
  if (colorValue) {
    const hex = colorValue.startsWith("#") ? colorValue.slice(1) : colorValue;
    if (hex !== hexText.value) {
      hexText.value = hex;
    }
  } else {
    hexText.value = "";
  }
}, { immediate: true });
</script>

<template>
  <UInput
    class="w-full"
    data-testid="input-color-picker-input"
    :model-value="hexText"
    :placeholder="inputPlaceholder"
    @blur="onBlur"
    @focus="onFocus"
    @input="onInput"
  >
    <template #leading>
      <span
        class="mr-1 rounded-full size-3"
        data-testid="input-color-picker-chip"
        :style="chipStyle"
      />

      <span
        v-if="isColorPrefixShown"
        class="font-medium text-muted"
        data-testid="input-color-picker-hash-prefix"
      >
        #
      </span>
    </template>

    <template #trailing>
      <UPopover>
        <UButton
          :aria-label="t('form.chooseColor')"
          color="neutral"
          data-testid="input-color-picker-palette-icon"
          icon="i-lucide-palette"
          size="xs"
          variant="link"
        />

        <template #content>
          <UColorPicker
            v-model="color"
            format="hex"
          />
        </template>
      </UPopover>
    </template>
  </UInput>
</template>