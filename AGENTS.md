AGENTS

This file is a concise, actionable guide for automated agents working in this repository.
It explains how to build, lint and run tests (including running a single test), plus
the coding conventions agents must follow (imports, formatting, types, naming, error
handling, Nuxt conventions, and other repo-specific rules).

1) Build / Run / Lint / Test commands
- Package manager: `pnpm` (see `package.json` -> `packageManager`). Use `pnpm` for
  installs and for running scripts when possible.
- Node requirement: see `package.json` -> `engines.node`.

- Dev server: `pnpm run dev`
  - Equivalent script: `nuxt dev --dotenv envs/.env.development --port 4000`

- Build: `pnpm run build` (runs `nuxt build`)
- Preview production build: `pnpm run preview` or `pnpm run start:prod`

- Linting:
  - Full lint: `pnpm run lint` (runs both oxlint + eslint)
  - ESLint only: `pnpm run lint:eslint`
  - ESLint fix: `pnpm run lint:eslint:fix`
  - Oxlint only: `pnpm run lint:oxlint`
  - Oxlint fix: `pnpm run lint:oxlint:fix`
  - Staged auto-fix: `pnpm run lint:staged:fix`

- Typecheck: `pnpm run typecheck` (runs `nuxt typecheck` / `vue-tsc` based check)

- Tests:
  - Unit tests (full): `pnpm run test:unit`
  - Unit tests (watch): `pnpm run test:unit:watch`
  - Unit tests with coverage: `pnpm run test:unit:cov`
  - Mutation tests (Stryker): `pnpm run test:mutation`
  - Force incremental mutation run: `pnpm run test:mutation:force`

Notes on running a single test or a single test file
- The repository uses Vitest (see `package.json`), with config at
  `configs/vitest/vitest.config.ts` and `cross-env NODE_OPTIONS='--no-webstorage'` in
  npm scripts. There are multiple ways to run a single test:

  1) Run a single test file by path (recommended for deterministic runs):
     - `pnpm run test:unit -- path/to/file.spec.ts`
     - Example: `pnpm run test:unit -- app/pages/index.spec.ts`

  2) Run tests filtered by name/regex (Vitest `-t` / `--testNamePattern`):
     - `pnpm run test:unit -- -t "should render"`

  3) Run via direct vitest call if you need custom flags (bypass script wrapper):
     - `pnpm exec vitest --config configs/vitest/vitest.config.ts path/to/file.spec.ts`

  4) Run a single test in watch mode:
     - `pnpm run test:unit:watch -- path/to/file.spec.ts`

  When passing extra args to npm scripts, use `--` separator so args reach Vitest.

2) Project conventions & style (high level)
- Frameworks / paradigms to prefer:
  - Nuxt 4 conventions (file-based routing, composables, auto-imports). Prefer Nuxt
    idiomatic patterns over inventing new layouts.
  - Use Vue 3 `script setup` syntax in single-file components.
  - Pinia for global state; create per-entity stores (e.g. `useQuestionStore`).
  - Use composables for reusable logic.
  - Favor Nuxt UI components and VueUse composables where appropriate.

- TypeScript:
  - No `any` in repository (README explicitly forbids `any`). Prefer precise types,
    `unknown` when needed then narrow, or create small type definitions.
  - Use `zod` or explicit DTOs for runtime validation where necessary.
  - Keep types colocated where they make sense (component props, composable return
    shapes, or `types/` when shared across modules).

- Formatting / Editor settings:
  - See `.editorconfig`:
    - Indent: 2 spaces
    - EOL: LF
    - Charset: UTF-8
    - Max line length: 150
    - No final newline by default (exceptions for .md, .json, .sh, .env)
  - Run `pnpm run lint:eslint:fix` and `pnpm run lint:oxlint:fix` to auto-fix style
    issues; prefer automated fixes over manual reformatting.

- Imports and module layout:
  - Use absolute/aliased imports provided by Nuxt when appropriate (e.g. `~`, `@`)
    and auto-imported composables, but prefer explicit relative paths for local
    components when clarity helps.
  - Keep import groups ordered and separated by a blank line:
    1) Node / builtin
    2) External packages (third-party)
    3) Project aliases / shared modules
    4) Relative imports
  - Prefer named imports from local modules; avoid default exports for complex
    utilities and composables.

- Naming conventions:
  - Files:
    - Components: PascalCase for file and component name, e.g. `MyButton.vue`.
    - Composables: `use*` prefix, e.g. `useQuestions.ts`.
    - Stores: `use<Entity>Store`, e.g. `useQuestionStore`.
    - Tests: `*.spec.ts` placed next to the file under test when possible.
  - Symbols:
    - Types / Interfaces: `PascalCase`, prefixed when helpful (e.g. `QuestionDto`).
    - Variables / functions: `camelCase`.
    - Constants: `UPPER_SNAKE_CASE` for exported constants.

- Vue / component rules:
  - Keep components small and single-responsibility; prefer composition over
    monolithic components.
  - Prefer props + emits over global state for reusable components.
  - Template: keep logic minimal; complex logic belongs in `script setup` or
    composables.

- Error handling and logging:
  - Prefer returning Result-like objects or throwing typed Errors for exceptional
    conditions; centralize translation in UI (i18n) rather than strings in services.
  - Never swallow exceptions silently. If catching, always do one of:
    1) Re-throw with more context
    2) Return a typed failure value that the caller can handle
    3) Log the error with context and show a user-friendly message in UI
  - Avoid console.log in production code; use structured logs only in dev helpers.

- Types of checks expected by CI / maintainers:
  - Lint must pass (oxlint + eslint)
  - Typecheck must pass (`pnpm run typecheck`)
  - Unit tests with coverage (`pnpm run test:unit:cov`) are important for PRs
  - Mutation tests (Stryker) are used by the project (`pnpm run test:mutation`)

3) Tests and test style
- Use Vitest with `happy-dom` / `@vue/test-utils` for component tests.
- Test file naming: `*.spec.ts`.
- Keep tests isolated: mock network and global stores when needed.
- Prefer unit tests for logic and small component rendering checks. Acceptance
  tests are separate (none configured currently).
- When writing tests:
  - Use explicit setup/teardown (beforeEach/afterEach) when state is shared.
  - Avoid heavy integration in unit tests; create focused asserts.
  - `100%` coverage is required, never decrease coverage in a PR.

4) Git / commit / PR expectations for agents
- Do not commit secrets, env files, or credentials. `.env.example` exists for
  reference; `.env.*` files are under `envs/` and should not be committed with
  secrets.
- Husky is configured (pre-commit hooks). Agents should not bypass hooks.
- Follow conventional commits (commitlint devDependency present) when creating
  human-facing commits. Automated agent commits should be short, explain why,
  and run linters / tests locally before committing.

5) Copilot / Cursor rules present in repository
- Copilot instructions: see `.github/copilot-instructions.md` — agents must
  follow it. In short it says:
  - Always read and follow `AGENTS.md` when working in this repo.
  - If `AGENTS.md` is not in the chat context, ask the repo owner to attach it
    and then comply with its rules.
  - Prefer minimal edits, respect Nuxt conventions, write unit tests first and
    ensure `lint`, `typecheck`, and `test:unit:cov` pass.
  - Location: `.github/copilot-instructions.md`

- Cursor rules: none found under `.cursor/rules/` or `.cursorrules` in the
  repository root. If Cursor rules are added, update this file to include them.

6) Recommended agent behaviors
- Prefer making minimal, local changes in a single PR. Do not rewrite large
  files unless necessary.
- Run the following sanity checks before proposing a PR:
  1) `pnpm install` (or `pnpm i`)
  2) `pnpm run lint` and fix lints or explain why exceptions are needed
  3) `pnpm run typecheck`
  4) `pnpm run test:unit` (or `pnpm run test:unit -- path/to/test.spec.ts` for
     focused runs)

- When adding tests, aim to place them next to code under test, use `*.spec.ts`
  and update coverage expectations if necessary. Keep tests deterministic.

7) Useful paths
- Vitest config: `configs/vitest/vitest.config.ts`
- ESLint config: `eslint.config.ts` and `configs/eslint/` (flat configs)
- Oxlint config: `configs/oxlint/oxlint.config.jsonc`
- Stryker (mutation) config: `configs/stryker/stryker.config.mjs`
- Environment files: `envs/.env.development`, `envs/.env.test`, `envs/.env.example`
- Package scripts: `package.json` (root)
- Copilot instructions: `.github/copilot-instructions.md`

If anything here is unclear or you need repository-specific decisions that
require human input (e.g. change CI gates, bump coverage policy, add a new test
report format), add one focused question and propose a sensible default.
