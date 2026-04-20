type ComponentVm = {
  // oxlint-disable-next-line id-length
  $: {
    refs: Record<string, Element | ComponentPublicInstance | null>;
  };
  $attrs: Record<string, unknown>;
  $emit: (event: string, ...arguments_: unknown[]) => void;
};

export type {
  ComponentVm,
};