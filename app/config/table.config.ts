const TABLE_UI_CONFIG = {
  slots: {
    tr: "data-[expanded=true]:bg-elevated/50 animate-fade-slide-up-in",
    td: "p-4 text-sm text-default whitespace-nowrap [&:has([role=checkbox])]:pe-0",
  },
} as const;

export { TABLE_UI_CONFIG };