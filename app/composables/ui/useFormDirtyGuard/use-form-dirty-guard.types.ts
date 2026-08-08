type UseFormDirtyGuardMessages = {
  titleKey: string;
  descriptionKey: string;
};

type UseFormDirtyGuardReturn = {
  onRequestClose: () => void;
  forceClose: () => void;
};

export type {
  UseFormDirtyGuardMessages,
  UseFormDirtyGuardReturn,
};