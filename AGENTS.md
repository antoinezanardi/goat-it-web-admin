AGENTS

This file is a concise, actionable guide for automated agents working in this repository.
It explains how to build, lint and run tests (including running a single test), plus
the coding conventions agents must follow (imports, formatting, types, naming, error
handling, Nuxt conventions, and other repo-specific rules).

1) Build / Run / Lint / Test commands
- Package manager: `pnpm@10.32.1` (see `package.json` -> `packageManager`).
- Node requirement: >=25.8.0 (see `package.json` -> `engines.node`).

- Dev server: `pnpm run dev`
  - Equivalent script: `nuxt dev --dotenv envs/.env.development --port 4000`

- Build: `pnpm run build` (runs `nuxt build`)
- Preview production build: `pnpm run preview` or `pnpm run start:prod`

- Linting (always run both):
  - Full lint: `pnpm run lint` (oxlint first, then eslint)
  - Full lint + auto-fix: `pnpm run lint:fix`
  - ESLint only: `pnpm run lint:eslint`
  - ESLint fix: `pnpm run lint:eslint:fix`
  - Oxlint only: `pnpm run lint:oxlint`
  - Oxlint fix: `pnpm run lint:oxlint:fix`

- Typecheck: `pnpm run typecheck` (runs `nuxt typecheck` / `vue-tsc`)

- Tests:
  - Unit tests (full): `pnpm run test:unit`
  - Unit tests (watch): `pnpm run test:unit:watch`
  - Unit tests with coverage: `pnpm run test:unit:cov`
  - Mutation tests (Stryker): `pnpm run test:mutation`
  - Force incremental mutation run: `pnpm run test:mutation:force`

Running a single test or test file:
- The project uses Vitest with config at `configs/vitest/vitest.config.ts`.
- `NODE_OPTIONS='--no-webstorage'` is required; use the npm script wrappers.

  1) Single file by path (recommended):
     `pnpm run test:unit -- app/pages/index.spec.ts`

  2) Filter tests by name/regex:
     `pnpm run test:unit -- -t "should render"`

  3) Single file in watch mode:
     `pnpm run test:unit:watch -- app/pages/index.spec.ts`

  4) Direct vitest invocation (preserves NODE_OPTIONS):
     `pnpm exec cross-env NODE_OPTIONS='--no-webstorage' vitest --config configs/vitest/vitest.config.ts path/to/file.spec.ts`

  Always use `--` separator when passing extra args through `pnpm run`.

Pre-PR sanity checklist (run in order):
  1) `pnpm install`
  2) `pnpm run lint:fix` then `pnpm run lint`
  3) `pnpm run typecheck`
  4) `pnpm run test:unit:cov`

2) Repository structure
- `app/`           – Nuxt application (pages, layouts, components, composables, i18n)
- `server/`        – Nitro server routes and utilities (API handlers, mappers, helpers)
- `shared/types/`  – Types shared between app and server (e.g. `QuestionTheme`)
- `tests/unit/`    – Test utilities: `setup/`, `utils/faketories/`, `utils/mocks/`
- `configs/`       – Vitest, ESLint, Oxlint, Stryker, lint-staged configs
- `envs/`          – Environment files (`.env.development`, `.env.test`, `.env.example`)
- `modules/`       – Custom Nuxt modules
- `scripts/`       – Shell scripts (branch creation, PR, changelog)

3) Project conventions & style
- Frameworks / paradigms:
  - Nuxt 4 file-based routing, composables, and auto-imports. Prefer idiomatic Nuxt
    patterns over inventing new layouts.
  - Vue 3 `script setup` syntax in all single-file components. Keep `<script>` before
    `<template>` in every `.vue` file.
  - Pinia for global state; stores named `use<Entity>Store` (e.g. `useQuestionStore`).
  - Use composables for reusable logic (`use*` prefix).
  - Prefer `@nuxt/ui` components and `@vueuse/core` composables where applicable.
  - i18n via `@nuxtjs/i18n`; use `$t()` / `useI18n()` — no hardcoded user-visible
    strings in source code.

- TypeScript:
  - `any` is forbidden. Use precise types; `unknown` + narrowing when needed but prefer to model data accurately.
  - No unsafe type assertions without an explicit ESLint disable comment explaining why.
  - Use `zod` for runtime validation of external data (API responses, env vars).
  - Keep types colocated: component props inline, shared types in `shared/types/`,
    server-local types in `server/utils/**/*.types.ts`.
  - `type-fest` utilities (e.g. `TupleToUnion`, `ArrayValues`) are available and
    preferred over manual mapped types.

- Formatting / Editor settings (see `.editorconfig`):
  - Indent: 2 spaces; EOL: LF; Charset: UTF-8; max line length: 150.
  - No final newline except for `.md`, `.json`, `.yaml`, `.yml`, `.sh`, `.env*`.
  - Use `pnpm run lint:fix` for automated reformatting; avoid manual reformatting.

- Imports and module layout:
  - Import groups (separated by blank lines, in this order):
    1) Node builtins (e.g. `node:path`)
    2) External packages (third-party)
    3) Project aliases / shared modules (`~~/`, `#server/`, `#components`, `@/`, `~/`)
    4) Relative imports
  - Use `type` imports for type-only symbols: `import type { Foo } from "..."`.
  - Prefer named exports; avoid default exports for utilities and composables.
  - Use `#server/utils/...` alias inside `server/`; use `~~/tests/...` inside tests.

- Naming conventions:
  - Files:
    - Components: PascalCase file and component name (e.g. `LocaleSelect.vue`).
    - Composables: `use*.ts` prefix (e.g. `useQuestions.ts`).
    - Stores: `use<Entity>Store.ts` (e.g. `useQuestionStore.ts`).
    - Server handlers: `<resource>.<method>.handler.ts` (e.g. `index.get.handler.ts`).
    - Types files: `*.types.ts`; constants: `*.constants.ts`; enums: `*.enums.ts`.
    - Tests: `*.spec.ts` placed next to the file under test when possible.
    - Faketories: `<entity>.<layer>.faketory.ts` in `tests/unit/utils/faketories/`.
    - Mocks: `<composable>.mock.ts` + `.mock.constants.ts` + `.mock.types.ts`.
  - Symbols:
    - Types / Interfaces: `PascalCase` (e.g. `QuestionTheme`, `GoatItApiResourceName`).
    - Variables / functions: `camelCase`.
    - Exported constants: `UPPER_SNAKE_CASE` (e.g. `GOAT_IT_API_ADMIN_SCOPE_NAME`).

- Vue / component rules:
  - Keep components small and single-responsibility.
  - Prefer props + emits over global state for reusable components.
  - Minimal logic in templates; move complexity to `script setup` or composables.
  - Components with tests use `mountSuspended` from `@nuxt/test-utils/runtime`.
  - Use `shallow: true` in `mountSuspended` for layout tests to avoid deep rendering.

- Server-side (Nitro) rules:
  - API route files (`*.get.ts`, `*.post.ts`, etc.) are thin wrappers; put logic in
    `*.handler.ts` files that accept `H3Event` for testability.
  - Validate all external API responses with `zod` before mapping to domain types.
  - Use `createGoatItApiEndpoint` / `createGoatItApiFetchOptions` helpers for all
    Goat It API calls; never construct fetch options inline.
  - Map DTOs to domain types via dedicated mapper functions (e.g. `goat-it-api.mappers.ts`).

- Error handling and logging:
  - Never swallow exceptions silently. Always:
    1) Re-throw with more context, or
    2) Return a typed failure value the caller can handle, or
    3) Log with context and show a user-friendly i18n message in the UI.
  - Zod parse errors propagate naturally; do not catch them unless you can recover.
  - No `console.log` in production code.

4) Tests and test style
- Framework: Vitest + `@nuxt/test-utils` + `@vue/test-utils` + `happy-dom`.
- All test files: `*.spec.ts`, placed next to the file under test.
- Coverage threshold: 100% (enforced in `vitest.config.ts` -> `thresholds: { 100: true }`).
  - Coverage is collected for `app/**/*.ts`, `app/**/*.vue`, `server/**/*.ts`.
  - Excluded from coverage: `*.constants.ts`, `*.enums.ts`, `*.types.ts`, `*.d.ts`,
    `*.config.ts`, `*.spec.ts`, `server/api/**/*.{get,post,put,delete}.ts`.
- Mocks are centralised in `tests/unit/utils/mocks/` with `.mock.ts`,
  `.mock.constants.ts`, and `.mock.types.ts` triplets.
- Fake test data uses faketory functions (powered by `@faker-js/faker`), located in
  `tests/unit/utils/faketories/`. Faketories accept optional `Partial<T>` overrides.
- Test setup files for the Nuxt environment live in `tests/unit/setup/nuxt/`.
- Config: `mockReset: true`, `clearMocks: true`, `restoreMocks: true` per project.
- Use `describe(functionName, ...)` (passing the function reference) for handler tests.
- Test names follow the pattern: "should <action> when <condition>."
- Use `expect(...).toHaveBeenCalledExactlyOnceWith(...)` for single-call assertions.

5) Git / commit / PR expectations
- Do not commit `.env.*` files with real secrets. `.env.example` is safe to commit.
- Husky pre-commit hooks are active; do not bypass them (`--no-verify`).
- Conventional commits are enforced by commitlint. Format: `type(scope): message`.
  Common types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`.
- Validate branch names: `pnpm run validate:branch-name`.

6) Agent skills (.agents/)
- The `.agents/skills/` directory contains installable skill packs that agents should
  load on demand when the task matches. Each skill has a `SKILL.md` entry point plus
  reference files; load only what is relevant to the current task.

  Available skills:
  - `nuxt`     — `.agents/skills/nuxt/SKILL.md`
    Use when working with any Nuxt 4 concept: routing, composables, data fetching,
    server routes, layouts, middleware, plugins, auto-imports, SSR/hydration, runtime
    config, state management, error handling, and testing. Load before writing or
    modifying any Nuxt-specific code. Includes links to fetch raw v4 docs on demand.
  - `nuxt-ui`  — `.agents/skills/nuxt-ui/SKILL.md`
    Use when building or modifying UI with `@nuxt/ui` v4 (components, theming,
    layouts). Contains a full component reference and Tailwind CSS theming guide.
  - `vueuse`   — `.agents/skills/vueuse/SKILL.md`
    Use when writing reactive logic that may already exist as a VueUse composable.
    Check here before writing any custom composable; covers state, sensors, browser
    APIs, animation, and more. Auto-imported in Nuxt via `@vueuse/nuxt`.

  Do NOT load all skill files at once; read the relevant `SKILL.md` first, then load
  only the referenced files needed for the specific task.

7) Copilot / Cursor rules
- Copilot instructions (`github/copilot-instructions.md`):
  - Always read and follow `AGENTS.md` when working in this repo.
  - If `AGENTS.md` is not in the chat context, ask the repo owner to attach it.
  - Prefer minimal edits, respect Nuxt conventions, write unit tests first and ensure
    `lint`, `typecheck`, and `test:unit:cov` pass.
- Cursor rules: none (`.cursor/rules/` and `.cursorrules` do not exist).

8) Useful paths
- Vitest config:       `configs/vitest/vitest.config.ts`
- ESLint config:       `eslint.config.ts` + `configs/eslint/`
- Oxlint config:       `configs/oxlint/oxlint.config.jsonc`
- Stryker config:      `configs/stryker/stryker.config.mjs`
- Nuxt config:         `nuxt.config.ts`
- Env files:           `envs/.env.development`, `envs/.env.test`, `envs/.env.example`
- Package scripts:     `package.json`
- Copilot instructions:`github/copilot-instructions.md`
- Test setup:          `tests/unit/setup/nuxt/`
- Test utilities:      `tests/unit/utils/` (faketories, mocks, types)
