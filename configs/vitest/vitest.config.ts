import * as os from "node:os";
import * as path from "node:path";
import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig({
  test: {
    projects: [
      await defineVitestProject({
        test: {
          name: "nuxt",
          execArgv: [
            "--localstorage-file",
            path.resolve(os.tmpdir(), `vitest-${process.pid}.localstorage`),
          ],
          globals: true,
          include: [
            "app/App.spec.ts",
            "app/pages/**/*.spec.vue",
            "app/components/**/*.spec.vue",
            "app/composables/**/*.spec.ts",
          ],
          environment: "nuxt",
          setupFiles: [path.resolve(process.cwd(), "tests/unit/setup/unit-setup.ts")],
        },
      }),
    ],
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      include: [
        "app/**/*.ts",
        "app/**/*.vue",
      ],
      exclude: [
        "app/**/*.constants.ts",
        "app/**/*.types.ts",
        "app/**/*.d.ts",
        "app/**/*.config.ts",
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