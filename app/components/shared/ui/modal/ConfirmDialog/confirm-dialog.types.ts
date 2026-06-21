type ConfirmDialogProps = {
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
  ConfirmDialogProps,
  ConfirmDialogEmits,
};