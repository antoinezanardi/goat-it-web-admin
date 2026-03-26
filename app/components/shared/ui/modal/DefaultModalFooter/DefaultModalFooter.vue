<script lang="ts" setup>
import type { DefaultModalFooterEmits, DefaultModalFooterProperties } from "~/components/shared/ui/modal/DefaultModalFooter/default-modal-footer.types";

const props = defineProps<DefaultModalFooterProperties>();

const emit = defineEmits<DefaultModalFooterEmits>();

const { t } = useI18n();

const closeButtonDisplayedLabel = computed<string>(() => {
  if (props.closeButtonLabel) {
    return props.closeButtonLabel;
  }
  return t("common.close");
});

function onClickFromCloseButton(): void {
  emit("closeModal");
}

function onClickFromPrimaryButton(): void {
  emit("primaryButtonClick");
}
</script>

<template>
  <div class="default-modal-footer flex gap-2 justify-end w-full">
    <UButton
      color="neutral"
      :disabled="isCloseButtonDisabled"
      icon="i-lucide-x"
      :label="closeButtonDisplayedLabel"
      @click="onClickFromCloseButton"
    />

    <UButton
      :disabled="isPrimaryButtonDisabled"
      :icon="primaryButtonIcon"
      :label="primaryButtonLabel"
      :loading="isPrimaryButtonLoading"
      @click="onClickFromPrimaryButton"
    />
  </div>
</template>