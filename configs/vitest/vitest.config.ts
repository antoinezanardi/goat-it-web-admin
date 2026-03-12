import path from "node:path";

import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

const processCwd = process.cwd();

export default defineConfig({
  test: {
    projects: [
      await defineVitestProject({
        test: {
          name: "nuxt",
          globals: true,
          mockReset: true,
          clearMocks: true,
          restoreMocks: true,
          include: [
            "app/App.spec.ts",
            "app/pages/**/*.spec.ts",
            "app/components/**/*.spec.ts",
            "app/composables/**/*.spec.ts",
            "app/layouts/**/*.spec.ts",
            "server/**/*.spec.ts",
            "shared/**/*.spec.ts",
          ],
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
          setupFiles: [
            path.resolve(processCwd, "tests/unit/setup/nuxt/vtu-config.nuxt.unit-setup.ts"),
            path.resolve(processCwd, "tests/unit/setup/nuxt/dates.nuxt.unit-setup.ts"),
            path.resolve(processCwd, "tests/unit/setup/nuxt/define-page-meta.nuxt.unit-setup.ts"),
            path.resolve(processCwd, "tests/unit/setup/nuxt/use-i18n.nuxt.unit-setup.ts"),
            path.resolve(processCwd, "tests/unit/setup/nuxt/use-router.nuxt.unit-setup.ts"),
            path.resolve(processCwd, "tests/unit/setup/nuxt/fetch.nuxt.unit-setup.ts"),
            path.resolve(processCwd, "tests/unit/setup/nuxt/use-toast.nuxt.unit-setup.ts"),
          ],
        },
      }),
    ],
    onConsoleLog: (log: string): boolean => !log.startsWith("<Suspense> is an experimental feature"),
    watch: false,
    coverage: {
      provider: "v8",
      include: [
        "app/**/*.ts",
        "app/**/*.vue",
        "server/**/*.ts",
      ],
      exclude: [
        "**/*.constants.ts",
        "**/*.enums.ts",
        "**/*.types.ts",
        "**/*.d.ts",
        "**/*.config.ts",
        "**/*.spec.ts",
        "server/api/**/*.{get,post,put,delete}.ts",
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