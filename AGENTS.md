# AGENTS

This file is a concise, actionable guide for automated agents working in this repository.
It explains how to build, lint and run tests (including running a single test), plus
the coding conventions agents must follow (imports, formatting, types, naming, error
handling, Nuxt conventions, and other repo-specific rules).

## Build / Run / Lint / Test commands

- Package manager: `pnpm@10.32.1` (see `package.json` -> `packageManager`).
- Node requirement: >=25.8.1 (see `package.json` -> `engines.node`).
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

- By filename:    `pnpm run test:unit index.spec.ts`
- By test name:    `pnpm run test:unit -t "should render"`
- Watch file: `pnpm run test:unit:watch app/pages/index.spec.ts`
- Direct:     `pnpm exec cross-env NODE_OPTIONS='--no-webstorage' vitest --config configs/vitest/vitest.config.ts path/to/file.spec.ts`

Pre-PR sanity checklist (run in order):

- `pnpm install`
- `pnpm run lint:fix && pnpm run lint`
- `pnpm run typecheck`
- `pnpm run test:unit:cov`

## Repository structure

- `app/`              – Nuxt application source
  - `components/`     – `layouts/` and `shared/` sub-dirs; PascalCase `.vue` files
  - `composables/`    – Organised as `core/`, `domain/`, `ui/`; each composable in its own sub-dir
  - `repositories/`   – Client-side data access (`*.repository.ts`); factory functions, auto-imported by Nuxt
  - `stores/`         – Pinia stores under `domain/`; store names from `stores/store.enums.ts`
  - `i18n/`           – Locale JSON files (`fr/`, `en/`)
  - `pages/`, `layouts/`, `assets/`
- `server/`           – Nitro server routes and utilities (API handlers, mappers, helpers)
  - `api/**/handlers/` – Route handler files (`*.handler.ts`); thin wrappers in `api/**/index.*.ts`
  - `utils/goat-it-api/` – Helpers, mappers, types, constants for the external API
- `shared/types/`     – Types shared between app and server (e.g. `QuestionTheme`)
- `shared/utils/`     – Helpers auto-imported in both app and server
- `tests/unit/`       – Test utilities: `setup/nuxt/`, `utils/faketories/`, `utils/mocks/`
- `configs/`          – Vitest, ESLint, Oxlint, Stryker, lint-staged configs
- `envs/`             – `.env.development`, `.env.test`, `.env.example`
- `modules/`          – Custom Nuxt modules; `scripts/` – shell utilities
- `docker/goat-it-api-sandbox/` – Local API sandbox via docker-compose

## Project conventions & style

- Frameworks / paradigms:
  - Nuxt 4 file-based routing, composables, auto-imports. Prefer idiomatic Nuxt patterns.
  - Vue 3 `script setup` in all SFCs. Keep `<script>` before `<template>` in every `.vue`.
  - Pinia for global state; stores named `use<Entity>Store`, store ID from `StoreNames` enum.
  - Composables use `use*` prefix; repositories use `*Repository` suffix.
  - Prefer `@nuxt/ui` components and `@vueuse/core` composables where applicable.
  - i18n via `@nuxtjs/i18n`; use `$t()` / `useI18n()` — no hardcoded user-visible strings.

- TypeScript:
  - `any` is forbidden. Use precise types; `unknown` + narrowing when truly needed.
  - No unsafe type assertions without an explicit ESLint disable comment explaining why.
  - Use `zod` for runtime validation of external data (API responses, request bodies, env vars).
  - Types colocated: component props inline, shared in `shared/types/`, server-local in
    `server/utils/**/*.types.ts`.
  - `type-fest` utilities (e.g. `TupleToUnion`, `ArrayValues`) preferred over manual mapped types.

- Formatting / Editor settings (see `.editorconfig`):
  - Indent: 2 spaces; EOL: LF; charset: UTF-8; max line length: 150.
  - Final newline: YES for `.md`, `.json`, `.yaml`, `.yml`, `.sh`, `.env*`; NO for everything else.
  - Use `pnpm run lint:fix` for reformatting; avoid manual reformatting.

- Imports and module layout (groups separated by blank lines, in order):
  1. Node builtins (`node:path`)
  2. External packages
  3. Project aliases (`~~/`, `#server/`, `#components`, `@/`, `~/`)
  4. Relative imports

  - Use `type` imports for type-only symbols (`import type { Foo } from '...'`).
  - Prefer named exports; avoid default exports for utilities and composables.

- Import aliases:
  - `@/` and `~/` → `app/`
  - `~~/` → repo root (use for `~~/tests/unit/...` in tests)
  - `#server/utils/...` → inside `server/` only
  - `#shared/` → `shared/`

- Naming conventions:
  - Files: Components: `PascalCase.vue` | Composables: `use*.ts` | Stores: `<entity>.store.ts`
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
  - API route files (`*.get.ts`, etc.) are 3-line thin wrappers: import handler + `defineEventHandler`.
  - All logic lives in `*.handler.ts` (accepts `H3Event`).
  - Validate all external API responses with `zod` before mapping to domain types.
  - Validate request bodies with `zod` via `readBody(event)` + `SCHEMA.parse(body)`.
  - Use `createGoatItApiEndpoint` / `createGoatItApiFetchOptions` helpers; never inline fetch options.
  - Map DTOs to domain types via dedicated mapper functions in `goat-it-api.mappers.ts`.

- Repository pattern:
  - Factory function: `export const fooRepository: FooRepository = (fetch: $Fetch) => ({ ... })`.
  - Calls internal Nuxt server routes (`/api/goat-it-api/...`), never the external API directly.
  - Auto-imported by Nuxt; instantiated in stores as `fooRepository($fetch)`.

- Error handling and logging:
  - Never swallow exceptions silently — re-throw with context, return typed failure, or log + show i18n UI message.
  - Zod parse errors propagate naturally; do not catch unless you can recover.
  - No `console.log` in production code.

## Tests and test style

- Framework: Vitest + `@nuxt/test-utils` + `@vue/test-utils` + `happy-dom`.
- Vitest runs five projects (defined in `configs/vitest/vitest.config.ts`):
  - `nuxt`         – `app/**/*.spec.ts`, `server/**/*.spec.ts`, `shared/**/*.spec.ts` (excluding composables/stores/repositories/node)
  - `composables`  – `app/composables/**/*.spec.ts`
  - `stores`       – `app/**/*.store.spec.ts` (includes Pinia + composables + repository mock setup)
  - `repositories` – `app/**/*.repository.spec.ts` (plain Node env, no Nuxt)
  - `node`         – `*.mappers.spec.ts`, `*.helpers.spec.ts` under app/, server/, shared/
- Coverage threshold: 100% (`thresholds: { 100: true }`).
  - Collected for `app/**/*.ts`, `app/**/*.vue`, `server/**/*.ts`, `shared/**/*.ts`.
  - Excluded: `*.constants.ts`, `*.enums.ts`, `*.types.ts`, `*.d.ts`, `*.config.ts`,
    `*.spec.ts`, `server/api/**/*.{get,post,put,patch,delete}.ts`.

- Mocks in `tests/unit/utils/mocks/` — `composables/` and `repositories/` sub-dirs.
  - Non-trivial mocks use a triplet: `.mock.ts` + optionally `.mock.constants.ts` + `.mock.types.ts`.
  - Use `ToMock<T>` from `~~/tests/unit/utils/types/mock.types.ts` to type mock objects:
    ```ts
    type ToMock<Stub> = { [Key in keyof Stub]: Stub[Key] extends (...args: unknown[]) => unknown ? Mock<Stub[Key]> : Stub[Key] };
    ```
- Mock setup files in `tests/unit/setup/nuxt/` sub-dirs `composables/` and `repositories/`.
  - New repository mocks: use `vi.mock(...)` (NOT `mockNuxtImport`).
  - New composable mocks: use `mockNuxtImport`.
  - Register in `VITEST_COMPOSABLES_MOCK_SETUP_FILES` or `VITEST_REPOSITORIES_MOCK_SETUP_FILES`
    in `configs/vitest/vitest.config.constants.ts`. Load in `nuxt`, `composables`, `stores`; NOT in `repositories` or `node`.

- Fake data: faketory functions (`@faker-js/faker`) in `tests/unit/utils/faketories/`.
  - Accept `Partial<T>`; named `create<Entity><Layer>` (e.g. `createQuestionThemeEntity`).
  - Two layers per entity: `entity/` (domain type) and `dto/` (raw API DTO).

- Config per project: `mockReset: true`, `clearMocks: true`, `restoreMocks: true`.
- `describe(functionName, ...)` — pass the function/composable/store reference as label.
- Test names: `"should <action> when <condition>."` pattern.
- Use `expect(...).toHaveBeenCalledExactlyOnceWith(...)` for single-call assertions.

- Composable tests with dependencies: use `mockNuxtImport` + `vi.resetModules()` + dynamic
  `await import(...)` inside `beforeEach` to pick up fresh mock instances.
- Store tests: `setActivePinia(createPinia())` is handled by the shared stores setup file;
  capture `action`/`onError` arguments via closure inside `mockNuxtImport` factories.

## Git / commit / PR expectations

- Do not commit `.env.*` files with real secrets (`.env.example` is safe).
- Husky pre-commit hooks are active; never bypass with `--no-verify`.
- Conventional commits enforced by commitlint: `type(scope): message`.
  Common types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`.
- Validate branch names: `pnpm run validate:branch-name`.

## Agent skills (`.agents/skills/`)

Each skill has a `SKILL.md` entry point. Load only the relevant skill for the task.

- `nuxt`         – Nuxt 4 routing, composables, data fetching, server routes, SSR, testing.
  Load before writing or modifying any Nuxt-specific code.
- `nuxt-ui`      – `@nuxt/ui` v4 components, Tailwind CSS theming, layout patterns.
- `vueuse`       – VueUse composables (state, sensors, browser APIs). Check here before
  writing any custom composable; auto-imported via `@vueuse/nuxt`.
- `unit-testing` – Complete unit test reference (patterns, mocks, faketories, Vitest projects).
  Load before writing or modifying any `*.spec.ts` file. Full reference at `docs/unit-testing.md`.
  Do NOT load all skill files at once; read the relevant `SKILL.md` first.

## OpenCode commands (`.opencode/commands/`)

Slash commands available in OpenCode sessions:

- `/complete-i18n`   – Translate all French locale JSON files into every other locale.
- `/write-unit-test` – Write a complete, passing unit test for a given source file.

## Useful docs (`docs/`)

- `docs/unit-testing.md` – Full human-readable unit testing guide (patterns, examples, pitfalls).

## Copilot instructions (`.github/copilot-instructions.md`)

- Always read and follow `AGENTS.md` when working in this repo.
- If `AGENTS.md` is not in the chat context, ask the repo owner to attach it.
- Prefer minimal edits, Nuxt conventions, write unit tests first, and ensure
  `lint`, `typecheck`, and `test:unit:cov` pass before submitting changes.
- Cursor rules: none (`.cursor/rules/` and `.cursorrules` do not exist).

## Useful paths

- Vitest config:    `configs/vitest/vitest.config.ts` + `vitest.config.constants.ts`
- ESLint config:    `eslint.config.ts` + `configs/eslint/flat-configs/`
- Oxlint config:    `configs/oxlint/oxlint.config.jsonc`
- Stryker config:   `configs/stryker/stryker.config.mjs`
- Nuxt config:      `nuxt.config.ts`
- Env files:        `envs/.env.development`, `envs/.env.test`, `envs/.env.example`
- Test setup:       `tests/unit/setup/nuxt/` (base + `composables/` + `repositories/`)
- Test utilities:   `tests/unit/utils/` (faketories, mocks, types)
- API sandbox:      `docker/goat-it-api-sandbox/docker-compose.yml`
