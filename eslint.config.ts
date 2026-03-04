import type { Linter } from "eslint";

import { withNuxt } from "./.nuxt/eslint.config.mjs";
import { ESLINT_GLOBAL_FLAT_CONFIG } from "./configs/eslint/flat-configs/eslint-global.flat-config";
import { ESLINT_TYPESCRIPT_FLAT_CONFIG } from "./configs/eslint/flat-configs/eslint-typescript.flat-config";
import { ESLINT_SPEC_FLAT_CONFIG } from "./configs/eslint/flat-configs/eslint-unit-tests.config";
import { ESLINT_CONFIG_FILES_FLAT_CONFIG } from "./configs/eslint/flat-configs/eslint-config-files.flat-config";
import { ESLINT_VUE_FLAT_CONFIG } from "./configs/eslint/flat-configs/eslint-vue.flat-config";
import { ESLINT_IMPORT_FLAT_CONFIG } from "./configs/eslint/flat-configs/eslint-import.flat-config";
import { ESLINT_PAGES_FLAT_CONFIG } from "./configs/eslint/flat-configs/eslint-pages.flat-config";
import { ESLINT_LAYOUTS_FLAT_CONFIG } from "./configs/eslint/flat-configs/eslint-layouts.flat-config";
import { ESLINT_UNICORN_FLAT_CONFIG } from "./configs/eslint/flat-configs/eslint-unicorn.flat-config";

export default withNuxt(
  ESLINT_UNICORN_FLAT_CONFIG,
  ESLINT_SPEC_FLAT_CONFIG,
  ESLINT_PAGES_FLAT_CONFIG,
  ESLINT_LAYOUTS_FLAT_CONFIG,
  ESLINT_CONFIG_FILES_FLAT_CONFIG,
)
  .override("nuxt/javascript", {
    rules: ESLINT_GLOBAL_FLAT_CONFIG.rules,
  })
  .override("nuxt/typescript/rules", {
    rules: ESLINT_TYPESCRIPT_FLAT_CONFIG.rules,
  })
  .override("nuxt/vue/rules", {
    rules: ESLINT_VUE_FLAT_CONFIG.rules,
  }).override("nuxt/import/rules", {
    rules: ESLINT_IMPORT_FLAT_CONFIG.rules,
  }) as Linter.Config;

