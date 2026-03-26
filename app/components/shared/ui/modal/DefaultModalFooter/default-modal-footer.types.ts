type DefaultModalFooterProperties = {
  primaryButtonLabel: string;
  primaryButtonIcon?: string;
  closeButtonLabel?: string;
  isPrimaryButtonDisabled?: boolean;
  isCloseButtonDisabled?: boolean;
};

type DefaultModalFooterEmits = {
  closeModal: [];
  primaryButtonClick: [];
};

export type {
  DefaultModalFooterProperties,
  DefaultModalFooterEmits,
};