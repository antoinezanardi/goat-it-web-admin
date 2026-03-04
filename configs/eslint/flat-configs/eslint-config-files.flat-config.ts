import type { Linter } from "eslint";

const ESLINT_CONFIG_FILES_FLAT_CONFIG: Linter.Config = {
  name: "config-files",
  files: [
    "eslint.config.ts",
    "configs/**/*.{js,mjs,ts}",
  ],
  rules: {
    "@typescript-eslint/no-restricted-imports": "off",
    "@typescript-eslint/no-unsafe-type-assertion": "off",
    // "import/no-default-export": "off",
    // "import/no-internal-modules": "off",
    // "import/no-anonymous-default-export": "off",
  },
} as const;

export { ESLINT_CONFIG_FILES_FLAT_CONFIG };