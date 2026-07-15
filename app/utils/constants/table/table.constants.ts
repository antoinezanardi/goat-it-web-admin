const TABLE_CARD_UI = {
  header: "flex-none",
  body: "flex-1 min-h-0 flex flex-col p-0 sm:p-0",
} as const;

const TABLE_UI = {
  tr: "data-[expanded=true]:bg-elevated/50 animate-fade-slide-up-in",
} as const;

export {
  TABLE_CARD_UI,
  TABLE_UI,
};