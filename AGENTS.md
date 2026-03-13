AGENTS

This file is a concise, actionable guide for automated agents working in this repository.
It explains how to build, lint and run tests (including running a single test), plus
the coding conventions agents must follow (imports, formatting, types, naming, error
handling, Nuxt conventions, and other repo-specific rules).

1) Build / Run / Lint / Test commands
- Package manager: `pnpm@10.32.1` (see `package.json` -> `packageManager`).
- Node requirement: >=25.8.0 (see `package.json` -> `engines.node`).
- Dev server: `pnpm run dev` (nuxt dev, port 4000, dotenv `envs/.env.development`)
- Build: `pnpm run build`; preview: `pnpm run preview` / `pnpm run start:prod`

- Linting (always run both linters):
  - Full lint: `pnpm run lint`         Full lint + fix: `pnpm run lint:fix`
  - ESLint only: `pnpm run lint:eslint` / `pnpm run lint:eslint:fix`
  - Oxlint only: `pnpm run lint:oxlint` / `pnpm run lint:oxlint:fix`
- Typecheck: `pnpm run typecheck` (nuxt typecheck / vue-tsc, strict mode)

- Tests:
  - Full unit run:   `pnpm run test:unit`
  - With coverage:   `pnpm run test:unit:cov`
  - Watch mode:      `pnpm run test:unit:watch`
  - Mutation (Stryker): `pnpm run test:mutation` / `pnpm run test:mutation:force`

Running a single test or file (`NODE_OPTIONS='--no-webstorage'` is required):
  - By path:    `pnpm run test:unit -- app/pages/index.spec.ts`
  - By name:    `pnpm run test:unit -- -t "should render"`
  - Watch file: `pnpm run test:unit:watch -- app/pages/index.spec.ts`
  - Direct:     `pnpm exec cross-env NODE_OPTIONS='--no-webstorage' vitest --config configs/vitest/vitest.config.ts path/to/file.spec.ts`
  Always use `--` separator when passing extra args through `pnpm run`.

Pre-PR sanity checklist (run in order):
  1) `pnpm install`   2) `pnpm run lint:fix && pnpm run lint`
  3) `pnpm run typecheck`   4) `pnpm run test:unit:cov`

2) Repository structure
- `app/`              – Nuxt application source
  - `components/`     – `layouts/` and `shared/` sub-dirs; PascalCase `.vue` files
  - `composables/`    – Organised as `core/`, `domain/`, `ui/`; each composable in its own sub-dir
  - `repositories/`   – Client-side data access (`*.repository.ts`), auto-imported by Nuxt
  - `stores/`         – Pinia stores under `domain/`
  - `i18n/`           – Locale JSON files (`fr/`, `en/`)
  - `pages/`, `layouts/`, `assets/`
- `server/`           – Nitro server routes and utilities (API handlers, mappers, helpers)
- `shared/types/`     – Types shared between app and server (e.g. `QuestionTheme`)
- `tests/unit/`       – Test utilities: `setup/nuxt/`, `utils/faketories/`, `utils/mocks/`
- `configs/`          – Vitest, ESLint, Oxlint, Stryker, lint-staged configs
- `envs/`             – `.env.development`, `.env.test`, `.env.example`
- `modules/`          – Custom Nuxt modules; `scripts/` – shell utilities

3) Project conventions & style
- Frameworks / paradigms:
  - Nuxt 4 file-based routing, composables, auto-imports. Prefer idiomatic Nuxt patterns.
  - Vue 3 `script setup` in all SFCs. Keep `<script>` before `<template>` in every `.vue`.
  - Pinia for global state; stores named `use<Entity>Store` (e.g. `useQuestionStore`).
  - Composables use `use*` prefix; repositories use `*Repository` suffix.
  - Prefer `@nuxt/ui` components and `@vueuse/core` composables where applicable.
  - i18n via `@nuxtjs/i18n`; use `$t()` / `useI18n()` — no hardcoded user-visible strings.

- TypeScript:
  - `any` is forbidden. Use precise types; `unknown` + narrowing when truly needed.
  - No unsafe type assertions without an explicit ESLint disable comment explaining why.
  - Use `zod` for runtime validation of external data (API responses, env vars).
  - Types colocated: component props inline, shared in `shared/types/`, server-local in
    `server/utils/**/*.types.ts`.
  - `type-fest` utilities (e.g. `TupleToUnion`, `ArrayValues`) preferred over manual mapped types.

- Formatting / Editor settings (see `.editorconfig`):
  - Indent: 2 spaces; EOL: LF; charset: UTF-8; max line length: 150.
  - Final newline: YES for `.md`, `.json`, `.yaml`, `.yml`, `.sh`, `.env*`; NO for everything else.
  - Use `pnpm run lint:fix` for reformatting; avoid manual reformatting.

- Imports and module layout (groups separated by blank lines, in order):
  1) Node builtins (`node:path`)   2) External packages   3) Project aliases (`~~/`, `#server/`,
     `#components`, `@/`, `~/`)   4) Relative imports
  - Use `type` imports for type-only symbols.
  - Prefer named exports; avoid default exports for utilities and composables.
  - Use `#server/utils/...` alias inside `server/`; `~~/tests/...` inside tests.

- Naming conventions:
  - Files: Components: `PascalCase.vue` | Composables: `use*.ts` | Stores: `use<Entity>Store.ts`
    Repositories: `<resource>.repository.ts` | Server handlers: `<resource>.<method>.handler.ts`
    Types: `*.types.ts` | Constants: `*.constants.ts` | Enums: `*.enums.ts`
    Tests: `*.spec.ts` next to source | Faketories: `<entity>.<layer>.faketory.ts`
    Mocks: `<composable>.mock.ts` (+ `.mock.constants.ts` + `.mock.types.ts` as needed)
  - Symbols: Types/Interfaces: `PascalCase` | Variables/functions: `camelCase`
    Exported constants: `UPPER_SNAKE_CASE`

- Vue / component rules:
  - Keep components small and single-responsibility.
  - Prefer props + emits over global state for reusable components.
  - Minimal logic in templates; move complexity to `script setup` or composables.
  - Components with tests use `mountSuspended` from `@nuxt/test-utils/runtime`.
  - Use `shallow: true` in `mountSuspended` for layout/page tests to avoid deep rendering.

- Server-side (Nitro) rules:
  - API route files (`*.get.ts`, etc.) are thin wrappers; logic lives in `*.handler.ts` (accepts `H3Event`).
  - Validate all external API responses with `zod` before mapping to domain types.
  - Use `createGoatItApiEndpoint` / `createGoatItApiFetchOptions` helpers; never inline fetch options.
  - Map DTOs to domain types via dedicated mapper functions in `goat-it-api.mappers.ts`.

- Error handling and logging:
  - Never swallow exceptions silently — re-throw with context, return typed failure, or log + show i18n UI message.
  - Zod parse errors propagate naturally; do not catch unless you can recover.
  - No `console.log` in production code.

4) Tests and test style
- Framework: Vitest + `@nuxt/test-utils` + `@vue/test-utils` + `happy-dom`.
- Vitest runs three projects (defined in `configs/vitest/vitest.config.ts`):
  - `nuxt`   – `app/**/*.spec.ts`, `server/**/*.spec.ts`, `shared/**/*.spec.ts` (excluding stores/node)
  - `stores` – `app/**/*.store.spec.ts` (includes store setup file)
  - `node`   – `*.repository.spec.ts`, `*.mappers.spec.ts`, `*.helpers.spec.ts`
- Coverage threshold: 100% (`thresholds: { 100: true }`).
  - Collected for `app/**/*.ts`, `app/**/*.vue`, `server/**/*.ts`.
  - Excluded: `*.constants.ts`, `*.enums.ts`, `*.types.ts`, `*.d.ts`, `*.config.ts`,
    `*.spec.ts`, `server/api/**/*.{get,post,put,delete}.ts`.
- Mocks in `tests/unit/utils/mocks/` — `.mock.ts` / `.mock.constants.ts` / `.mock.types.ts` triplets.
- Fake data: faketory functions (`@faker-js/faker`) in `tests/unit/utils/faketories/`; accept `Partial<T>`.
- Config per project: `mockReset: true`, `clearMocks: true`, `restoreMocks: true`.
- `describe(functionName, ...)` — pass the function reference for handler/composable tests.
- Test names: `"should <action> when <condition>."` pattern.
- Use `expect(...).toHaveBeenCalledExactlyOnceWith(...)` for single-call assertions.

5) Git / commit / PR expectations
- Do not commit `.env.*` files with real secrets (`.env.example` is safe).
- Husky pre-commit hooks are active; never bypass with `--no-verify`.
- Conventional commits enforced by commitlint: `type(scope): message`.
  Common types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`.
- Validate branch names: `pnpm run validate:branch-name`.

6) Agent skills (.agents/skills/)
Each skill has a `SKILL.md` entry point. Load only the relevant skill for the task.
  - `nuxt`     – Nuxt 4 routing, composables, data fetching, server routes, SSR, testing.
                 Load before writing or modifying any Nuxt-specific code.
  - `nuxt-ui`  – `@nuxt/ui` v4 components, Tailwind CSS theming, layout patterns.
  - `vueuse`   – VueUse composables (state, sensors, browser APIs). Check here before
                 writing any custom composable; auto-imported via `@vueuse/nuxt`.
Do NOT load all skill files at once; read the relevant `SKILL.md` first.

7) Copilot instructions (`.github/copilot-instructions.md`)
- Always read and follow `AGENTS.md` when working in this repo.
- If `AGENTS.md` is not in the chat context, ask the repo owner to attach it.
- Prefer minimal edits, Nuxt conventions, write unit tests first, and ensure
  `lint`, `typecheck`, and `test:unit:cov` pass before submitting changes.
- Cursor rules: none (`.cursor/rules/` and `.cursorrules` do not exist).

8) Useful paths
- Vitest config:    `configs/vitest/vitest.config.ts`
- ESLint config:    `eslint.config.ts` + `configs/eslint/`
- Oxlint config:    `configs/oxlint/oxlint.config.jsonc`
- Stryker config:   `configs/stryker/stryker.config.mjs`
- Nuxt config:      `nuxt.config.ts`
- Env files:        `envs/.env.development`, `envs/.env.test`, `envs/.env.example`
- Test setup:       `tests/unit/setup/nuxt/`
- Test utilities:   `tests/unit/utils/` (faketories, mocks, types)
