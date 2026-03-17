# Unit Testing Guide

This document is the complete reference for writing unit tests in this repository.
It covers the test infrastructure, every file type that needs tests, exact patterns to follow, and common pitfalls.

---

## Table of contents

1. [Overview and tooling](#1-overview-and-tooling)
2. [Vitest projects](#2-vitest-projects)
3. [Coverage policy](#3-coverage-policy)
   - [Mutation testing](#31-mutation-testing)
4. [Global test setup](#4-global-test-setup)
5. [Running tests](#5-running-tests)
6. [Test patterns by file type](#6-test-patterns-by-file-type)
   - [Components](#61-components)
   - [Pages](#62-pages)
   - [Layouts](#63-layouts)
   - [Composables](#64-composables)
   - [Stores](#65-stores)
   - [Repositories](#66-repositories)
   - [Server handlers](#67-server-handlers)
   - [Server utils / mappers / helpers](#68-server-utils--mappers--helpers)
   - [Shared helpers](#69-shared-helpers)
   - [i18n translation parity](#610-i18n-translation-parity)
7. [Mock infrastructure](#7-mock-infrastructure)
   - [ToMock type](#71-tomock-type)
   - [MockedPiniaStore type](#72-mockedpiniastore-type)
   - [mockStore helper](#73-mockstore-helper)
   - [MountSuspendedOptions type](#74-mountsuspendedoptions-type)
   - [Composable mock files](#75-composable-mock-files)
   - [Repository mock files](#76-repository-mock-files)
   - [Registering new mocks](#77-registering-new-mocks)
8. [Faketories](#8-faketories)
9. [Naming conventions](#9-naming-conventions)
10. [Common pitfalls](#10-common-pitfalls)

---

## 1. Overview and tooling

| Tool                                                                | Purpose                                                        |
|---------------------------------------------------------------------|----------------------------------------------------------------|
| [Vitest](https://vitest.dev)                                        | Test runner                                                    |
| [`@nuxt/test-utils`](https://nuxt.com/docs/getting-started/testing) | Nuxt-aware test utilities (`mountSuspended`, `mockNuxtImport`) |
| [`@vue/test-utils`](https://test-utils.vuejs.org)                   | Vue component mounting                                         |
| [`happy-dom`](https://github.com/capricorn86/happy-dom)             | DOM environment                                                |
| [`@pinia/testing`](https://pinia.vuejs.org/cookbook/testing.html)   | Pinia testing utilities                                        |
| [`@faker-js/faker`](https://fakerjs.dev)                            | Fake data generation                                           |

All tests use **Vitest globals** (`describe`, `it`, `expect`, `vi`, `beforeEach`, etc.) — you must import them from Vitest in every test file. No auto-imports.

---

## 2. Vitest projects

There are **five Vitest projects**, each covering a different layer. The project is determined automatically by the spec file path.

| Project        | Spec file pattern                                                                                                                   | Setup files loaded                                                                  |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| `nuxt`         | `app/**/*.spec.ts`, `server/**/*.spec.ts`, `shared/**/*.spec.ts` (excludes patterns claimed by other projects)                      | All nuxt setups + composable mocks + repository mocks                               |
| `composables`  | `app/composables/**/*.spec.ts`                                                                                                      | All nuxt setups + repository mocks (NOT composable mocks — tests real composables)  |
| `stores`       | `app/**/*.store.spec.ts`                                                                                                            | All nuxt setups + composable mocks + repository mocks + `stores.nuxt.unit-setup.ts` |
| `repositories` | `app/**/*.repository.spec.ts`                                                                                                       | `dates.nuxt.unit-setup.ts` only (plain Node, no Nuxt environment)                   |
| `node`         | `app/**/*.{mappers,helpers,translations}.spec.ts`, `server/**/*.{mappers,helpers}.spec.ts`, `shared/**/*.{mappers,helpers}.spec.ts` | `dates.nuxt.unit-setup.ts` only                                                     |

The `repositories` and `node` projects use a plain Vitest environment (no Nuxt, no happy-dom).
All other projects use `environment: "nuxt"` (happy-dom + Nuxt runtime).

> **Note:** The `composables` project does NOT load composable mock setup files. That is intentional — composable tests exercise the real composable implementation; their dependencies are mocked individually inside the test file.

---

## 3. Coverage policy

- **Provider:** V8
- **Threshold:** 100% across all metrics (lines, branches, functions, statements)
- **Collected for:** `app/**/*.ts`, `app/**/*.vue`, `server/**/*.ts`, `shared/**/*.ts`
- **Excluded from coverage:**
  - `**/*.constants.ts`
  - `**/*.enums.ts`
  - `**/*.types.ts`
  - `**/*.d.ts`
  - `**/*.config.ts`
  - `**/*.spec.ts`
  - `server/api/**/*.{get,post,put,patch,delete}.ts` (thin route wrappers)

Every line of every non-excluded source file must be reachable by at least one test.

### 3.1. Mutation testing

In addition to code coverage, we also run mutation testing with Stryker. Mutation testing creates random mutations in the source code and checks if the tests fail as expected. 

This ensures that our tests are effective at catching bugs.

So, when writing tests, aim for high coverage AND strong assertions that would fail if the code were incorrect. Avoid superficial assertions that would pass even if the implementation were wrong.

---

## 4. Global test setup

These setup files run automatically before tests in the relevant projects. You do not need to import them.

### Common to all nuxt/composables/stores projects

| File                                  | What it does                                                                                                                                                        |
|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `vtu-config.nuxt.unit-setup.ts`       | Sets `renderStubDefaultSlot: true`; stubs `u-tooltip: true`; adds `$t` and `$tc` global mocks (return the key as-is); runs `vi.resetModules()` in each `beforeEach` |
| `dates.nuxt.unit-setup.ts`            | Sets `process.env.TZ = "UTC"`; enables fake timers pinned to `2026-04-14`                                                                                           |
| `define-page-meta.nuxt.unit-setup.ts` | Mocks `definePageMeta` via `vi.hoisted` + `mockNuxtImport`; exposes as global `definePageMeta` spy                                                                  |
| `use-i18n.nuxt.unit-setup.ts`         | Mocks `useI18n` via `mockNuxtImport`; `t` returns key as-is; `locale` is `"en"`                                                                                     |
| `use-router.nuxt.unit-setup.ts`       | Mocks `useRouter` via `mockNuxtImport`                                                                                                                              |
| `fetch.nuxt.unit-setup.ts`            | Stubs `$fetch` globally with a `vi.fn`; recreated each `beforeEach`                                                                                                 |
| `use-toast.nuxt.unit-setup.ts`        | Mocks `useToast` via `mockNuxtImport`                                                                                                                               |
| `h3.nuxt.unit-setup.ts`               | Stubs globals `getRouterParam` and `readBody`                                                                                                                       |
| `create-error.nuxt.unit-setup.ts`     | Mocks `createError` via `vi.hoisted` + `mockNuxtImport`                                                                                                             |

### Stores project only

| File                        | What it does                                           |
|-----------------------------|--------------------------------------------------------|
| `stores.nuxt.unit-setup.ts` | Calls `setActivePinia(createPinia())` before each test |

### Composable mock setup files (nuxt + stores, NOT composables)

| File                                  | Mock it registers |
|---------------------------------------|-------------------|
| `use-fetch-status.nuxt.unit-setup.ts` | `useFetchStatus`  |
| `use-async-action.nuxt.unit-setup.ts` | `useAsyncAction`  |
| `use-app-toast.nuxt.unit-setup.ts`    | `useAppToast`     |

### Repository mock setup files (nuxt + composables + stores)

| File                                            | Mock it registers                             |
|-------------------------------------------------|-----------------------------------------------|
| `question-themes-repository.nuxt.unit-setup.ts` | `questionThemesRepository` via `vi.mock(...)` |

### Runtime config injected in nuxt environment

Tests running in the `nuxt`, `composables`, or `stores` projects have access to these injected runtime config values:

```ts
const runtimeConfig = {
  goatItApi: {
    baseUrl: "https://api.goat-it.com",
    adminKey: "test-admin-key",
  },
};
```

---

## 5. Running tests

```bash
# All tests
pnpm run test:unit

# With coverage
pnpm run test:unit:cov

# Watch mode
pnpm run test:unit:watch

# Single file
pnpm run test:unit -- path/to/file.spec.ts

# By test name
pnpm run test:unit -- -t "should render"

# Watch a single file
pnpm run test:unit:watch -- path/to/file.spec.ts
```

Always use `--` to separate extra arguments from the `pnpm run` command.

---

## 6. Test patterns by file type

### 6.1 Components

**Project:** `nuxt`
**Spec file location:** Colocated with the component, same directory, `ComponentName.spec.ts`

#### Structure

```ts
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";   // only if the component uses a store
import type { TestingPinia } from "@pinia/testing";    // only if the component uses a store
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeXxx } from "~~/tests/unit/utils/faketories/.../xxx.entity.faketory";
import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";   // only if uses a store
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { MyComponent } from "#components";

describe(MyComponent, () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;                                                  // only if uses a store
  let myStore: ReturnType<typeof mockStore<typeof useMyStore>>;             // only if uses a store

  async function mountMyComponent(options: MountSuspendedOptions<typeof MyComponent> = {}): Promise<VueWrapper> {
    return mountSuspended(MyComponent, {
      props: { /* default props */ },
      global: { plugins: [pinia] },   // only if uses a store
      ...options,
    });
  }

  beforeEach(async () => {
    pinia = createTestingPinia();     // only if uses a store
    wrapper = await mountMyComponent();
    myStore = mockStore(useMyStore);  // after mountSuspended, only if uses a store
  });

  it("should render the component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  // ... more tests
});
```

#### Key rules

- Import the component from `#components` (Nuxt auto-import).
- Use `describe(MyComponent, ...)` — pass the component reference as the label, not a string.
- Create a `mountXxxComponent` helper that accepts `MountSuspendedOptions<typeof Xxx>` and spreads it after defaults. This allows individual tests to override any option.
- Do **not** use `shallow: true` for components (use it only for pages and layouts).
- Call `mockStore(useXxxStore)` **after** `mountSuspended` inside `beforeEach`.
- `$t` returns the key as-is — assert translation keys directly: `expect(...).toBe("questionThemes.fields.label")`.
- Mutate store state directly: `myStore.someField = value`, then re-mount if the template needs to re-render.
- Find child components with `wrapper.findComponent<typeof UBadge>({ name: "UBadge" })`.
- Check prop values with `component.props("propName")`.

#### Example — finding child components and asserting props

```ts
it("should pass the status to the badge when mounted.", async () => {
  myStore.item = createFakeItem({ status: "active" });
  wrapper = await mountMyComponent();

  const badge = wrapper.findComponent<typeof MyBadge>({ name: "MyBadge" });
  expect(badge.props("status")).toBe("active");
});
```

---

### 6.2 Pages

**Project:** `nuxt`
**Spec file location:** Colocated with the page file.

Pages follow the same structure as components with two differences:

1. **Always use `shallow: true`** — page tests stub child components.
2. **Import directly**, not from `#components`:

```ts
import MyPage from "@/pages/my-page.vue";
```

#### Asserting `definePageMeta`

`definePageMeta` is globally mocked by `define-page-meta.nuxt.unit-setup.ts` and exposed as a Vitest spy:

```ts
it("should define page metadata when mounted.", () => {
  expect(definePageMeta).toHaveBeenCalledExactlyOnceWith({
    icon: MY_PAGE_ICON,
    titleKey: MY_PAGE_TITLE_KEY,
  });
});
```

#### Example

```ts
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { MY_PAGE_ICON, MY_PAGE_TITLE_KEY } from "~/pages/my-page.constants";
import MyPage from "@/pages/my-page.vue";

describe(MyPage, () => {
  let wrapper: VueWrapper;

  async function mountMyPage(options: MountSuspendedOptions<typeof MyPage> = {}): Promise<VueWrapper> {
    return mountSuspended(MyPage, {
      shallow: true,
      global: { plugins: [pinia] }, ...options,
    });
  }

  beforeEach(async () => {
    pinia = createTestingPinia();
    wrapper = await mountMyPage();
    myStore = mockStore(useMyStore);
  });

  it("should define page metadata when mounted.", () => {
    expect(definePageMeta).toHaveBeenCalledExactlyOnceWith({
      icon: MY_PAGE_ICON,
      titleKey: MY_PAGE_TITLE_KEY,
    });
  });
});
```

---

### 6.3 Layouts

**Project:** `nuxt`
**Spec file location:** `app/layouts/MyLayout/spec/MyLayout.spec.ts` (in a `spec/` subdirectory)

- Always use `shallow: true`.
- Import directly from the component path (not `#components`).
- Tests are typically minimal — just existence checks.

```ts
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it } from "vitest";

import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout.vue";

describe(DefaultLayout, () => {
  it("should render the layout when mounted.", async () => {
    const wrapper = await mountSuspended(DefaultLayout, { shallow: true });
    expect(wrapper.exists()).toBeTruthy();
  });
});
```

---

### 6.4 Composables

**Project:** `composables`
**Spec file location:** Colocated with the composable file.

Composable tests require a **dynamic import pattern** because `vi.resetModules()` runs before every test (set up by `vtu-config.nuxt.unit-setup.ts`). This ensures mocks are picked up fresh each time.

#### Pattern A — composable with mocked dependencies

Use this when the composable calls other composables (e.g. `useAsyncAction` calls `useFetchStatus`).

```ts
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createUseFetchStatusMock } from "~~/tests/unit/utils/mocks/composables/core/useFetchStatus/useFetchStatus.mock";
import type { UseFetchStatusMock } from "~~/tests/unit/utils/mocks/composables/core/useFetchStatus/useFetchStatus.mock";

// Import type only — the real module is loaded dynamically in beforeEach
import type { useAsyncAction as UseAsyncActionType } from "@/composables/core/useAsyncAction/useAsyncAction";

// 1. Declare mock variable outside describe (module-level)
let useFetchStatusMock: UseFetchStatusMock;

// 2. mockNuxtImport at module level (it is hoisted)
mockNuxtImport("useFetchStatus", () => (): UseFetchStatusMock => useFetchStatusMock);

// 3. Declare the real composable variable for dynamic import
let useAsyncAction: typeof UseAsyncActionType;

describe("useAsyncAction", () => {
  beforeEach(async () => {
    // 4. Recreate mock + dynamically import the real composable
    useFetchStatusMock = createUseFetchStatusMock();
    ({ useAsyncAction } = await import("@/composables/core/useAsyncAction/useAsyncAction"));
  });

  it("should call setFetchStatusToPending when execute is called.", async () => {
    const action = vi.fn<() => Promise<void>>();
    const { execute } = useAsyncAction(action, vi.fn());

    await execute();

    expect(useFetchStatusMock.setFetchStatusToPending).toHaveBeenCalledExactlyOnceWith();
  });
});
```

#### Pattern B — composable without mocked dependencies

Use this when the composable only depends on globally-mocked things (e.g. `useToast` is already mocked globally).

```ts
import { beforeEach, describe, expect, it } from "vitest";

import type { useAppToast as UseAppToastType } from "@/composables/ui/useAppToast/useAppToast";

let useAppToast: typeof UseAppToastType;

describe("useAppToast", () => {
  beforeEach(async () => {
    ({ useAppToast } = await import("@/composables/ui/useAppToast/useAppToast"));
  });

  it("should call addSuccessToast when invoked.", () => {
    const { addSuccessToast } = useAppToast();
    addSuccessToast({ title: "Done" });
    // assert via the global useToast mock
  });
});
```

#### Why the dynamic import?

`vi.resetModules()` runs before every test (from the global setup). This clears the module registry, so any module imported at the top level is effectively stale after the first test. By dynamically importing inside `beforeEach`, the composable always sees the freshly-reset mock values.

---

### 6.5 Stores

**Project:** `stores`
**Spec file location:** Colocated with the store file (`*.store.spec.ts`).

Stores depend on `useAsyncAction` and repository functions. Both are mocked globally, but the store test needs to **capture** the arguments passed to `useAsyncAction` to test internal wiring.

#### Full pattern

```ts
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it } from "vitest";

import { createUseAsyncActionMock } from "~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock";
import type { UseAsyncActionMock } from "~~/tests/unit/utils/mocks/composables/core/useAsyncAction/useAsyncAction.mock";
import { createFakeItem } from "~~/tests/unit/utils/faketories/.../item.entity.faketory";

import type { useMyStore as UseMyStoreType } from "@/stores/domain/my-entity/my.store";

// 1. Variables to capture what gets passed to useAsyncAction
let useAsyncActionMock: UseAsyncActionMock;
let capturedAction: (() => Promise<MyEntity[]>) | undefined;
let capturedOnError: (() => void) | undefined;

// 2. Mock useAsyncAction — capture arguments, return a fresh mock instance
mockNuxtImport("useAsyncAction", () => (action: unknown, onError: unknown): UseAsyncActionMock => {
  capturedAction = action as () => Promise<MyEntity[]>;
  capturedOnError = onError as () => void;
  useAsyncActionMock = createUseAsyncActionMock();
  return useAsyncActionMock;
});

let useMyStore: typeof UseMyStoreType;

describe("useMyStore", () => {
  beforeEach(async () => {
    capturedAction = undefined;
    capturedOnError = undefined;
    ({ useMyStore } = await import("@/stores/domain/my-entity/my.store"));
  });

  describe("initial state", () => {
    it("should expose an empty array when created.", () => {
      const store = useMyStore();
      expect(store.items).toStrictEqual<MyEntity[]>([]);
    });
  });

  describe("reactive getters", () => {
    it("should reflect fetchStatus from useAsyncAction when created.", () => {
      const store = useMyStore();
      expect(store.fetchStatus).toBe(useAsyncActionMock.fetchStatus.value);
    });

    it("should be true when fetchStatus changes to pending.", () => {
      const store = useMyStore();
      useAsyncActionMock.fetchStatus.value = "pending";
      expect(store.isFetching).toBeTruthy();
    });
  });

  describe("useAsyncAction wiring", () => {
    it("should pass the repository getAll as action to useAsyncAction.", () => {
      useMyStore();
      expect(capturedAction).toBe(myRepository($fetch).getAll);
    });

    it("should call addErrorToast when the error callback is invoked.", () => {
      useMyStore();
      capturedOnError?.();
      expect(useAppToast().addErrorToast).toHaveBeenCalledExactlyOnceWith({
        description: "myEntity.cantFetch",
      });
    });
  });
});
```

#### Key rules

- `setActivePinia(createPinia())` runs automatically before each test — no need to call it manually.
- `vi.resetModules()` runs automatically — use dynamic import in `beforeEach`.
- Declare `capturedAction` and `capturedOnError` at module level so the `mockNuxtImport` factory can assign to them.
- Reset captured variables to `undefined` at the start of each `beforeEach`.
- Mutate `useAsyncActionMock.fetchStatus.value` to drive reactive getter assertions.
- Assert the captured action with `toBe(repositoryInstance($fetch).methodName)` — the repository is globally mocked.

---

### 6.6 Repositories

**Project:** `repositories`
**Spec file location:** Colocated with the repository file (`*.repository.spec.ts`).

Repositories run in a plain Node environment — no Nuxt, no happy-dom, no global `$fetch`. You must create your own fetch mock.

```ts
import { vi, describe, it, expect, beforeEach } from "vitest";
import type { $Fetch } from "nitropack";

import { createFakeItem } from "~~/tests/unit/utils/faketories/.../item.entity.faketory";
import { createFakeItemCreationDto } from "~~/tests/unit/utils/faketories/.../item.dto.faketory";

import { myRepository } from "@/repositories/goat-it-api/my-entity/my.repository";

describe(myRepository, () => {
  let fetchMock: ReturnType<typeof vi.fn<$Fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn<$Fetch>();
  });

  describe(myRepository, () => {
    it("should return the repository object when called.", () => {
      const repository = myRepository(fetchMock as $Fetch);
      expect(repository).toStrictEqual({
        getAll: expect.any(Function),
        getById: expect.any(Function),
        create: expect.any(Function),
      });
    });
  });

  describe("getAll", () => {
    it("should call fetch with the correct endpoint when called.", async () => {
      const repository = myRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue([]);
      await repository.getAll();

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/my-entities");
    });

    it("should return items when fetch resolves.", async () => {
      const fakeItems: MyEntity[] = [
        createFakeItem(),
        createFakeItem()
      ];
      const repository = myRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(fakeItems);
      const result = await repository.getAll();

      expect(result).toStrictEqual<MyEntity[]>(fakeItems);
    });
  });
});
```

#### Key rules

- No `mockNuxtImport` — the repository is a plain function.
- `fetchMock = vi.fn<$Fetch>()` in `beforeEach`; cast as `$Fetch` when passing to the factory.
- Test each method: what endpoint it calls, what options it passes, and what it returns.
- Use `toStrictEqual<ExpectedType>(value)` for return value assertions.

---

### 6.7 Server handlers

**Project:** `nuxt`
**Spec file location:** Colocated with the handler file (`*.handler.spec.ts`).

Server handler tests run in the `nuxt` environment. The globals `$fetch`, `getRouterParam`, `readBody`, and `createError` are all pre-mocked by the global setup files.

```ts
import type { H3Event } from "h3";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { ZodError } from "zod";

import { createFakeItemDto } from "~~/tests/unit/utils/faketories/.../item.dto.faketory";

import { createItemFromDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { getItemsHandler } from "#server/api/goat-it-api/items/handlers/get-all/index.get.handler";

// Mock the helpers module so createGoatItApiEndpoint/createGoatItApiFetchOptions are spies
vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"));

describe("Server Goat It API Items Get Handler", () => {
  beforeEach(() => {
    vi.mocked($fetch).mockResolvedValue([
      createFakeItemDto(),
      createFakeItemDto()
    ]);
  });

  describe(getItemsHandler, () => {
    it("should create the api endpoint when called.", async () => {
      const event = {} as unknown as H3Event;
      await getItemsHandler(event);

      expect(createGoatItApiEndpoint).toHaveBeenCalledExactlyOnceWith("items");
    });

    it("should create api fetch options with the runtime config when called.", async () => {
      const event = {} as unknown as H3Event;
      await getItemsHandler(event);
      const expectedConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.goat-it.com",
        adminKey: "test-admin-key",
      };

      expect(createGoatItApiFetchOptions).toHaveBeenCalledExactlyOnceWith(expectedConfig);
    });

    it("should call $fetch with the built endpoint and options when called.", async () => {
      const event = {} as unknown as H3Event;
      const expectedEndpoint = "/admin/items";
      const expectedOptions = {
        baseURL: "https://api.goat-it.com",
        headers: { "goat-it-api-key": "test-admin-key" }
      };
      vi.mocked(createGoatItApiEndpoint).mockReturnValue(expectedEndpoint);
      vi.mocked(createGoatItApiFetchOptions).mockReturnValue(expectedOptions);
      await getItemsHandler(event);

      expect($fetch).toHaveBeenCalledExactlyOnceWith(expectedEndpoint, expectedOptions);
    });

    it("should return mapped items when called.", async () => {
      const event = {} as unknown as H3Event;
      const fakeDtos = [
        createFakeItemDto(),
        createFakeItemDto()
      ];
      vi.mocked($fetch).mockResolvedValue(fakeDtos);
      const expectedItems = fakeDtos.map(createItemFromDto);
      const result = await getItemsHandler(event);

      expect(result).toStrictEqual<MyEntity[]>(expectedItems);
    });

    it("should throw a ZodError when the API response is invalid.", async () => {
      const event = {} as unknown as H3Event;
      vi.mocked($fetch).mockResolvedValue([{ invalid: true }]);

      await expect(getItemsHandler(event)).rejects.toThrow(ZodError);
    });
  });
});
```

#### Handlers with route params (e.g. `[id].archive.post.handler.ts`)

```ts
it("should call getRouterParam with the id param name when called.", async () => {
  const event = { context: { params: { id: "abc123" } } } as unknown as H3Event;
  vi.mocked(getRouterParam).mockReturnValue("abc123");
  await archiveItemHandler(event);

  expect(getRouterParam).toHaveBeenCalledExactlyOnceWith(event, "id");
});
```

#### Handlers with request body (POST/PATCH)

```ts
it("should call readBody to extract the request body when called.", async () => {
  const event = {} as unknown as H3Event;
  const fakeBody = createFakeItemCreationDto();
  vi.mocked(readBody).mockResolvedValue(fakeBody);
  await createItemHandler(event);

  expect(readBody).toHaveBeenCalledExactlyOnceWith(event);
});
```

#### Key rules

- Always mock the helpers module: `vi.mock(import("#server/utils/goat-it-api/helpers/goat-it-api.helpers"))`.
- Use `{} as unknown as H3Event` for events without params; add `{ context: { params: { id: "..." } } }` for param-based routes.
- Use `vi.mocked($fetch).mockResolvedValue(...)` — `$fetch` is already a global spy.
- The runtime config values injected are `baseUrl: "https://api.goat-it.com"` and `adminKey: "test-admin-key"`.
- Always test the Zod validation error path with invalid data.

---

### 6.8 Server utils / mappers / helpers

**Project:** `node`
**Spec file location:** Colocated with the source file.

These are pure function tests — no mocking, no DOM. Import with `#server/utils/...`.

```ts
import { describe, it, expect } from "vitest";

import { createGoatItApiEndpoint } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";

describe(createGoatItApiEndpoint, () => {
  it("should return the correct endpoint string when called with a resource name.", () => {
    expect(createGoatItApiEndpoint("items")).toBe("/admin/items");
  });
});
```

For mapper tests:

```ts
import { describe, it, expect } from "vitest";

import { createFakeItemDto } from "~~/tests/unit/utils/faketories/.../item.dto.faketory";
import { createItemFromDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";

describe(createItemFromDto, () => {
  it("should return a mapped item from the DTO when called.", () => {
    const dto = createFakeItemDto();
    const result = createItemFromDto(dto);

    expect(result).toStrictEqual<MyEntity>({
      id: dto.id, // ... all mapped fields
    });
  });
});
```

---

### 6.9 Shared helpers

**Project:** `node`
**Spec file location:** Colocated with the helper file.

```ts
import { describe, it, expect } from "vitest";

import { isNonEmptyString } from "~~/shared/utils/helpers/string.helpers";

describe("String Helpers", () => {
  describe(isNonEmptyString, () => {
    it("should return true when input is a non-empty string.", () => {
      expect(isNonEmptyString("hello")).toBeTruthy();
    });

    it("should return false when input is an empty string.", () => {
      expect(isNonEmptyString("")).toBeFalsy();
    });

    it("should return false when input is undefined.", () => {
      expect(isNonEmptyString()).toBeFalsy();
    });
  });
});
```

Use `~~/shared/utils/...` import alias. No mocking. Test all branches including edge cases.

---

### 6.10 i18n translation parity

**Project:** `node`
**Spec file location:** `app/i18n/specs/<name>.translations.spec.ts` (NOT colocated — always in `app/i18n/specs/`)

These tests ensure every locale file has the same keys as the French source file.

```ts
import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frMyFeature from "~/i18n/locales/fr/my-feature.json";
import enMyFeature from "~/i18n/locales/en/my-feature.json";

describe("my-feature.json translations", () => {
  it("should have the same keys in english as in french when context is my-feature.", () => {
    const crushedFrKeys = Object.keys(crush(frMyFeature)).toSorted();
    const crushedEnKeys = Object.keys(crush(enMyFeature)).toSorted();

    expect(crushedEnKeys).toStrictEqual<string[]>(crushedFrKeys);
  });
});
```

- One test per locale pair per JSON file.
- `crush` from `radashi` flattens nested JSON into dot-notation keys.
- Assert sorted EN keys equal sorted FR keys.

---

## 7. Mock infrastructure

All shared mock utilities live in `tests/unit/utils/`.

### 7.1 `ToMock<T>` type

Replaces every function property of `T` with a Vitest `Mock<Fn>`, leaving non-function properties as-is.

```ts
// tests/unit/utils/types/mock.types.ts
type ToMock<Stub> = {
  [Key in keyof Stub]: Stub[Key] extends (...arguments_: unknown[]) => unknown ? Mock<Stub[Key]> : Stub[Key];
};
```

Use it to type your mock objects:

```ts
type MyComposableMock = ToMock<MyComposable>;
```

### 7.2 `MockedPiniaStore<TStoreDefinition>` type

Produces a typed Pinia store where all actions are replaced by Vitest `Mock` functions and getters are unwrapped from `ComputedRef`.

```ts
type MyStoreMock = MockedPiniaStore<typeof useMyStore>;
```

### 7.3 `mockStore` helper

Casts `useStore()` to `MockedPiniaStore<typeof useStore>`. Use it after `mountSuspended` to get a typed store reference with mocked actions.

```ts
import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";

const myStore = mockStore(useMyStore);
// myStore.someAction is a Mock; myStore.someState is writable
```

### 7.4 `MountSuspendedOptions<Component>` type

A convenience type for the second argument of `mountSuspended`:

```ts
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

async function mountMyComponent(options: MountSuspendedOptions<typeof MyComponent> = {}): Promise<VueWrapper> {
  return mountSuspended(MyComponent, { ...options });
}
```

### 7.5 Composable mock files

Each non-trivial composable has a mock triplet in `tests/unit/utils/mocks/composables/<category>/<ComposableName>/`:

| File                       | Purpose                                                                    |
|----------------------------|----------------------------------------------------------------------------|
| `useXxx.mock.ts`           | Exports `type UseXxxMock` and `function createUseXxxMock(): UseXxxMock`    |
| `useXxx.mock.constants.ts` | Optional — exported constants used by tests (e.g. `DEFAULT_MOCKED_LOCALE`) |
| `useXxx.mock.types.ts`     | Optional — extra types used by the mock                                    |

#### Mock factory pattern

```ts
import { vi } from "vitest";
import { computed, ref } from "vue";
import type { ToMock } from "~~/tests/unit/utils/types/mock.types";
import type { UseMyComposable } from "~/composables/.../useMyComposable";

type UseMyComposableMock = ToMock<UseMyComposable>;

function createUseMyComposableMock(): UseMyComposableMock {
  const status = ref<string>("idle");
  return {
    status,
    isIdle: computed(() => status.value === "idle"),
    doSomething: vi.fn<UseMyComposable["doSomething"]>(),
  };
}

export type { UseMyComposableMock };
export { createUseMyComposableMock };
```

### 7.6 Repository mock files

Repository mocks live in `tests/unit/utils/mocks/repositories/goat-it-api/<RepositoryName>/`.

```ts
import { vi } from "vitest";
import type { ToMock } from "~~/tests/unit/utils/types/mock.types";
import type { MyRepository } from "~/repositories/goat-it-api/my-entity/my.repository";

type MyRepositoryMock = ToMock<ReturnType<MyRepository>>;

function createMyRepositoryMock(): MyRepositoryMock {
  return {
    getAll: vi.fn<MyRepositoryMock["getAll"]>(),
    getById: vi.fn<MyRepositoryMock["getById"]>(),
    create: vi.fn<MyRepositoryMock["create"]>(),
  };
}

export type { MyRepositoryMock };
export { createMyRepositoryMock };
```

### 7.7 Registering new mocks

#### New composable mock

1. Create `tests/unit/utils/mocks/composables/<category>/<ComposableName>/useXxx.mock.ts`.
2. Create a setup file `tests/unit/setup/nuxt/composables/use-xxx.nuxt.unit-setup.ts` using `mockNuxtImport`.
3. Add the setup file path to `VITEST_COMPOSABLES_MOCK_SETUP_FILES` in `configs/vitest/vitest.config.constants.ts`.

#### New repository mock

1. Create `tests/unit/utils/mocks/repositories/goat-it-api/<ResourceName>/xxx-repository.mock.ts`.
2. Create a setup file `tests/unit/setup/nuxt/repositories/xxx-repository.nuxt.unit-setup.ts` using `vi.mock(...)` (**not** `mockNuxtImport`).
3. Add the setup file path to `VITEST_REPOSITORIES_MOCK_SETUP_FILES` in `configs/vitest/vitest.config.constants.ts`.

> Repository setup files use `vi.mock(...)` instead of `mockNuxtImport` because repositories are not Nuxt auto-imports.

---

## 8. Faketories

Faketories generate typed fake data for tests. They live in `tests/unit/utils/faketories/`.

### Structure

Each entity typically has two layers:

```
tests/unit/utils/faketories/
  my-entity/
    entity/
      my-entity.entity.faketory.ts   ← domain type (QuestionTheme, etc.)
    dto/
      my-entity.dto.faketory.ts      ← raw API DTO type
```

### Pattern

```ts
import { faker } from "@faker-js/faker";
import { MY_ENTITY_STATUSES } from "@goat-it/schemas/my-entity";

function createFakeMyEntity(myEntity: Partial<MyEntity> = {}): MyEntity {
  return {
    id: faker.database.mongodbObjectId(),
    slug: faker.lorem.slug(),
    name: faker.lorem.word(),
    status: faker.helpers.arrayElement(MY_ENTITY_STATUSES),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(), ...myEntity,  // always spread at the end
  };
}

export { createFakeMyEntity };
```

### Rules

- Accept `Partial<T>` as the only parameter, default to `{}`.
- Always spread `...partialOverride` at the end so callers can override any field.
- Use `faker.database.mongodbObjectId()` for IDs.
- Use `faker.lorem.slug()` for slugs.
- Use `faker.helpers.arrayElement(ENUM_VALUES)` for enum fields.
- DTO faketories produce raw API shapes (dates as ISO strings, etc.); entity faketories produce domain shapes (dates as `Date` objects, etc.).

---

## 9. Naming conventions

| Item               | Convention                                                                                                                                                                                                                                      |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spec files         | `SourceFile.spec.ts`, colocated with source (exceptions: layouts → `spec/`, i18n → `app/i18n/specs/`)                                                                                                                                           |
| `describe` label   | Pass the function/component reference directly: `describe(MyComponent, ...)` or `describe(myFunction, ...)`. Use a string only when no single symbol represents the test subject (e.g. `describe("Server Goat It API Items Get Handler", ...)`) |
| Test names         | `"should <action> when <condition>."` — always end with a period                                                                                                                                                                                |
| Mount helpers      | `async function mountXxxComponent(options: MountSuspendedOptions<typeof Xxx> = {}): Promise<VueWrapper>`                                                                                                                                        |
| Faketory functions | `createFake<Entity>(partial: Partial<Entity> = {}): Entity`                                                                                                                                                                                     |
| Mock type          | `UseXxxMock`                                                                                                                                                                                                                                    |
| Mock factory       | `createUseXxxMock(): UseXxxMock`                                                                                                                                                                                                                |
| Captured variables | `capturedAction`, `capturedOnError` (store tests)                                                                                                                                                                                               |

### Single-call assertion

Always use `toHaveBeenCalledExactlyOnceWith(...)` instead of `toHaveBeenCalledTimes(1)` + `toHaveBeenCalledWith(...)`.

```ts
// Good
expect(myMock).toHaveBeenCalledExactlyOnceWith(expectedArg);

// Avoid
expect(myMock).toHaveBeenCalledTimes(1);
expect(myMock).toHaveBeenCalledWith(expectedArg);
```

---

## 10. Common pitfalls

### Missing dynamic import in composable/store tests

**Wrong:**

```ts
import { useMyComposable } from "@/composables/.../useMyComposable";

describe("useMyComposable", () => {
  it("...", () => {
    const { value } = useMyComposable(); // uses stale mock
  });
});
```

**Correct:** Import dynamically inside `beforeEach` so the module is re-evaluated after `vi.resetModules()`.

---

### Calling `mockStore` before `mountSuspended`

`mockStore` returns `useStore()`, which creates the store. If you call it before mounting, the component may create a different store instance than your test reference.

**Always** call `mockStore(useXxxStore)` **after** `mountSuspended` inside `beforeEach`.

---

### Forgetting `shallow: true` on pages

Page tests stub child components. Without `shallow: true`, the test will attempt to fully render every child (including deeply-nested ones), causing failures and slow tests.

---

### Forgetting to reset `capturedAction` / `capturedOnError` in store tests

The `mockNuxtImport` factory runs once per module load (not per test). Reset `capturedAction = undefined` and `capturedOnError = undefined` at the top of each `beforeEach` to avoid cross-test contamination.

---

### Using `mockNuxtImport` for repository mocks

Repositories are not Nuxt auto-imports — they are regular TypeScript modules. Use `vi.mock(...)` in repository setup files, not `mockNuxtImport`.

---

### Hardcoding locale strings in i18n assertions

The `$t` mock returns the translation key unchanged. Assert against the key:

```ts
// Good
expect(badge.props("label")).toBe("questionThemes.fields.status");

// Wrong
expect(badge.props("label")).toBe("Status"); // hardcoded translated text
```

---

### Not covering all branches

Coverage is enforced at 100%. Make sure to test both truthy and falsy branches, empty vs. non-empty arrays, all status values, and error paths.
