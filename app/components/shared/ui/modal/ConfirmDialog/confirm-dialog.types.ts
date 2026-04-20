type ConfirmDialogProperties = {
  icon: string;
  title: string;
  description: string;
  primaryButtonLabel?: string;
  closeButtonLabel?: string;
};

type ConfirmDialogEmits = {
  close: [value: boolean];
};

export type {
  ConfirmDialogProperties,
  ConfirmDialogEmits,
};