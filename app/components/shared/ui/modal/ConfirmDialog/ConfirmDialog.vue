<script setup lang="ts">
import type { ConfirmDialogEmits, ConfirmDialogProperties } from "~/components/shared/ui/modal/ConfirmDialog/confirm-dialog.types";

defineProps<ConfirmDialogProperties>();

const emit = defineEmits<ConfirmDialogEmits>();

const { t } = useI18n();

const open = ref<boolean>(true);

function onCloseModalFromFooter(): void {
  open.value = false;
  emit("close", false);
}

function onPrimaryButtonClickFromFooter(): void {
  open.value = false;
  emit("close", true);
}
</script>

<template>
  <UModal
    v-model:open="open"
    data-testid="confirm-dialog-modal"
  >
    <template #title>
      <DefaultModalTitle
        data-testid="confirm-dialog-title"
        :icon="icon"
        :title="title"
      />
    </template>

    <template #body>
      <p data-testid="confirm-dialog-description">
        {{ description }}
      </p>
    </template>

    <template #footer>
      <DefaultModalFooter
        :close-button-label="closeButtonLabel ?? t('common.cancel')"
        data-testid="confirm-dialog-footer"
        :primary-button-label="primaryButtonLabel ?? t('common.confirm')"
        @close-modal="onCloseModalFromFooter"
        @primary-button-click="onPrimaryButtonClickFromFooter"
      />
    </template>
  </UModal>
</template>