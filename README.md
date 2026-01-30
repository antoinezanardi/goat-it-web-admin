# Hello Henri 👋🏻

## Packages to use :

- Typescript
- Nuxt 4 (we can also opt in for Nuxt 5 https://nuxt.com/docs/4.x/getting-started/upgrade#opting-in-to-nuxt-5)
- Pinia
- VueUse
- Nuxt UI
- TailwindCSS
- Nuxt-i18n

## Good practices to follow :

- You can take example of the Werewolves Assistant if you have any doubt on something : https://github.com/antoinezanardi/werewolves-assistant-web-next
- Nuxt structure and conventions are well explained here, always refer to them
- Always use script `setup` syntax
- Use composables for logic reuse
- Use Pinia for state management
- Use Nuxt UI components when possible
- Use VueUse composables when possible
- Use i18n for text content (we'll start with `fr` + `en` for now)
- Never use any `any` type in Typescript
- Components should be tiny and focused on a single task
- Use TailwindCSS for styling, avoid custom SCSS when possible
- Main entities must have their own stores in Pinia, so for Questions and Question Themes, we should have `useQuestionStore` and `useQuestionThemeStore`

## Pages

(This is a draft, we might add/remove some pages later, feel free to suggest changes)

- Dashboard page (`/`)
- Questions management page (`/questions`)
- Question creation/edit page (`/questions/new` and `/questions/:id/edit`)
- Question Themes management page (`/question-themes`). A modal is used to create/edit a theme
- Login Page (`/login`) (not needed in priority)

## Don't care about :

- Pushing to main branch, I'll take care of the git flow process, feel free to push directly to `main` for now
- Tests for now
- Linter for now
- CI for now
- SEO (Admin is not public)

## Thanks a lot for your wonderful help 🙏🏻❤️