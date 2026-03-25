type DefaultModalFooterProperties = {
  primaryButtonLabel: string;
  primaryButtonIcon?: string;
  closeButtonLabel?: string;
  isPrimaryButtonDisabled?: boolean;
};

type DefaultModalFooterEmits = {
  closeModal: [];
  primaryButtonClick: [];
};

export type {
  DefaultModalFooterProperties,
  DefaultModalFooterEmits,
};