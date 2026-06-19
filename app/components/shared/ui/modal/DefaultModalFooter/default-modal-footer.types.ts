type DefaultModalFooterProps = {
  primaryButtonLabel: string;
  primaryButtonIcon?: string;
  closeButtonLabel?: string;
  isPrimaryButtonDisabled?: boolean;
  isPrimaryButtonLoading?: boolean;
  isCloseButtonDisabled?: boolean;
};

type DefaultModalFooterEmits = {
  closeModal: [];
  primaryButtonClick: [];
};

export type {
  DefaultModalFooterProps,
  DefaultModalFooterEmits,
};