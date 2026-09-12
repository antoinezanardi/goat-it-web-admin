import { BUTTON_UI_CONFIG } from "@/config/button.config.ts";
import { INPUT_TAGS_UI_CONFIG } from "@/config/input-tags.config.ts";
import { INPUT_UI_CONFIG } from "@/config/input.config.ts";
import { PAGE_HEADER_UI_CONFIG } from "@/config/page-header.config.ts";
import { SELECT_MENU_UI_CONFIG } from "@/config/select-menu.config.ts";
import { SELECT_UI_CONFIG } from "@/config/select.config.ts";
import { SWITCH_UI_CONFIG } from "@/config/switch.config.ts";
import { TABLE_UI_CONFIG } from "@/config/table.config.ts";
import { TEXTAREA_UI_CONFIG } from "@/config/textarea.config.ts";

const APP_UI_CONFIG = {
  colors: {
    primary: "emerald",
    success: "emerald",
    neutral: "slate",
  },
  button: BUTTON_UI_CONFIG,
  input: INPUT_UI_CONFIG,
  textarea: TEXTAREA_UI_CONFIG,
  inputTags: INPUT_TAGS_UI_CONFIG,
  pageHeader: PAGE_HEADER_UI_CONFIG,
  selectMenu: SELECT_MENU_UI_CONFIG,
  select: SELECT_UI_CONFIG,
  switch: SWITCH_UI_CONFIG,
  table: TABLE_UI_CONFIG,
} as const;

export { APP_UI_CONFIG };