import path from "node:path";

import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

import { VITEST_COMPOSABLES_MOCK_SETUP_FILES, VITEST_COMPOSABLES_PROJECT_INCLUDES, VITEST_IGNORED_STARTING_BY_LOGS, VITEST_NODE_PROJECT_INCLUDES, VITEST_NUXT_PROJECT_SETUP_FILES, VITEST_PROJECT_COMMON_INLINE_CONFIG, VITEST_PROJECT_COMMON_NUXT_INLINE_CONFIG, VITEST_REPOSITORIES_MOCK_SETUP_FILES, VITEST_REPOSITORIES_PROJECT_INCLUDES, VITEST_STORES_PROJECT_INCLUDES } from "./vitest.config.constants";
import { VitestProjectNames } from "./vitest.config.enums";

const processCwd = process.cwd();

export default defineConfig({
  test: {
    projects: [
      await defineVitestProject({
        test: {
          ...VITEST_PROJECT_COMMON_NUXT_INLINE_CONFIG,
          name: VitestProjectNames.NUXT,
          include: [
            "app/**/*.spec.ts",
            "server/**/*.spec.ts",
            "shared/**/*.spec.ts",
          ],
          exclude: [
            ...VITEST_NODE_PROJECT_INCLUDES,
            ...VITEST_STORES_PROJECT_INCLUDES,
            ...VITEST_COMPOSABLES_PROJECT_INCLUDES,
            ...VITEST_REPOSITORIES_PROJECT_INCLUDES,
          ],
          setupFiles: [
            ...VITEST_NUXT_PROJECT_SETUP_FILES,
            ...VITEST_COMPOSABLES_MOCK_SETUP_FILES,
            ...VITEST_REPOSITORIES_MOCK_SETUP_FILES,
          ],
        },
      }),
      await defineVitestProject({
        test: {
          ...VITEST_PROJECT_COMMON_NUXT_INLINE_CONFIG,
          name: VitestProjectNames.COMPOSABLES,
          include: [...VITEST_COMPOSABLES_PROJECT_INCLUDES],
          setupFiles: [
            ...VITEST_NUXT_PROJECT_SETUP_FILES,
            ...VITEST_REPOSITORIES_MOCK_SETUP_FILES,
          ],
        },
      }),
      await defineVitestProject({
        test: {
          ...VITEST_PROJECT_COMMON_NUXT_INLINE_CONFIG,
          name: VitestProjectNames.STORES,
          include: [...VITEST_STORES_PROJECT_INCLUDES],
          setupFiles: [
            ...VITEST_NUXT_PROJECT_SETUP_FILES,
            ...VITEST_COMPOSABLES_MOCK_SETUP_FILES,
            ...VITEST_REPOSITORIES_MOCK_SETUP_FILES,
            path.resolve(processCwd, "tests/unit/setup/nuxt/stores.nuxt.unit-setup.ts"),
          ],
        },
      }),
      await defineVitestProject({
        test: {
          ...VITEST_PROJECT_COMMON_INLINE_CONFIG,
          name: VitestProjectNames.REPOSITORIES,
          include: [...VITEST_REPOSITORIES_PROJECT_INCLUDES],
          setupFiles: [path.resolve(processCwd, "tests/unit/setup/nuxt/dates.nuxt.unit-setup.ts")],
        },
      }),
      await defineVitestProject({
        test: {
          ...VITEST_PROJECT_COMMON_INLINE_CONFIG,
          name: VitestProjectNames.NODE,
          include: [...VITEST_NODE_PROJECT_INCLUDES],
          setupFiles: [path.resolve(processCwd, "tests/unit/setup/nuxt/dates.nuxt.unit-setup.ts")],
        },
      }),
    ],
    onConsoleLog: (log: string): boolean => VITEST_IGNORED_STARTING_BY_LOGS.every(ignoredLogStart => log.startsWith(ignoredLogStart)),
    watch: false,
    coverage: {
      provider: "v8",
      include: [
        "app/**/*.ts",
        "app/**/*.vue",
        "server/**/*.ts",
        "shared/**/*.ts",
      ],
      exclude: [
        "**/*.constants.ts",
        "**/*.enums.ts",
        "**/*.types.ts",
        "**/*.d.ts",
        "**/*.config.ts",
        "**/*.spec.ts",
        "server/api/**/*.{get,post,put,patch,delete}.ts",
      ],
      reportsDirectory: "tests/unit/coverage",
      reporter: [
        "clover",
        "json",
        "lcov",
        "text",
        "text-summary",
        "html",
      ],
      thresholds: {
        100: true,
      },
    },
  },
});