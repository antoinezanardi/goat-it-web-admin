import path from "node:path";

import type { InlineConfig } from "vitest/node";

const processCwd = process.cwd();

const VITEST_PROJECT_COMMON_INLINE_CONFIG: InlineConfig = {
  globals: true,
  mockReset: true,
  clearMocks: true,
  restoreMocks: true,
} as const;

const VITEST_PROJECT_COMMON_NUXT_INLINE_CONFIG: InlineConfig = {
  ...VITEST_PROJECT_COMMON_INLINE_CONFIG,
  environment: "nuxt",
  environmentOptions: {
    nuxt: {
      overrides: {
        runtimeConfig: {
          goatItApi: {
            baseUrl: "https://api.goat-it.com",
            adminKey: "test-admin-key",
          },
        },
      },
    },
  },
};

const VITEST_NUXT_PROJECT_SETUP_FILES = [
  path.resolve(processCwd, "tests/unit/setup/nuxt/vtu-config.nuxt.unit-setup.ts"),
  path.resolve(processCwd, "tests/unit/setup/nuxt/dates.nuxt.unit-setup.ts"),
  path.resolve(processCwd, "tests/unit/setup/nuxt/define-page-meta.nuxt.unit-setup.ts"),
  path.resolve(processCwd, "tests/unit/setup/nuxt/use-i18n.nuxt.unit-setup.ts"),
  path.resolve(processCwd, "tests/unit/setup/nuxt/use-router.nuxt.unit-setup.ts"),
  path.resolve(processCwd, "tests/unit/setup/nuxt/fetch.nuxt.unit-setup.ts"),
  path.resolve(processCwd, "tests/unit/setup/nuxt/use-toast.nuxt.unit-setup.ts"),
] as const;

const VITEST_STORES_PROJECT_INCLUDES = ["app/**/*.store.spec.ts"];

const VITEST_NODE_PROJECT_INCLUDES = [
  "app/**/*.repository.spec.ts",
  "app/**/*.mappers.spec.ts",
  "app/**/*.helpers.spec.ts",
  "server/**/*.mappers.spec.ts",
  "server/**/*.helpers.spec.ts",
  "shared/**/*.mappers.spec.ts",
  "shared/**/*.mappers.spec.ts",
];

export {
  VITEST_PROJECT_COMMON_INLINE_CONFIG,
  VITEST_PROJECT_COMMON_NUXT_INLINE_CONFIG,
  VITEST_NUXT_PROJECT_SETUP_FILES,
  VITEST_STORES_PROJECT_INCLUDES,
  VITEST_NODE_PROJECT_INCLUDES,
};