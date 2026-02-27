import * as path from "node:path";
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
          ],
          environment: "nuxt",
          setupFiles: [
            path.resolve(processCwd, "tests/unit/setup/nuxt/vtu-config.nuxt.unit-setup.ts"),
            path.resolve(processCwd, "tests/unit/setup/nuxt/dates.nuxt.unit-setup.ts"),
            path.resolve(processCwd, "tests/unit/setup/nuxt/definePageMeta.nuxt.unit-setup.ts"),
            path.resolve(processCwd, "tests/unit/setup/nuxt/useI18n.nuxt.unit-setup.ts"),
            path.resolve(processCwd, "tests/unit/setup/nuxt/useRouter.nuxt.unit-setup.ts"),
          ],
        },
      }),
    ],
    onConsoleLog: (log: string): boolean => !log.startsWith("<Suspense> is an experimental feature"),
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