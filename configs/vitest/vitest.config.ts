import * as path from "node:path";
import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

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
          ],
          environment: "nuxt",
          setupFiles: [
            path.resolve(process.cwd(), "tests/unit/setup/nuxt/vue-test-utils.nuxt.unit-setup.ts"),
            path.resolve(process.cwd(), "tests/unit/setup/nuxt/dates.nuxt.unit-setup.ts"),
            path.resolve(process.cwd(), "tests/unit/setup/nuxt/definePageMeta.nuxt.unit-setup.ts"),
            path.resolve(process.cwd(), "tests/unit/setup/nuxt/useI18n.nuxt.unit-setup.ts"),
          ],
        },
      }),
    ],
    coverage: {
      provider: "v8",
      include: [
        "app/**/*.ts",
        "app/**/*.vue",
      ],
      exclude: [
        "app/**/*.constants.ts",
        "app/**/*.enums.ts",
        "app/**/*.types.ts",
        "app/**/*.d.ts",
        "app/**/*.config.ts",
        "app/**/*.spec.ts",
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