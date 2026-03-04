import type { Linter } from "eslint";

const ESLINT_PAGES_FLAT_CONFIG: Linter.Config = {
  name: "goat-it/pages",
  files: [
    "app/pages/**/*.vue",
  ],
  rules: {
    "import/unambiguous": "off",
  },
} as const;

export { ESLINT_PAGES_FLAT_CONFIG };