import type { Ref } from "vue";

type UseFormDirtyGuardMessages = {
  titleKey: string;
  descriptionKey: string;
};

type UseFormDirtyGuardReturn = {
  onRequestClose: () => void;
  forceClose: () => void;
  isGuardDialogOpen: Ref<boolean>;
};

export type {
  UseFormDirtyGuardMessages,
  UseFormDirtyGuardReturn,
};