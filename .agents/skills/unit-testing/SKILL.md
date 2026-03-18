---
name: unit-testing
description: Use when writing or modifying unit tests in this project. Load this skill before creating any *.spec.ts file. Covers all five Vitest projects, mock patterns, faketories, composable/store/repository test wiring, and coverage requirements.
---

# Unit Testing

Full human-readable reference: `docs/unit-testing.md`
Read it for complete examples. This skill contains the non-negotiable rules and decision trees.

---

## Step 0 — Before writing any test

1. Read `docs/unit-testing.md` in full.
2. Identify the **file type** of the source file under test (component, page, layout, composable, store, repository, server handler, server util/mapper/helper, shared helper, i18n translation).
3. Determine the **Vitest project** from the table below.
4. Follow the exact pattern for that file type — no shortcuts.
5. After writing the test, run it: `pnpm run test:unit file.spec.ts`
6. Run coverage to confirm 100%: `pnpm run test:unit:cov`

---

## Vitest project decision tree

| Source file path                                                               | Spec suffix                               | Project        |
|--------------------------------------------------------------------------------|-------------------------------------------|----------------|
| `app/composables/**/*.ts`                                                      | `.spec.ts`                                | `composables`  |
| `app/**/*.store.ts`                                                            | `.store.spec.ts`                          | `stores`       |
| `app/**/*.repository.ts`                                                       | `.repository.spec.ts`                     | `repositories` |
| `app/**/*.{mappers,helpers,translations}.ts`                                   | `.{mappers,helpers,translations}.spec.ts` | `node`         |
| `server/**/*.{mappers,helpers}.ts`                                             | `.{mappers,helpers}.spec.ts`              | `node`         |
| `shared/**/*.{mappers,helpers}.ts`                                             | `.{mappers,helpers}.spec.ts`              | `node`         |
| Everything else in `app/`, `server`, `shared/` that does not match a row above | `.spec.ts`                                | `nuxt`         |

The `repositories` and `node` projects have **no Nuxt environment**. No `mountSuspended`, no `mockNuxtImport`, no global `$fetch`.

---

## Non-negotiable rules

### Coverage

- 100% threshold on all metrics — no exceptions.
- Every branch (truthy/falsy), every error path, every empty/non-empty array case must be covered.

### Describe labels

- **Components:** always use a string label in the form `"<ComponentName> Component"` — never a direct reference: `describe("MyComponent Component", ...)`.
- **Functions / composables / stores / repositories:** pass the reference directly: `describe(myFn, ...)`.
- Use a free-form string only when no single symbol represents the subject (e.g. `describe("Server Goat It API Items Get Handler", ...)`).

### Test names

- Pattern: `"should <action> when <condition>."` — always end with a period.

### Single-call assertions

- Always use `toHaveBeenCalledExactlyOnceWith(...)` — never combine `toHaveBeenCalledTimes(1)` + `toHaveBeenCalledWith(...)`.

### No hardcoded translations

- `$t` returns the key as-is. Assert the translation key string, never the translated text.

### Dynamic imports in composable and store tests

- `vi.resetModules()` runs before every test (global setup).
- Import the composable/store with `await import(...)` inside `beforeEach` — never at the top level.

---

## Per-type checklist

### Component (`nuxt` project)

- [ ] Import component from `#components`
- [ ] `describe("MyComponent Component", ...)` — string label, **not** a component reference
- [ ] Default props declared as a `const` at the top of `describe`, before the mount helper
- [ ] Mount helper: `async function mountXxxComponent(options: MountSuspendedOptions<typeof Xxx> = {})`
- [ ] Helper spreads options after defaults so tests can override anything
- [ ] `beforeEach`: mount with defaults, then `mockStore(useXxxStore)` **after** `mountSuspended`
- [ ] No `shallow: true`
- [ ] Assert translation keys, not translated strings
- [ ] Only test props that are **dynamically bound** (prefixed with `:` in the template). Skip static string props without `:` (e.g. `variant="subtle"`, `color="neutral"`)
- [ ] Every named slot in the template must be exercised by at least one test
- [ ] Cover loading/empty/populated states

### Page (`nuxt` project)

- [ ] Import page directly: `import MyPage from "@/pages/my-page.vue"`
- [ ] `shallow: true` in mount helper
- [ ] Assert `definePageMeta` was called with expected metadata
- [ ] Cover conditional render states (loading, empty, etc.)

### Layout (`nuxt` project)

- [ ] Spec in `spec/` subfolder: `app/layouts/MyLayout/spec/MyLayout.spec.ts`
- [ ] Import directly (not from `#components`)
- [ ] `shallow: true`

### Composable (`composables` project)

- [ ] `mockNuxtImport(...)` at module level for each dependency
- [ ] Declare composable type with `import type { useFoo as UseFooType }`
- [ ] `let useFoo: typeof UseFooType` at module level
- [ ] `beforeEach`: recreate mocks, then `({ useFoo } = await import(...))`
- [ ] Test every returned ref, computed, and function

### Store (`stores` project)

- [ ] `mockNuxtImport("useAsyncAction", ...)` to capture `capturedAction` and `capturedOnError`
- [ ] Reset captured vars to `undefined` at the top of each `beforeEach`
- [ ] Dynamic import of store in `beforeEach`
- [ ] Test initial state, reactive getters, action wiring, and error callback
- [ ] Assert `capturedAction` is `toBe(repository($fetch).method)` (strict reference equality)
- [ ] Assert `capturedOnError?.()` triggers `useAppToast().addErrorToast` with the correct i18n key

### Repository (`repositories` project)

- [ ] No Nuxt — plain Node environment
- [ ] `fetchMock = vi.fn<$Fetch>()` in `beforeEach`
- [ ] Pass `fetchMock as $Fetch` to the factory
- [ ] Test every method: endpoint, options, return value
- [ ] Use `toStrictEqual<ExpectedType>(value)` for return assertions

### Server handler (`nuxt` project)

- [ ] `vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"))` at module level
- [ ] `vi.mocked($fetch).mockResolvedValue(...)` in `beforeEach`
- [ ] `{} as unknown as H3Event` for events (add params as needed)
- [ ] Assert `createGoatItApiEndpoint` call
- [ ] Assert `createGoatItApiFetchOptions` call with expected runtime config (`baseUrl: "https://api.goat-it.com"`, `adminKey: "test-admin-key"`)
- [ ] Assert `$fetch` call with correct endpoint + options
- [ ] Assert return value (mapped domain objects)
- [ ] Assert `ZodError` is thrown for invalid API data

### Server util / mapper / helper (`node` project)

- [ ] Pure function tests — no mocking
- [ ] Import with `#server/utils/...`
- [ ] Cover all branches and edge cases

### Shared helper (`node` project)

- [ ] Import with `~~/shared/utils/...`
- [ ] Test all branches including edge cases (empty string, undefined, etc.)

### i18n translation parity (`node` project)

- [ ] Spec in `app/i18n/specs/` (NOT colocated)
- [ ] Use `crush` from `radashi` to flatten keys
- [ ] Assert `toSorted()` EN keys equal `toSorted()` FR keys

---

## Mock infrastructure quick reference

| Utility                                | Path                                                                                                          | Purpose                                       |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| `ToMock<T>`                            | `~~/tests/unit/utils/types/mock.types`                                                                        | Types a mock object matching interface `T`    |
| `MockedPiniaStore<T>`                  | `~~/tests/unit/utils/types/mock.types`                                                                        | Types a mocked Pinia store                    |
| `mockStore(useStore)`                  | `~~/tests/unit/utils/mocks/stores/store.mock`                                                                 | Returns `useStore()` as `MockedPiniaStore<T>` |
| `MountSuspendedOptions<C>`             | `~~/tests/unit/utils/types/mount.types`                                                                       | Type for the options arg of `mountSuspended`  |
| `createUseFetchStatusMock()`           | `~~/tests/unit/utils/mocks/composables/core/useFetchStatus/useFetchStatus.mock`                               | Mock factory                                  |
| `createUseAsyncActionMock()`           | `~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock`                               | Mock factory                                  |
| `createUseAppToastMock()`              | `~~/tests/unit/utils/mocks/composables/ui/useAppToast/useAppToast.mock`                                       | Mock factory                                  |
| `createQuestionThemesRepositoryMock()` | `~~/tests/unit/utils/mocks/repositories/goat-it-api/questionThemesRepository/question-themes-repository.mock` | Mock factory                                  |

### Adding a new composable mock

1. Create mock file at `tests/unit/utils/mocks/composables/<category>/<ComposableName>/useXxx.mock.ts`
2. Create setup file at `tests/unit/setup/nuxt/composables/use-xxx.nuxt.unit-setup.ts` — use `mockNuxtImport`
3. Add path to `VITEST_COMPOSABLES_MOCK_SETUP_FILES` in `configs/vitest/vitest.config.constants.ts`

### Adding a new repository mock

1. Create mock file at `tests/unit/utils/mocks/repositories/goat-it-api/<Resource>/xxx-repository.mock.ts`
2. Create setup file at `tests/unit/setup/nuxt/repositories/xxx-repository.nuxt.unit-setup.ts` — use `vi.mock(...)` (NOT `mockNuxtImport`)
3. Add path to `VITEST_REPOSITORIES_MOCK_SETUP_FILES` in `configs/vitest/vitest.config.constants.ts`

---

## Faketory quick reference

```ts
// Entity faketory pattern
function createFakeMyEntity(myEntity: Partial<MyEntity> = {}): MyEntity {
  return {
    id: faker.database.mongodbObjectId(),
    slug: faker.lorem.slug(),
    status: faker.helpers.arrayElement(MY_ENTITY_STATUSES),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(), ...myEntity,  // must be last
  };
}
```

- Location: `tests/unit/utils/faketories/<entity-name>/entity/` and `…/dto/`
- Always accept `Partial<T> = {}` and spread it last
- DTOs use ISO strings for dates; entities use `Date` objects

---

## Global setup summary (what is pre-mocked for you)

In `nuxt`, `composables`, and `stores` projects, the following are available without any setup in your test file:

- `$t(key)` → returns `key` unchanged (global Vue mock)
- `$tc(key, count)` → returns `key` unchanged (global Vue mock)
- `definePageMeta` → Vitest spy (accessible globally)
- `useI18n()` → mock returning `{ t: (key) => key, locale: ref("en") }`
- `useRouter()` → mock
- `$fetch` → `vi.fn()` spy (reset each test)
- `useToast()` → mock
- `getRouterParam` → global stub
- `readBody` → global stub
- `createError` → mock via `vi.hoisted`
- `useHead` → mock
- `callOnce` → mock
- `questionThemesRepository` → `vi.mock(...)` mock (nuxt + composables + stores projects)
- fake timers pinned to `2026-04-14` UTC
- **Globally-mocked composables** (nuxt + stores projects only) — the list grows over time.
  Scan `tests/unit/setup/nuxt/composables/` to get the current authoritative list; each file there registers one global mock.

In the `stores` project additionally:

- `setActivePinia(createPinia())` runs before each test

### Accessing and mutating a globally-mocked composable in a component/store test

Because these mocks are registered globally, you do **not** need `mockNuxtImport` in your spec file.
Call the composable directly in the test body — you get back the same mock instance the component received.
Mutate it, then `await nextTick()` to let the template react.

```ts
import { nextTick } from "vue";

it("should show dark tooltip when color mode is light.", async () => {
  const colorMode = useColorMode();
  colorMode.value = "light";
  await nextTick();

  expect(wrapper.find("#my-tooltip").attributes("text")).toBe("navigation.switchOnDarkMode");
});
```

This pattern applies to any composable listed in `tests/unit/setup/nuxt/composables/` (e.g. `useColorMode`, `useAsyncAction`, `useAppToast`, `useFetchStatus`, …).

> **Pitfall:** Do NOT add `mockNuxtImport("useFoo", ...)` in a component spec when `useFoo` is already globally mocked. Just call `useFoo()` directly in the test body.
