---
name: nuxt
description: Use when working with Nuxt 4 concepts — routing, composables, data fetching, server routes, layouts, middleware, plugins, auto-imports, SSR/hydration, runtime config, state management, error handling, and testing. Load this skill before writing or modifying any Nuxt-specific code in this project.
---

# Nuxt 4

This project uses **Nuxt 4** (`^4.3.1`) with the Nuxt 4 compatibility layer enabled.

Full Nuxt v4 documentation index: https://nuxt.com/llms.txt  
Deep-dive any topic by fetching the corresponding raw doc URL listed there (e.g. `https://nuxt.com/raw/docs/4.x/getting-started/data-fetching.md`).

---

## Directory structure (Nuxt 4 layout)

```
app/
  assets/          # Processed by Vite (CSS, fonts, images)
  components/      # Auto-imported Vue components (PascalCase)
  composables/     # Auto-imported composables (use*.ts)
  layouts/         # Layout components (default.vue, etc.)
  middleware/      # Route middleware
  pages/           # File-based routing
  plugins/         # Vue plugins & Nuxt plugin hooks
  utils/           # Auto-imported utility functions
  app.vue          # Root component
  app.config.ts    # Reactive runtime app configuration
  error.vue        # Full-screen error page
server/
  api/             # API routes (*.get.ts, *.post.ts, …)
  middleware/      # Server middleware
  plugins/         # Nitro plugins
  utils/           # Server-only utilities
shared/            # Shared between app and server
public/            # Static assets (not processed)
nuxt.config.ts     # Nuxt configuration
```

---

## Key concepts

### File-based routing (`app/pages/`)

Every `.vue` file in `pages/` becomes a route. Dynamic segments use `[param]` syntax.

```
pages/
  index.vue          → /
  about.vue          → /about
  users/
    index.vue        → /users
    [id].vue         → /users/:id
    [...slug].vue    → /users/* (catch-all)
```

Use `<NuxtPage />` in `app.vue` or layouts to render the matched page.  
Use `<NuxtLink to="/about">` for client-side navigation.

### Auto-imports

Nuxt auto-imports:

- All Vue APIs (`ref`, `computed`, `watch`, …)
- Composables in `app/composables/` (`use*.ts`)
- Utils in `app/utils/`
- Components in `app/components/`
- Nuxt composables (`useRoute`, `useRouter`, `useFetch`, `useState`, …)

No explicit `import` statements needed for these in `.vue` files or composables.

### Layouts (`app/layouts/`)

```vue
<!-- app/layouts/default.vue -->
<template>
  <div>
    <AppNav/>
    <slot/>
  </div>
</template>
```

Set a layout per page:

```vue
<!-- app/pages/dashboard.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
</script>
```

### Middleware (`app/middleware/`)

Route guards that run before navigation. Named middleware files (`auth.ts`) are referenced in `definePageMeta`.

```ts
// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useAuth()
  if (!loggedIn.value) return navigateTo('/login')
})
```

```vue

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>
```

### Plugins (`app/plugins/`)

Run code when the Vue app initialises. Return helpers via `provide` to make them available via `useNuxtApp()`.

```ts
// app/plugins/my-plugin.ts
export default defineNuxtPlugin(() => {
  return { provide: { greet: (name: string) => `Hello, ${name}!` } }
})
```

### Data fetching

Prefer `useFetch` / `useAsyncData` for SSR-safe data fetching. Both deduplicate requests between server and client.

```ts
// Simple fetch
const {
  data,
  status,
  error,
  refresh
} = await useFetch('/api/users')

// With options
const { data } = await useFetch('/api/users', {
  method: 'POST',
  body: { name: 'Alice' },
  pick: [
    'id',
    'name'
  ]
})

// Custom key + transform
const { data } = await useAsyncData('user-42', () => $fetch('/api/users/42'), {
  transform: (u) => ({
    id: u.id,
    fullName: `${u.first} ${u.last}`
  })
})
```

Use `useLazyFetch` / `useLazyAsyncData` to skip blocking navigation (data loads after mount).

For server-only calls (e.g. calling internal DB), use `$fetch` inside `useAsyncData` — `$fetch` on the server does not make an HTTP round-trip to the Nitro handler; it calls it directly.

### State management

Lightweight shared reactive state:

```ts
// app/composables/useCounter.ts
export const useCounter = () => useState('counter', () => 0)
```

For complex global state this project uses **Pinia** (`use<Entity>Store` naming convention).

### Runtime config

```ts
// nuxt.config.ts
runtimeConfig: {
  // Server-only (private)
  apiSecret: '', // Public (exposed to client)
    public
:
  {
    apiBase: '/api'
  }
}
```

Access at runtime:

```ts
const config = useRuntimeConfig()
config.apiSecret       // server only
config.public.apiBase  // both
```

Values are overridden by env vars: `NUXT_API_SECRET`, `NUXT_PUBLIC_API_BASE`.

### Server routes (Nitro)

API routes live in `server/api/`. File name determines HTTP method.

```ts
// server/api/users.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  return fetchUsers(query)
})

// server/api/users.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return createUser(body)
})
```

Access from the client with `useFetch('/api/users')` or `$fetch('/api/users')`.

### Error handling

```ts
// Throw a typed HTTP error from a server route
throw createError({
  statusCode: 404,
  statusMessage: 'Not found'
})

// Show the error page from a component/composable
throw createError({
  statusCode: 500,
  fatal: true
})

// Clear a handled error
clearError({ redirect: '/' })
```

Custom error page: `app/error.vue` receives an `error` prop.

### SEO / Head

```ts
// Per page
useHead({
  title: 'My page',
  meta: [
    {
      name: 'description',
      content: '…'
    }
  ]
})
useSeoMeta({
  title: 'My page',
  ogTitle: 'My page',
  description: '…'
})
```

### `<ClientOnly>` / hydration

Wrap components that must only render on the client:

```vue

<ClientOnly>
  <ChartComponent/>
  <template #fallback><p>Loading chart…</p></template>
</ClientOnly>
```

Avoid reading browser-only APIs (`window`, `localStorage`) outside `onMounted` or `<ClientOnly>` to prevent hydration mismatches.

### `callOnce`

Run a function exactly once (server OR client, never both):

```ts
await callOnce(async () => {
  await store.fetchInitialData()
})
```

---

## Useful composables (auto-imported)

| Composable                      | Purpose                                     |
|---------------------------------|---------------------------------------------|
| `useRoute()`                    | Current route object                        |
| `useRouter()`                   | Router instance (`push`, `replace`, `back`) |
| `useFetch(url, opts)`           | SSR-safe fetch with caching                 |
| `useAsyncData(key, fn)`         | SSR-safe async data                         |
| `useState(key, init)`           | SSR-friendly shared reactive state          |
| `useCookie(name, opts)`         | Read/write cookies (SSR-safe)               |
| `useRuntimeConfig()`            | Access runtime config                       |
| `useNuxtApp()`                  | Access app instance, plugins, hooks         |
| `useRequestHeaders(keys)`       | Access incoming request headers (server)    |
| `useError()`                    | Current Nuxt error                          |
| `useHead(opts)`                 | Set `<head>` metadata                       |
| `useSeoMeta(opts)`              | Flat SEO meta API                           |
| `navigateTo(to)`                | Programmatic navigation                     |
| `clearError(opts)`              | Clear the global error                      |
| `createError(opts)`             | Create a typed H3 error                     |
| `definePageMeta(meta)`          | Page-level metadata (layout, middleware, …) |
| `defineNuxtRouteMiddleware(fn)` | Declare route middleware                    |
| `defineNuxtPlugin(fn)`          | Declare a Nuxt plugin                       |

---

## Testing Nuxt components

This project uses `@nuxt/test-utils` with Vitest and `happy-dom`.

```ts
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MyComponent from '~/components/MyComponent.vue'

it('renders correctly', async () => {
  const wrapper = await mountSuspended(MyComponent, {
    props: { title: 'Hello' }
  })
  expect(wrapper.text()).toContain('Hello')
})
```

Use `shallow: true` for layout/wrapper tests to avoid deep rendering of child components.

---

## Nuxt config quick reference

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [],             // Nuxt modules
  css: [],                 // Global CSS files
  runtimeConfig: {},       // Server/public runtime config
  app: {
    head: {},              // Global <head> defaults
    pageTransition: {},    // Page transition config
  },
  imports: { dirs: [] },   // Extra auto-import dirs
  components: [],          // Extra component dirs / options
  typescript: {
    strict: true,
    typeCheck: true,
  },
  compatibilityDate: '',   // Required in Nuxt 4
})
```

---

## Further reading

Fetch any section on demand from the raw doc URLs in https://nuxt.com/llms.txt.  
Key v4 pages:

- Routing: `https://nuxt.com/raw/docs/4.x/getting-started/routing.md`
- Data fetching: `https://nuxt.com/raw/docs/4.x/getting-started/data-fetching.md`
- Server: `https://nuxt.com/raw/docs/4.x/getting-started/server.md`
- State management: `https://nuxt.com/raw/docs/4.x/getting-started/state-management.md`
- Error handling: `https://nuxt.com/raw/docs/4.x/getting-started/error-handling.md`
- Auto-imports concept: `https://nuxt.com/raw/docs/4.x/guide/concepts/auto-imports.md`
- Rendering modes: `https://nuxt.com/raw/docs/4.x/guide/concepts/rendering.md`
- Runtime config: `https://nuxt.com/raw/docs/4.x/guide/going-further/runtime-config.md`
- Lifecycle hooks: `https://nuxt.com/raw/docs/4.x/guide/going-further/hooks.md`
- Testing: `https://nuxt.com/raw/docs/4.x/getting-started/testing.md`
- Full API reference: `https://nuxt.com/raw/docs/4.x/api.md`
