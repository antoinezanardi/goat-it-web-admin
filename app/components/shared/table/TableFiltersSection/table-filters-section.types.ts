type TableFiltersSectionProps = {
  activeFilterCount?: number;
};

type TableFiltersSectionEmits = {
  clear: [];
};

type TableFiltersSectionSlots = {
  default: () => unknown;
  toolbarEnd: () => unknown;
};

export type {
  TableFiltersSectionProps,
  TableFiltersSectionEmits,
  TableFiltersSectionSlots,
};