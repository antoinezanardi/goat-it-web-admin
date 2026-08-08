import type { Ref } from "vue";
import { nextTick } from "vue";

import type { UseFormDirtyGuardMessages, UseFormDirtyGuardReturn } from "~/composables/ui/useFormDirtyGuard/use-form-dirty-guard.types";

async function showConfirmDialog(titleKey: string, descriptionKey: string): Promise<boolean> {
  const overlay = useOverlay();
  const ConfirmDialog = await import("~/components/shared/ui/modal/ConfirmDialog/ConfirmDialog.vue").then(module => module.default);
  const dialog = overlay.create(ConfirmDialog, {});
  const { result } = dialog.open({
    icon: "i-lucide-triangle-alert",
    title: titleKey,
    description: descriptionKey,
    dismissible: false,
    close: false,
  });

  return result;
}

function useFormDirtyGuard(
  open: Ref<boolean>,
  isDirty: Ref<boolean>,
  messages: UseFormDirtyGuardMessages,
): UseFormDirtyGuardReturn {
  const { t } = useI18n();
  const router = useRouter();

  const formOpen = open;
  const bypassGuard = ref<boolean>(false);

  watch(formOpen, async(nextValue, previousValue) => {
    if (previousValue && !nextValue && isDirty.value && !bypassGuard.value) {
      formOpen.value = true;
      const isConfirmed = await showConfirmDialog(t(messages.titleKey), t(messages.descriptionKey));
      if (isConfirmed) {
        bypassGuard.value = true;
        formOpen.value = false;
        await nextTick();
      }
      bypassGuard.value = false;
    }
  });

  onBeforeRouteLeave(async to => {
    if (!formOpen.value || !isDirty.value) {
      return;
    }

    const isConfirmed = await showConfirmDialog(t(messages.titleKey), t(messages.descriptionKey));
    if (isConfirmed) {
      bypassGuard.value = true;
      formOpen.value = false;
      await router.push(to.fullPath);
    }
    return false;
  });

  function onRequestClose(): void {
    formOpen.value = false;
  }

  function forceClose(): void {
    bypassGuard.value = true;
    formOpen.value = false;
    void nextTick(() => {
      bypassGuard.value = false;
    });
  }
  return {
    onRequestClose,
    forceClose,
  };
}

export { useFormDirtyGuard };