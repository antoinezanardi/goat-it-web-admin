# 🐐👑 Goat It Web Admin Versioning Changelog

## [1.5.0](https://github.com/antoinezanardi/goat-it-web-admin/compare/v1.4.0...v1.5.0) (2026-07-15)

### 🚀 Features

* **app:** spa loader on boot ([#378](https://github.com/antoinezanardi/goat-it-web-admin/issues/378)) ([7cef4a6](https://github.com/antoinezanardi/goat-it-web-admin/commit/7cef4a674843cbe91fc9a73de61e4d502a34a980))
* **form-shortcuts:** add auto-focus and Cmd+Enter keyboard shortcut to form modals ([#367](https://github.com/antoinezanardi/goat-it-web-admin/issues/367)) ([7b3051c](https://github.com/antoinezanardi/goat-it-web-admin/commit/7b3051c642026922127ec36616b91b881233d248))
* **questions:** add expandable rows to questions table ([#373](https://github.com/antoinezanardi/goat-it-web-admin/issues/373)) ([a1d0fe8](https://github.com/antoinezanardi/goat-it-web-admin/commit/a1d0fe8a0a66468873e81d5404882722c475f666))
* **questions:** add multi-value theme filter to questions table ([#361](https://github.com/antoinezanardi/goat-it-web-admin/issues/361)) ([4bc3fe4](https://github.com/antoinezanardi/goat-it-web-admin/commit/4bc3fe42730b6e708f32b5d5e994eff16327104b))
* **toasts:** deduplicate Nuxt UI toasts via stable id prop ([#377](https://github.com/antoinezanardi/goat-it-web-admin/issues/377)) ([5e7631b](https://github.com/antoinezanardi/goat-it-web-admin/commit/5e7631b257a44954bf7e1cdef6945e61a7130c02))
* **ui:** add Esc shortcut indicator to DefaultModalFooter close button ([#429](https://github.com/antoinezanardi/goat-it-web-admin/issues/429)) ([98fde5d](https://github.com/antoinezanardi/goat-it-web-admin/commit/98fde5d18e731356a8588c2368ee47d9a7dad01b))

### 📖 Docs

* **agents:** add gatekeeper subagent ([#370](https://github.com/antoinezanardi/goat-it-web-admin/issues/370)) ([ec27f12](https://github.com/antoinezanardi/goat-it-web-admin/commit/ec27f1204f87ee7c6eeed2ee2b17e86fbf3964a0))
* **agents:** enhance agents context and model ([#363](https://github.com/antoinezanardi/goat-it-web-admin/issues/363)) ([0277435](https://github.com/antoinezanardi/goat-it-web-admin/commit/0277435674bf8354bc234046df82bc84bf110fc8))
* **agents:** update AGENTS.md with improved clarity and structure ([#422](https://github.com/antoinezanardi/goat-it-web-admin/issues/422)) ([5235474](https://github.com/antoinezanardi/goat-it-web-admin/commit/52354749540daacd1de40c31c59c1094d9f6f2ed))

### 🎨 Styles

* **question-themes:** constrain table to viewport height ([#406](https://github.com/antoinezanardi/goat-it-web-admin/issues/406)) ([027f703](https://github.com/antoinezanardi/goat-it-web-admin/commit/027f703c832a1bfa7d3bbad2b990f88523668e33))

### 🔩 Refactor

* **filters:** use generic kebab case helper ([#360](https://github.com/antoinezanardi/goat-it-web-admin/issues/360)) ([36b78ad](https://github.com/antoinezanardi/goat-it-web-admin/commit/36b78ad19d381179a4cf3dca104f56288fc7f30d))
* **skills:** extract plan-writer custom skill from upstream writing-plans ([#428](https://github.com/antoinezanardi/goat-it-web-admin/issues/428)) ([8e660e0](https://github.com/antoinezanardi/goat-it-web-admin/commit/8e660e0fdfc8c9fee403975708e46e868afeb2d2))

### 🧹 Chore

* **quality:** bump nuxt-ui to version 4.9.0 and remove mutation tests ([#405](https://github.com/antoinezanardi/goat-it-web-admin/issues/405)) ([e4c33e4](https://github.com/antoinezanardi/goat-it-web-admin/commit/e4c33e4dbb1c5338281123a98a950d3608c5649b))
* **schemas:** upgrade @goat-it/schemas to 0.0.14-beta and override limit to 0 ([#396](https://github.com/antoinezanardi/goat-it-web-admin/issues/396)) ([0f4e3c2](https://github.com/antoinezanardi/goat-it-web-admin/commit/0f4e3c290196511ca8da187d2e436ae8894f32f4))

### 📦 Upgraded Dependencies

| Package | Version |
| --- | :---: |
| `pin conventional-changelog-writer to v9 for conventionalcommits@10 compat` | `` |
| `actions/cache action` | `v6` |
| `actions/setup-node action` | `v7` |
| `commitlint monorepo` | `^21.2.0` |
| `@axe-core/playwright` | `^4.12.1` |
| `@cucumber/cucumber` | `^13.1.0` |
| `@eslint/config-inspector` | `^3.1.0` |
| `@goat-it/schemas` | `^0.0.16` |
| `@iconify-json/lucide` | `^1.2.117` |
| `@nuxtjs/i18n` | `^10.4.1` |
| `@pinia/nuxt` | `v1` |
| `@pinia/testing` | `v2` |
| `@types/node` | `^25.9.5` |
| `@vitest/eslint-plugin` | `^1.6.23` |
| `commitlint` | `^21.2.1` |
| `conventional-changelog-writer` | `^9.2.0` |
| `eslint` | `^10.7.0` |
| `eslint-plugin-oxlint` | `^1.73.0` |
| `eslint-plugin-unicorn` | `v72` |
| `fuse.js` | `^7.5.0` |
| `oxlint` | `^1.73.0` |
| `oxlint-tsgolint` | `^0.24.0` |
| `pinia` | `v4` |
| `semantic-release` | `^25.0.7` |
| `tailwindcss` | `^4.3.2` |
| `type-fest` | `^5.8.0` |
| `node.js` | `v26.5.0` |
| `oxlint monorepo` | `^1.72.0` |
| `playwright monorepo` | `^1.61.1` |
| `pnpm` | `v11.9.0` |
| `raven-actions/actionlint action` | `v2.2.0` |
| `vitest monorepo` | `^4.1.10` |
| `vue-language-tools monorepo` | `^3.3.7` |

## [1.4.0](https://github.com/antoinezanardi/goat-it-web-admin/compare/v1.3.0...v1.4.0) (2026-06-21)

### 🚀 Features

* **agents:** enhance superpowers lifecycle with opencode go agents ([#304](https://github.com/antoinezanardi/goat-it-web-admin/issues/304)) ([0feb949](https://github.com/antoinezanardi/goat-it-web-admin/commit/0feb94993479d5390cad5db3fb7fb765d6a070d7))
* **ai:** add mempalace plugin ([#354](https://github.com/antoinezanardi/goat-it-web-admin/issues/354)) ([2ff714a](https://github.com/antoinezanardi/goat-it-web-admin/commit/2ff714ab91672db487e91e8866a5100a8756124d))
* **filters:** add advanced filtering functionality to QuestionsTable ([#333](https://github.com/antoinezanardi/goat-it-web-admin/issues/333)) ([22b1441](https://github.com/antoinezanardi/goat-it-web-admin/commit/22b14419a09210837c3f7c02152bcdcf591dfa4b))
* **filters:** add status filter to question themes table ([#301](https://github.com/antoinezanardi/goat-it-web-admin/issues/301)) ([51f16b5](https://github.com/antoinezanardi/goat-it-web-admin/commit/51f16b5c8f6f10793db9a2e6459487a9fe9d69a4))
* **question-themes:** add loading spinner inside tables ([#303](https://github.com/antoinezanardi/goat-it-web-admin/issues/303)) ([451e2aa](https://github.com/antoinezanardi/goat-it-web-admin/commit/451e2aa7603f46c877af09063cb527b8819b58b2))
* **questions:** update category names for trivia and riddles ([#297](https://github.com/antoinezanardi/goat-it-web-admin/issues/297)) ([eb43f46](https://github.com/antoinezanardi/goat-it-web-admin/commit/eb43f46a9225a0ff49fb8ad47c49e1ce0b8a45fb))
* **ui:** add filtered row count to questions and themes tables ([#352](https://github.com/antoinezanardi/goat-it-web-admin/issues/352)) ([c535ca7](https://github.com/antoinezanardi/goat-it-web-admin/commit/c535ca787ff432f76bf4226f7b29b127993b5396))

### 📖 Docs

* **agents:** enhance AI dev workflow ([#357](https://github.com/antoinezanardi/goat-it-web-admin/issues/357)) ([5a02e77](https://github.com/antoinezanardi/goat-it-web-admin/commit/5a02e77f29a72d8b038782a9ff5d667fbf5e0f8b))
* **brainstormer:** update process flow ([#350](https://github.com/antoinezanardi/goat-it-web-admin/issues/350)) ([4a786ee](https://github.com/antoinezanardi/goat-it-web-admin/commit/4a786ee70bbc02c2fbb9fa605f5142c72b57c593))
* **skills:** update all skills ([#351](https://github.com/antoinezanardi/goat-it-web-admin/issues/351)) ([3a9ef9e](https://github.com/antoinezanardi/goat-it-web-admin/commit/3a9ef9edd8f88bd42b00ddb64ab538970063a773))

### 🔩 Refactor

* **filters:** move row count into toolbar slot and update filters layout ([#356](https://github.com/antoinezanardi/goat-it-web-admin/issues/356)) ([8d4f55f](https://github.com/antoinezanardi/goat-it-web-admin/commit/8d4f55f8c1dbf39ae6dfe9c34d7fabb7cbeb98f8))

### 🧹 Chore

* **config:** update opencode settings ([#353](https://github.com/antoinezanardi/goat-it-web-admin/issues/353)) ([71985a6](https://github.com/antoinezanardi/goat-it-web-admin/commit/71985a6e677dd3f4379563465e7c5a1efa4d2d68))
* **pnpm:** update minimumReleaseAge to 0 ([40ca6df](https://github.com/antoinezanardi/goat-it-web-admin/commit/40ca6dfd681a10916d2a31361d70e0b685dceb12))

### 📦 Upgraded Dependencies

| Package | Version |
| --- | :---: |
| `actions/checkout action` | `v7` |
| `commitlint monorepo` | `^21.0.2` |
| `@cucumber/cucumber` | `v13` |
| `@eslint/config-inspector` | `^3.0.4` |
| `@faker-js/faker` | `^10.5.0` |
| `@iconify-json/lucide` | `^1.2.114` |
| `@nuxt/eslint` | `^1.16.0` |
| `@nuxt/hints` | `^1.1.3` |
| `@nuxt/ui` | `^4.8.2` |
| `@types/node` | `^25.9.4` |
| `@vitest/eslint-plugin` | `^1.6.20` |
| `@vue/test-utils` | `^2.4.11` |
| `eslint` | `^10.4.1` |
| `eslint-plugin-unicorn` | `v68` |
| `fuse.js` | `^7.4.2` |
| `lint-staged` | `^17.0.8` |
| `type-fest` | `^5.7.0` |
| `vue-eslint-parser` | `^10.4.1` |
| `vue-tsc` | `^3.3.3` |
| `eslint monorepo` | `^10.5.0` |
| `happy-dom monorepo` | `^20.10.6` |
| `node.js` | `v26.3.1` |
| `nuxtjs monorepo` | `^4.4.8` |
| `oxlint monorepo` | `^1.70.0` |
| `playwright monorepo` | `^1.61.0` |
| `pnpm` | `v11.8.0` |
| `semantic-release monorepo` | `^25.0.5` |
| `sonarsource/sonarqube-scan-action action` | `v8.2` |
| `tailwindcss monorepo` | `^4.3.1` |
| `vitest monorepo` | `^4.1.9` |
| `vue-language-tools monorepo` | `^3.3.5` |

## [1.3.0](https://github.com/antoinezanardi/goat-it-web-admin/compare/v1.2.0...v1.3.0) (2026-05-27)

### 🚀 Features

* **form:** enhance form placeholders and add tooltip texts ([#273](https://github.com/antoinezanardi/goat-it-web-admin/issues/273)) ([56a67bd](https://github.com/antoinezanardi/goat-it-web-admin/commit/56a67bdabc1b790540ad25ff7661f3729ad76852))
* **header:** implement mobile navigation menu and improve responsiveness ([#281](https://github.com/antoinezanardi/goat-it-web-admin/issues/281)) ([657d12b](https://github.com/antoinezanardi/goat-it-web-admin/commit/657d12be72f3c412c3ea0bd755771ef9712c3815))
* **question-form:** enhance theme management and source URL validation ([#258](https://github.com/antoinezanardi/goat-it-web-admin/issues/258)) ([4ee84dd](https://github.com/antoinezanardi/goat-it-web-admin/commit/4ee84dde33474e19f67582c1da4921f83bb325b9))
* **question-source-url-tag:** add clickable source URL tags with tooltips ([#266](https://github.com/antoinezanardi/goat-it-web-admin/issues/266)) ([9bcf449](https://github.com/antoinezanardi/goat-it-web-admin/commit/9bcf4496d0abcfe37ce62d09ad408a0292652dba))
* **question-theme-selector:** improve theme assignment UI and functionality ([#280](https://github.com/antoinezanardi/goat-it-web-admin/issues/280)) ([e8b7b90](https://github.com/antoinezanardi/goat-it-web-admin/commit/e8b7b905779390e9a3903e667e95fcb348642747))
* **question:** add optional trivia field to question creation ([#270](https://github.com/antoinezanardi/goat-it-web-admin/issues/270)) ([17d8958](https://github.com/antoinezanardi/goat-it-web-admin/commit/17d8958795605a25ffd72c6d461ef463f308f185))
* **question:** create question form ([#225](https://github.com/antoinezanardi/goat-it-web-admin/issues/225)) ([ffa8e18](https://github.com/antoinezanardi/goat-it-web-admin/commit/ffa8e186529cb831037874d1591adce1371ba4aa))
* **question:** enhance theme assignment functionality in question form ([#276](https://github.com/antoinezanardi/goat-it-web-admin/issues/276)) ([dac037e](https://github.com/antoinezanardi/goat-it-web-admin/commit/dac037e2aaaac18d087e63bce4b11ef23b2d3c5a))
* **question:** implement question editing functionality ([#271](https://github.com/antoinezanardi/goat-it-web-admin/issues/271)) ([3e21993](https://github.com/antoinezanardi/goat-it-web-admin/commit/3e21993383ac10b7f78b6317ea9fa038853f9898))
* **questions-table:** implement basic table ([#222](https://github.com/antoinezanardi/goat-it-web-admin/issues/222)) ([03c679f](https://github.com/antoinezanardi/goat-it-web-admin/commit/03c679fe8c185e1778883e889487b854068c5976))
* **questions:** implement CRUD operations for questions ([#214](https://github.com/antoinezanardi/goat-it-web-admin/issues/214)) ([3d505bf](https://github.com/antoinezanardi/goat-it-web-admin/commit/3d505bf12bc01133319955a733d9da3b7f23241c)), closes [/#diff-c2fc7fed83e21ad651b8bbb9033b560c462ba903c671a6daaad4c7e43ae85fefL11-R30](https://github.com/antoinezanardi///issues/diff-c2fc7fed83e21ad651b8bbb9033b560c462ba903c671a6daaad4c7e43ae85fefL11-R30)
* **questions:** implement modify question functionality ([#218](https://github.com/antoinezanardi/goat-it-web-admin/issues/218)) ([adb8f74](https://github.com/antoinezanardi/goat-it-web-admin/commit/adb8f7403c55c794cc2088c42e6ae242265f96eb))
* **tests:** add acceptance tests with skip build option ([#269](https://github.com/antoinezanardi/goat-it-web-admin/issues/269)) ([30986f1](https://github.com/antoinezanardi/goat-it-web-admin/commit/30986f1d1f0643c924cb14ad506523cc830a9e22)), closes [/#diff-6bee45e1539476923a6cc5df3d74a1e3900ef99edd7c3bcd1537c226d44cf290R1-R13](https://github.com/antoinezanardi///issues/diff-6bee45e1539476923a6cc5df3d74a1e3900ef99edd7c3bcd1537c226d44cf290R1-R13)
* **translation:** enhance localization support and add translation components ([#202](https://github.com/antoinezanardi/goat-it-web-admin/issues/202)) ([f39c41e](https://github.com/antoinezanardi/goat-it-web-admin/commit/f39c41ea6336616c4e436034d942cd1a5028428c))

### 🐛 Bug Fixes

* prevent reka-ui DismissableLayer infinite recursion with happy-dom ([#213](https://github.com/antoinezanardi/goat-it-web-admin/issues/213)) ([d6e0628](https://github.com/antoinezanardi/goat-it-web-admin/commit/d6e062809593160bf220bcb11fcb84a1dd060f5c)), closes [#34](https://github.com/antoinezanardi/goat-it-web-admin/issues/34) [#43](https://github.com/antoinezanardi/goat-it-web-admin/issues/43) [#43](https://github.com/antoinezanardi/goat-it-web-admin/issues/43) [#34](https://github.com/antoinezanardi/goat-it-web-admin/issues/34) [#34](https://github.com/antoinezanardi/goat-it-web-admin/issues/34) [#34](https://github.com/antoinezanardi/goat-it-web-admin/issues/34) [#34](https://github.com/antoinezanardi/goat-it-web-admin/issues/34) [#34](https://github.com/antoinezanardi/goat-it-web-admin/issues/34) [#34](https://github.com/antoinezanardi/goat-it-web-admin/issues/34)
* **tests:** improve i18n mock setup to prevent flaky tests ([#261](https://github.com/antoinezanardi/goat-it-web-admin/issues/261)) ([f87f712](https://github.com/antoinezanardi/goat-it-web-admin/commit/f87f71262491a478213a0b2ee97cdc8a849053fb))

### 📖 Docs

* **acceptance-testing:** add comprehensive acceptance testing guide ([#211](https://github.com/antoinezanardi/goat-it-web-admin/issues/211)) ([e5aba25](https://github.com/antoinezanardi/goat-it-web-admin/commit/e5aba252a5c8a4948af3aa25d76fff5afb458cc5))
* **acceptance-testing:** enhance acceptance testing documentation ([#286](https://github.com/antoinezanardi/goat-it-web-admin/issues/286)) ([874b2ff](https://github.com/antoinezanardi/goat-it-web-admin/commit/874b2ffd5585494942f21c3c4d4bf0cf8c78552d))

### ⚡️ Performance

* **acceptance-tests:** optimize parallel execution and sandbox setup ([#220](https://github.com/antoinezanardi/goat-it-web-admin/issues/220)) ([98f2bed](https://github.com/antoinezanardi/goat-it-web-admin/commit/98f2bedf429f81d6f3deadb7027c7efcc3c264d7)), closes [/#diff-9bbac992ce74c418fb49ead0e80d32331590d6f0f2e1c35c03c88af679d112abR3-R15](https://github.com/antoinezanardi///issues/diff-9bbac992ce74c418fb49ead0e80d32331590d6f0f2e1c35c03c88af679d112abR3-R15) [/#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519L84-R84](https://github.com/antoinezanardi///issues/diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519L84-R84) [/#diff-5526c664caa40be630500fa3935931d860759e4f24e1ab742a4b41becd9399e3L1-L20](https://github.com/antoinezanardi///issues/diff-5526c664caa40be630500fa3935931d860759e4f24e1ab742a4b41becd9399e3L1-L20) [/#diff-5c3fa597431eda03ac3339ae6bf7f05e1a50d6fc7333679ec38e21b337cb6721L152-R152](https://github.com/antoinezanardi///issues/diff-5c3fa597431eda03ac3339ae6bf7f05e1a50d6fc7333679ec38e21b337cb6721L152-R152)

### 🧹 Chore

* **lint:** add Oxlint rule checker and update configurations ([#284](https://github.com/antoinezanardi/goat-it-web-admin/issues/284)) ([cb772c6](https://github.com/antoinezanardi/goat-it-web-admin/commit/cb772c64d35d4bf92f11d73e563b23c9b8d19e3b))
* **oxlint:** implement missing oxlint rules in configuration ([#285](https://github.com/antoinezanardi/goat-it-web-admin/issues/285)) ([8d61715](https://github.com/antoinezanardi/goat-it-web-admin/commit/8d61715d0c78e4a3c14ac4102f2dfb020e045419))

### 📦 Upgraded Dependencies

| Package | Version |
| --- | :---: |
| `commitlint monorepo` | `^21.0.1` |
| `commitlint monorepo to v21 (major)` | `` |
| `@axe-core/playwright` | `^4.11.3` |
| `@cucumber/cucumber` | `^12.9.0` |
| `@eslint/config-inspector` | `v3` |
| `@iconify-json/lucide` | `^1.2.109` |
| `@nuxt/hints` | `^1.1.2` |
| `@nuxt/ui` | `^4.8.0` |
| `@nuxtjs/i18n` | `^10.4.0` |
| `@semantic-release/release-notes-generator` | `^14.1.1` |
| `@vitest/eslint-plugin` | `^1.6.18` |
| `@vue/test-utils` | `^2.4.10` |
| `eslint` | `^10.4.0` |
| `lint-staged` | `v17` |
| `nuxt` | `^4.4.6` |
| `oxlint-tsgolint` | `^0.23.0` |
| `radashi` | `^12.9.1` |
| `tailwindcss` | `^4.3.0` |
| `vue-tsc` | `^3.3.2` |
| `zod` | `^4.4.3` |
| `oxlint monorepo` | `^1.67.0` |
| `playwright monorepo` | `^1.60.0` |
| `pnpm` | `v11.1.2` |
| `sonarsource/sonarqube-scan-action action` | `v8.1` |
| `vitest monorepo` | `^4.1.7` |
| `vueuse monorepo` | `^14.3.0` |

## [1.2.0](https://github.com/antoinezanardi/goat-it-web-admin/compare/v1.1.0...v1.2.0) (2026-04-28)

### 🚀 Features

* **acceptance-tests:** add initial Playwright and Cucumber setup ([#176](https://github.com/antoinezanardi/goat-it-web-admin/issues/176)) ([15f9888](https://github.com/antoinezanardi/goat-it-web-admin/commit/15f98888f81770cc7ee1a2c87517dca21b368237))
* **changelog:** enhance release notes generation with dependencies table ([#144](https://github.com/antoinezanardi/goat-it-web-admin/issues/144)) ([4502831](https://github.com/antoinezanardi/goat-it-web-admin/commit/45028310439eb050f56e0d54cf1f610d616310b4))
* **color-picker:** enhance input color picker functionality and tests ([#196](https://github.com/antoinezanardi/goat-it-web-admin/issues/196)) ([d12c620](https://github.com/antoinezanardi/goat-it-web-admin/commit/d12c6200cd6d80d82f00be6d7e7a7d1329dd7912))
* **color:** add RGB and hex color utilities and constants ([#159](https://github.com/antoinezanardi/goat-it-web-admin/issues/159)) ([283f7e9](https://github.com/antoinezanardi/goat-it-web-admin/commit/283f7e9b012c504893c856e5d77d6215e0629504))
* **docker:** add update and restart scripts for API sandbox ([#128](https://github.com/antoinezanardi/goat-it-web-admin/issues/128)) ([9ee5e97](https://github.com/antoinezanardi/goat-it-web-admin/commit/9ee5e970d448d01a807ec88ad8febe852569ae94))
* **errors:** enhance error handling and i18n support in server utilities ([#143](https://github.com/antoinezanardi/goat-it-web-admin/issues/143)) ([1f315f8](https://github.com/antoinezanardi/goat-it-web-admin/commit/1f315f8e967f31e81782380d30d6f58f8045ffb0))
* **i18n:** add support for multiple languages in locale files ([#170](https://github.com/antoinezanardi/goat-it-web-admin/issues/170)) ([9e25a88](https://github.com/antoinezanardi/goat-it-web-admin/commit/9e25a8819acda04497040780812795215121d9f5))
* **question-theme:** add icons for question themes ([#158](https://github.com/antoinezanardi/goat-it-web-admin/issues/158)) ([f0a4ef2](https://github.com/antoinezanardi/goat-it-web-admin/commit/f0a4ef213ceb4204cc5f3b5f4d8c51bdfd5adf5f))
* **question-theme:** implement modal for creating new themes ([#109](https://github.com/antoinezanardi/goat-it-web-admin/issues/109)) ([49b1058](https://github.com/antoinezanardi/goat-it-web-admin/commit/49b10580ee9148e4b29ab35d8c535c29da5eba24)), closes [/#diff-0242f308605698d24ceb7d4a4ba16169db0ad1bcea41ee4bcbec5393cbea1759R1-R31](https://github.com/antoinezanardi///issues/diff-0242f308605698d24ceb7d4a4ba16169db0ad1bcea41ee4bcbec5393cbea1759R1-R31) [/#diff-22ce5cf7564b204c59f20608ee0d5a6e8f4e915de0b206d68c867e448076877fR7-R11](https://github.com/antoinezanardi///issues/diff-22ce5cf7564b204c59f20608ee0d5a6e8f4e915de0b206d68c867e448076877fR7-R11)
* **question-themes:** add archive action with confirm dialog ([#166](https://github.com/antoinezanardi/goat-it-web-admin/issues/166)) ([84abc30](https://github.com/antoinezanardi/goat-it-web-admin/commit/84abc30e0e9bf53475761e64b90d554afde9f84a))
* **question-themes:** add edit functionality for question themes ([#167](https://github.com/antoinezanardi/goat-it-web-admin/issues/167)) ([46da622](https://github.com/antoinezanardi/goat-it-web-admin/commit/46da622b31428d6e414cb190212c7c9391d06e21))
* **table:** implement global filter functionality ([#174](https://github.com/antoinezanardi/goat-it-web-admin/issues/174)) ([a1cd79d](https://github.com/antoinezanardi/goat-it-web-admin/commit/a1cd79d5411d80bc2911b650386237b0f3c4a4a0))
* **tests:** enhance acceptance tests with API sandbox and wait state ([#190](https://github.com/antoinezanardi/goat-it-web-admin/issues/190)) ([7c97fef](https://github.com/antoinezanardi/goat-it-web-admin/commit/7c97fef758e6913279e26b0e8ad29d3d78b66237))
* **translations:** add validation messages and slug uniqueness check ([#156](https://github.com/antoinezanardi/goat-it-web-admin/issues/156)) ([d2afd76](https://github.com/antoinezanardi/goat-it-web-admin/commit/d2afd762910a765e8134f358d2cfe6a3538bdf32))

### 🐛 Bug Fixes

* sort header navigation items by page meta order ([#138](https://github.com/antoinezanardi/goat-it-web-admin/issues/138)) ([bc8329b](https://github.com/antoinezanardi/goat-it-web-admin/commit/bc8329b4ade2870e2f9513ba5f4bae6bbe1feabb))
* **v8:** correct mapping issues in components and tests ([#141](https://github.com/antoinezanardi/goat-it-web-admin/issues/141)) ([6df8355](https://github.com/antoinezanardi/goat-it-web-admin/commit/6df8355e5269ad18f7bb4d02ae4707946f5a2bde))

### 📖 Docs

* superpowers skills ([#153](https://github.com/antoinezanardi/goat-it-web-admin/issues/153)) ([09751cb](https://github.com/antoinezanardi/goat-it-web-admin/commit/09751cba321e9956c8f3e0006349f0d97489ffaa))

### ⚡️ Performance

* **tests:** improve unit test setup and configuration ([#172](https://github.com/antoinezanardi/goat-it-web-admin/issues/172)) ([000c1b1](https://github.com/antoinezanardi/goat-it-web-admin/commit/000c1b14c6c04f777d88afa3d1f67bf772cc5d70))

### ✅ Tests

* enhance unit tests with data-testid attributes for better targeting ([#121](https://github.com/antoinezanardi/goat-it-web-admin/issues/121)) ([dddaf87](https://github.com/antoinezanardi/goat-it-web-admin/commit/dddaf87790c0234312af4275d1aca1d3e77040e0))
* **question-theme:** enhance question theme creation and validation tests ([#197](https://github.com/antoinezanardi/goat-it-web-admin/issues/197)) ([c11d869](https://github.com/antoinezanardi/goat-it-web-admin/commit/c11d869592969be0a7e85f3c7103ffc0958d1c0d))

### 📦 Upgraded Dependencies

| Package | Version |
| --- | :---: |
| `@nuxt/test-utils to version 4.0.2` | `` |
| `actions/github-script action` | `v9` |
| `actions/upload-artifact action` | `v7` |
| `@axe-core/playwright` | `^4.11.2` |
| `@cucumber/cucumber` | `^12.8.2` |
| `@eslint/config-inspector` | `v2` |
| `@faker-js/faker` | `^10.4.0` |
| `@goat-it/schemas` | `^0.0.8` |
| `@iconify-json/lucide` | `^1.2.99` |
| `@nuxt/hints` | `^1.0.3` |
| `@nuxt/ui` | `^4.7.0` |
| `@nuxtjs/i18n` | `^10.2.4` |
| `@vitest/eslint-plugin` | `^1.6.16` |
| `@vue/test-utils` | `^2.4.9` |
| `commitlint` | `^20.5.2` |
| `eslint` | `^10.2.1` |
| `eslint-plugin-oxlint` | `^1.62.0` |
| `eslint-plugin-unicorn` | `v64` |
| `happy-dom` | `^20.9.0` |
| `nuxt` | `^4.4.2` |
| `oxlint` | `^1.62.0` |
| `oxlint-tsgolint` | `^0.22.1` |
| `tailwindcss` | `^4.2.4` |
| `type-fest` | `^5.6.0` |
| `typescript` | `v6` |
| `vue-tsc` | `^3.2.7` |
| `node.js` | `v25.9.0` |
| `oxlint monorepo` | `^1.61.0` |
| `playwright monorepo` | `^1.59.1` |
| `pnpm` | `v10.33.2` |
| `pnpm/action-setup action` | `v6` |
| `sonarsource/sonarqube-scan-action action` | `v7.1.0` |
| `stryker-js monorepo` | `^9.6.1` |
| `vitest monorepo` | `^4.1.5` |

## [1.1.0](https://github.com/antoinezanardi/goat-it-web-admin/compare/v1.0.0...v1.1.0) (2026-03-19)

### 🚀 Features

* **api:** implement CRUD endpoints for question themes ([#74](https://github.com/antoinezanardi/goat-it-web-admin/issues/74)) ([33a255d](https://github.com/antoinezanardi/goat-it-web-admin/commit/33a255d3c75d29eff3f8baeee4b3dc5dcd59b061)), closes [/#diff-f94dde64d86c1d7650ab452bc2d45227176a5f43ce088dd77ed2dcf944442cc1R1-R21](https://github.com/antoinezanardi///issues/diff-f94dde64d86c1d7650ab452bc2d45227176a5f43ce088dd77ed2dcf944442cc1R1-R21) [/#diff-040936fb38f0a5817b0478e3ed7f517387505373d3c353c22193ac4a18279001R1-R24](https://github.com/antoinezanardi///issues/diff-040936fb38f0a5817b0478e3ed7f517387505373d3c353c22193ac4a18279001R1-R24) [/#diff-8db6e06a6c566fdc40b793ddac0a31b5109a549dac823360e560e5d8dafe8d27R1-R3](https://github.com/antoinezanardi///issues/diff-8db6e06a6c566fdc40b793ddac0a31b5109a549dac823360e560e5d8dafe8d27R1-R3) [/#diff-96412432ae05640b55fac08419cc8b493516733ebf63d19a0909677a4e8331c6R1-R3](https://github.com/antoinezanardi///issues/diff-96412432ae05640b55fac08419cc8b493516733ebf63d19a0909677a4e8331c6R1-R3) [/#diff-2b01dfe6f4d079e96f2d66b879c8f003dc28e0053b9efdec6fc8682425a1591aR1-R87](https://github.com/antoinezanardi///issues/diff-2b01dfe6f4d079e96f2d66b879c8f003dc28e0053b9efdec6fc8682425a1591aR1-R87) [/#diff-09a5569f7adac97f4b6f002488d01dda4bf1214f5175de212ae693eb72e390ffR1-R90](https://github.com/antoinezanardi///issues/diff-09a5569f7adac97f4b6f002488d01dda4bf1214f5175de212ae693eb72e390ffR1-R90)
* **api:** implement Goat It API integration for question themes ([#55](https://github.com/antoinezanardi/goat-it-web-admin/issues/55)) ([1ce5110](https://github.com/antoinezanardi/goat-it-web-admin/commit/1ce5110ead74422852d78de7956cda9b837745ac))
* **app:** implement dynamic page titles using useHead ([#88](https://github.com/antoinezanardi/goat-it-web-admin/issues/88)) ([508e475](https://github.com/antoinezanardi/goat-it-web-admin/commit/508e475eebd51a7ba82c1d20560c2e6b7e3d1f3c))
* **docker:** add API sandbox configuration and commands ([#49](https://github.com/antoinezanardi/goat-it-web-admin/issues/49)) ([abea118](https://github.com/antoinezanardi/goat-it-web-admin/commit/abea1181ffea4fe1d9683b9b9e10d175c2d50d05))
* **loading-spinner:** add LoadingSpinner component and types ([#78](https://github.com/antoinezanardi/goat-it-web-admin/issues/78)) ([c093e05](https://github.com/antoinezanardi/goat-it-web-admin/commit/c093e057a49b98cea029061ce808168c06281de8))
* **localization:** localized text component ([#89](https://github.com/antoinezanardi/goat-it-web-admin/issues/89)) ([390bedd](https://github.com/antoinezanardi/goat-it-web-admin/commit/390beddec4bcb3dd357966e977adcc0712da3d73))
* **page-header:** add PageHeader component and related types ([#77](https://github.com/antoinezanardi/goat-it-web-admin/issues/77)) ([3490236](https://github.com/antoinezanardi/goat-it-web-admin/commit/3490236a4b245057cc9b64677cb3920a05757759)), closes [/#diff-c7326abdc134a98a6fe89b0aa7b9483e5d5e2380d1b5032b59276e636d564440R1-R50](https://github.com/antoinezanardi///issues/diff-c7326abdc134a98a6fe89b0aa7b9483e5d5e2380d1b5032b59276e636d564440R1-R50) [/#diff-5977891bf10802cdd3cde62f0355105a1662e65b02ae4fb404a27bb0f5f53a07R11-R16](https://github.com/antoinezanardi///issues/diff-5977891bf10802cdd3cde62f0355105a1662e65b02ae4fb404a27bb0f5f53a07R11-R16)
* **question-themes:** add aliases support and related components ([#83](https://github.com/antoinezanardi/goat-it-web-admin/issues/83)) ([5eacac3](https://github.com/antoinezanardi/goat-it-web-admin/commit/5eacac3ec8955b4ac769bc55aed7d5a6b75ef20d))
* **question-themes:** add basic question themes datatable ([#82](https://github.com/antoinezanardi/goat-it-web-admin/issues/82)) ([5b3575c](https://github.com/antoinezanardi/goat-it-web-admin/commit/5b3575c58159602ed3b091a7d59c64eb55e6f849)), closes [/#diff-2e01babb450329f8d278be4b204efed75beb797291fcf08ce206c265f1855555R1-R176](https://github.com/antoinezanardi///issues/diff-2e01babb450329f8d278be4b204efed75beb797291fcf08ce206c265f1855555R1-R176) [/#diff-62e2db2e76996a1c2a7908ace0005ac6c83af2125cbf26853daadbd610261d3cR6-R39](https://github.com/antoinezanardi///issues/diff-62e2db2e76996a1c2a7908ace0005ac6c83af2125cbf26853daadbd610261d3cR6-R39) [/#diff-8420ff0933660f7fde48372cdccd5fe07208b10cd9449300cc99eaa5b6fd59f6L8-R11](https://github.com/antoinezanardi///issues/diff-8420ff0933660f7fde48372cdccd5fe07208b10cd9449300cc99eaa5b6fd59f6L8-R11)
* **question-themes:** implement question themes store and fetch logic ([#60](https://github.com/antoinezanardi/goat-it-web-admin/issues/60)) ([790085e](https://github.com/antoinezanardi/goat-it-web-admin/commit/790085ea9abfa4e80044a6dbe0d7dd4a9b9e5bea))
* **tests:** add unit setup for composables and repositories ([#72](https://github.com/antoinezanardi/goat-it-web-admin/issues/72)) ([e404163](https://github.com/antoinezanardi/goat-it-web-admin/commit/e404163dc7f874d7bcf210cfe17fd20865310dc3))
* **tooltip:** implement color mode switch tooltip in header ([#87](https://github.com/antoinezanardi/goat-it-web-admin/issues/87)) ([3af1151](https://github.com/antoinezanardi/goat-it-web-admin/commit/3af1151a012f0537395283f4763f2ea19fd97028))

### 📖 Docs

* **agents-skills:** add documentation for VueUse utilities ([#58](https://github.com/antoinezanardi/goat-it-web-admin/issues/58)) ([07d1734](https://github.com/antoinezanardi/goat-it-web-admin/commit/07d1734637fe9766ae6683d312b7b9c45c47c98d)), closes [/#diff-de3fca9beca276f21db3f0bfa60754674619869ef1dce538f71748a79f037ac0R1-R334](https://github.com/antoinezanardi///issues/diff-de3fca9beca276f21db3f0bfa60754674619869ef1dce538f71748a79f037ac0R1-R334) [/#diff-ca6fa1b626f18cb33e9e8e54f8aa7e6dace09782ec6fad3a36d23bd73e9629f8R1-R377](https://github.com/antoinezanardi///issues/diff-ca6fa1b626f18cb33e9e8e54f8aa7e6dace09782ec6fad3a36d23bd73e9629f8R1-R377) [/#diff-d64e44b506a79af19c3a25bdc2035eb227aee22766d003d6c965a08f494ac61eR1-R127](https://github.com/antoinezanardi///issues/diff-d64e44b506a79af19c3a25bdc2035eb227aee22766d003d6c965a08f494ac61eR1-R127)
* **agents:** unit testing documentation ([#84](https://github.com/antoinezanardi/goat-it-web-admin/issues/84)) ([6970753](https://github.com/antoinezanardi/goat-it-web-admin/commit/697075364f9da0e91886e6f17d5bcfaddef51828))

### ✅ Tests

* **translations:** add tests for translation JSON files ([#75](https://github.com/antoinezanardi/goat-it-web-admin/issues/75)) ([b99c3ca](https://github.com/antoinezanardi/goat-it-web-admin/commit/b99c3ca032ada30f817dec797b5551b91d6646d5))

### 🧹 Chore

* **deps:** update commitlint monorepo to ^20.4.4 ([#62](https://github.com/antoinezanardi/goat-it-web-admin/issues/62)) ([a4cd9c4](https://github.com/antoinezanardi/goat-it-web-admin/commit/a4cd9c43c47cf6a5f98cd9c0ea24325ccd28c990))
* **deps:** update commitlint monorepo to ^20.5.0 ([#79](https://github.com/antoinezanardi/goat-it-web-admin/issues/79)) ([48050b7](https://github.com/antoinezanardi/goat-it-web-admin/commit/48050b724daffac1bc404285267e80d4badee1c6))
* **deps:** update dependency @iconify-json/lucide to ^1.2.97 ([#61](https://github.com/antoinezanardi/goat-it-web-admin/issues/61)) ([381be31](https://github.com/antoinezanardi/goat-it-web-admin/commit/381be3155a0a524fc00336f37328e106af871c66))
* **deps:** update dependency @iconify-json/lucide to ^1.2.98 ([#76](https://github.com/antoinezanardi/goat-it-web-admin/issues/76)) ([4e2ad0a](https://github.com/antoinezanardi/goat-it-web-admin/commit/4e2ad0a208d2dd0f97f8e42f4998ba553347500e))
* **deps:** update dependency @nuxt/hints to ^1.0.0 ([#63](https://github.com/antoinezanardi/goat-it-web-admin/issues/63)) ([be0676b](https://github.com/antoinezanardi/goat-it-web-admin/commit/be0676b4c56e562d36671fe159842e6d0d3a9419))
* **deps:** update dependency @vitest/eslint-plugin to ^1.6.10 ([#51](https://github.com/antoinezanardi/goat-it-web-admin/issues/51)) ([7f48a99](https://github.com/antoinezanardi/goat-it-web-admin/commit/7f48a995f1fda971ae2a9b0d6ab8bbc7837e6f9f))
* **deps:** update dependency @vitest/eslint-plugin to ^1.6.11 ([#64](https://github.com/antoinezanardi/goat-it-web-admin/issues/64)) ([7b5d564](https://github.com/antoinezanardi/goat-it-web-admin/commit/7b5d5649841dffa68af338d81b1944dabfab28bb))
* **deps:** update dependency @vitest/eslint-plugin to ^1.6.12 ([#71](https://github.com/antoinezanardi/goat-it-web-admin/issues/71)) ([b376da7](https://github.com/antoinezanardi/goat-it-web-admin/commit/b376da786739111d892f31d6f3f5b0ed1ea034fd))
* **deps:** update dependency happy-dom to ^20.8.4 ([#65](https://github.com/antoinezanardi/goat-it-web-admin/issues/65)) ([c198414](https://github.com/antoinezanardi/goat-it-web-admin/commit/c1984142cb1b5d6d255f58e6b0f2a371d4fbccdf))
* **deps:** update dependency lint-staged to ^16.3.3 ([#53](https://github.com/antoinezanardi/goat-it-web-admin/issues/53)) ([357d4f8](https://github.com/antoinezanardi/goat-it-web-admin/commit/357d4f8519e33699cae64d4a8f111441dba4ce29))
* **deps:** update dependency lint-staged to ^16.4.0 ([#73](https://github.com/antoinezanardi/goat-it-web-admin/issues/73)) ([66efbaf](https://github.com/antoinezanardi/goat-it-web-admin/commit/66efbaf1fe43e029437908b4d506dba97457a6f0))
* **deps:** update dependency oxlint to ^1.52.0 ([#54](https://github.com/antoinezanardi/goat-it-web-admin/issues/54)) ([ca317cc](https://github.com/antoinezanardi/goat-it-web-admin/commit/ca317cc05163bccd8db6e89d1924d46eeca2b498))
* **deps:** update dependency oxlint to ^1.53.0 ([#57](https://github.com/antoinezanardi/goat-it-web-admin/issues/57)) ([bb42610](https://github.com/antoinezanardi/goat-it-web-admin/commit/bb4261006c3135d599515971ca5bc98c317a8872))
* **deps:** update dependency oxlint-tsgolint to ^0.17.0 ([#80](https://github.com/antoinezanardi/goat-it-web-admin/issues/80)) ([3290d4e](https://github.com/antoinezanardi/goat-it-web-admin/commit/3290d4e9f65034b443de87720a40534c4f0f7e7f))
* **deps:** update dependency tailwindcss to ^4.2.2 ([#90](https://github.com/antoinezanardi/goat-it-web-admin/issues/90)) ([f73116a](https://github.com/antoinezanardi/goat-it-web-admin/commit/f73116aac17a3534597eab92efaff2be10653b8c))
* **deps:** update dependency vue-tsc to ^3.2.6 ([#85](https://github.com/antoinezanardi/goat-it-web-admin/issues/85)) ([adfa56e](https://github.com/antoinezanardi/goat-it-web-admin/commit/adfa56e8ee8fb483004ad31914317c3bd6baadd2))
* **deps:** update node.js ([#59](https://github.com/antoinezanardi/goat-it-web-admin/issues/59)) ([4e0d4d6](https://github.com/antoinezanardi/goat-it-web-admin/commit/4e0d4d61c4f4d3b27918a03fba74b9c4e9397433))
* **deps:** update node.js to v25.8.1 ([#70](https://github.com/antoinezanardi/goat-it-web-admin/issues/70)) ([7091863](https://github.com/antoinezanardi/goat-it-web-admin/commit/70918635f9b36329afd1e8be75683ba8fec6c245))
* **deps:** update oxlint monorepo to ^1.55.0 ([#67](https://github.com/antoinezanardi/goat-it-web-admin/issues/67)) ([fc7b8fb](https://github.com/antoinezanardi/goat-it-web-admin/commit/fc7b8fbb3b8be6f624c5b446c83fb6df87fac75e))
* **deps:** update oxlint monorepo to ^1.56.0 ([#81](https://github.com/antoinezanardi/goat-it-web-admin/issues/81)) ([2812021](https://github.com/antoinezanardi/goat-it-web-admin/commit/2812021e7a2ab8230c304cec6e61c16ee0a020f2))
* **deps:** update pnpm to v10.32.0 ([#52](https://github.com/antoinezanardi/goat-it-web-admin/issues/52)) ([f5bdf81](https://github.com/antoinezanardi/goat-it-web-admin/commit/f5bdf81e274d07f6dbac27357ee6644e96481eec))
* **deps:** update pnpm to v10.32.1 ([#56](https://github.com/antoinezanardi/goat-it-web-admin/issues/56)) ([b24f204](https://github.com/antoinezanardi/goat-it-web-admin/commit/b24f204abc516e78ed902ce5bb0bafe787d0cb45))
* **deps:** update pnpm/action-setup action to v5 ([#86](https://github.com/antoinezanardi/goat-it-web-admin/issues/86)) ([0dc0b43](https://github.com/antoinezanardi/goat-it-web-admin/commit/0dc0b439cfb8f46b7203955fa5fd894d19c0c055))
* **deps:** update vitest monorepo to ^4.1.0 ([#69](https://github.com/antoinezanardi/goat-it-web-admin/issues/69)) ([456959e](https://github.com/antoinezanardi/goat-it-web-admin/commit/456959e0de5ef5b7cd1d0ec46ff42be999924945))
* **docker:** update Node.js version in Dockerfile ([#68](https://github.com/antoinezanardi/goat-it-web-admin/issues/68)) ([212d23d](https://github.com/antoinezanardi/goat-it-web-admin/commit/212d23dad2116b2f1115013a691f4ea6c2a5bec9))

## 1.0.0 (2026-03-09)

### 🚀 Features

* **deploy:** add workflows for production and staging deployments ([#30](https://github.com/antoinezanardi/goat-it-web-admin/issues/30)) ([218a9f3](https://github.com/antoinezanardi/goat-it-web-admin/commit/218a9f3e55c7c75f3ea5238fa289a2ce7de93460))
* **deps:** add @goat-it/schemas and zod as dev dependencies ([#32](https://github.com/antoinezanardi/goat-it-web-admin/issues/32)) ([84a4dbb](https://github.com/antoinezanardi/goat-it-web-admin/commit/84a4dbb3cd2456d3ce974052f79bbe8e616db447))
* **docker:** add Docker configuration files and update build scripts ([#28](https://github.com/antoinezanardi/goat-it-web-admin/issues/28)) ([e5a3117](https://github.com/antoinezanardi/goat-it-web-admin/commit/e5a3117ad258a095672c0e9410096790c3d06a27))
* **env:** add environment variable template and update config ([#27](https://github.com/antoinezanardi/goat-it-web-admin/issues/27)) ([cf5216a](https://github.com/antoinezanardi/goat-it-web-admin/commit/cf5216aa131594930feb9c6e93de34a209ac3925))
* **font:** add local font configuration for General Sans ([#46](https://github.com/antoinezanardi/goat-it-web-admin/issues/46)) ([32b5ec9](https://github.com/antoinezanardi/goat-it-web-admin/commit/32b5ec989d9c8b9951e6a80b9704740d2741578d))
* **i18n:** set up internationalization with initial translations ([#12](https://github.com/antoinezanardi/goat-it-web-admin/issues/12)) ([0a4c091](https://github.com/antoinezanardi/goat-it-web-admin/commit/0a4c091169f03f1e6c5e83d95cec894104ed3b60))
* **icons:** add lucide icon collection ([#13](https://github.com/antoinezanardi/goat-it-web-admin/issues/13)) ([abba54b](https://github.com/antoinezanardi/goat-it-web-admin/commit/abba54b43f938d6b71cf39362506ec3f50830f42))
* **layout:** implement default layout structure and styles ([#7](https://github.com/antoinezanardi/goat-it-web-admin/issues/7)) ([8e38f55](https://github.com/antoinezanardi/goat-it-web-admin/commit/8e38f551edd178945860bbcdbdf640bb1a51e8b8))
* **lint:** update ESLint configuration and add new rules ([#38](https://github.com/antoinezanardi/goat-it-web-admin/issues/38)) ([886bf48](https://github.com/antoinezanardi/goat-it-web-admin/commit/886bf48c18b2e8fa858cf9a8d015ecde14dd4ce7))
* **mutation-testing:** set up Stryker for mutation testing ([#22](https://github.com/antoinezanardi/goat-it-web-admin/issues/22)) ([d93190e](https://github.com/antoinezanardi/goat-it-web-admin/commit/d93190e13bb7f8c9cd22e01545f6ad1b4747fdfe))
* **nuxt:** initialize Nuxt app with configuration and styles ([#5](https://github.com/antoinezanardi/goat-it-web-admin/issues/5)) ([b3594cc](https://github.com/antoinezanardi/goat-it-web-admin/commit/b3594ccacd9060832fa161d9705bd2e72211c050))
* **package:** initialize project with package.json and coderabbit config ([6d9722c](https://github.com/antoinezanardi/goat-it-web-admin/commit/6d9722c1548d8675897c9e0038540007cdac3736))
* **package:** initialize project with package.json and coderabbit config ([#1](https://github.com/antoinezanardi/goat-it-web-admin/issues/1)) ([09c18b6](https://github.com/antoinezanardi/goat-it-web-admin/commit/09c18b6df8dcd319a58c54164e3e8215441dda05))
* **project:** base scripts and configs ([#3](https://github.com/antoinezanardi/goat-it-web-admin/issues/3)) ([585860a](https://github.com/antoinezanardi/goat-it-web-admin/commit/585860a61da050a5989bb09e90753a308a5856b5))
* **styles:** implement theme and transition styles for pages ([#23](https://github.com/antoinezanardi/goat-it-web-admin/issues/23)) ([0016a62](https://github.com/antoinezanardi/goat-it-web-admin/commit/0016a6256a5b22125f1ae57fb2f09a9d5a3ce132))
* **tests:** set up unit testing with Vitest and initial configurations ([#15](https://github.com/antoinezanardi/goat-it-web-admin/issues/15)) ([07c1024](https://github.com/antoinezanardi/goat-it-web-admin/commit/07c1024641411d932cb5b76aec3f06690acdbbe0))
* **workflows:** add GitHub Actions for CI/CD processes ([#4](https://github.com/antoinezanardi/goat-it-web-admin/issues/4)) ([5502baa](https://github.com/antoinezanardi/goat-it-web-admin/commit/5502baa18f1b3b2288ac02a535d5cc6bd0cbe843)), closes [/#diff-9e262e6d932159c366dd656f2efb53b098de206a53e6cd710945194c3fcf05ffR1-R29](https://github.com/antoinezanardi///issues/diff-9e262e6d932159c366dd656f2efb53b098de206a53e6cd710945194c3fcf05ffR1-R29) [/#diff-ec444582781b87b7476f7da1be059db3757d1b8a5c33cbe8fd1e72490844cd2fR1-R16](https://github.com/antoinezanardi///issues/diff-ec444582781b87b7476f7da1be059db3757d1b8a5c33cbe8fd1e72490844cd2fR1-R16) [/#diff-b75b025d551d3387aae641b07b3d675985802e588607716e79373d0c3adceae8R1-R14](https://github.com/antoinezanardi///issues/diff-b75b025d551d3387aae641b07b3d675985802e588607716e79373d0c3adceae8R1-R14) [/#diff-3b81cbe941943c4585c346cfae38473b8db501f565d48030de118d28c2292e74R1-R17](https://github.com/antoinezanardi///issues/diff-3b81cbe941943c4585c346cfae38473b8db501f565d48030de118d28c2292e74R1-R17) [/#diff-296aeea4842ae95e943859bfd19e84ffeaceb94e9e63940d0b15767fad44e2e2R1-R66](https://github.com/antoinezanardi///issues/diff-296aeea4842ae95e943859bfd19e84ffeaceb94e9e63940d0b15767fad44e2e2R1-R66) [/#diff-f1d084efa26a0f0f45c8ba872e6dc750a73daca60a47dfa42121b28eda7e32b3R1-R31](https://github.com/antoinezanardi///issues/diff-f1d084efa26a0f0f45c8ba872e6dc750a73daca60a47dfa42121b28eda7e32b3R1-R31) [/#diff-b58069f4ea1b606b1364bed62bb158ab3ad31771e6ad88836a5ce57b7554e2bfR1-R72](https://github.com/antoinezanardi///issues/diff-b58069f4ea1b606b1364bed62bb158ab3ad31771e6ad88836a5ce57b7554e2bfR1-R72) [/#diff-31b003cdac55f94b427172840cc9ff94acdbed29d3bf05d8e2d99623f79a4be7R1-R109](https://github.com/antoinezanardi///issues/diff-31b003cdac55f94b427172840cc9ff94acdbed29d3bf05d8e2d99623f79a4be7R1-R109) [/#diff-5f6cdd3406e87f741b244fbde4b1a150537e64e0ad98691420919a9458daf90dR1-R19](https://github.com/antoinezanardi///issues/diff-5f6cdd3406e87f741b244fbde4b1a150537e64e0ad98691420919a9458daf90dR1-R19)

### 📖 Docs

* **agents:** add comprehensive guide for automated agents ([#47](https://github.com/antoinezanardi/goat-it-web-admin/issues/47)) ([daba3f7](https://github.com/antoinezanardi/goat-it-web-admin/commit/daba3f73a7ae3335a73851b0b571ad9e76e4d77f))
* **readme:** add initial project guidelines and package recommendations ([6871b61](https://github.com/antoinezanardi/goat-it-web-admin/commit/6871b61b8c55c3bb3a8218c62780b73addaf3c9a))
* **readme:** enhance project documentation with detailed setup guide ([#48](https://github.com/antoinezanardi/goat-it-web-admin/issues/48)) ([b449197](https://github.com/antoinezanardi/goat-it-web-admin/commit/b44919787d94bc719747f7bf33e5c305ed7d0102))

### 🧹 Chore

* **deps:** update actions/upload-artifact action to v7 ([#17](https://github.com/antoinezanardi/goat-it-web-admin/issues/17)) ([eda7153](https://github.com/antoinezanardi/goat-it-web-admin/commit/eda7153be8dd70b0b865bdfd96c24004b3789744))
* **deps:** update actions/upload-artifact action to v7 ([#21](https://github.com/antoinezanardi/goat-it-web-admin/issues/21)) ([ed7a83f](https://github.com/antoinezanardi/goat-it-web-admin/commit/ed7a83ff57fa7122159b6a45f82b4177582b6ebb))
* **deps:** update commitlint monorepo to ^20.4.3 ([#33](https://github.com/antoinezanardi/goat-it-web-admin/issues/33)) ([1e4b1dc](https://github.com/antoinezanardi/goat-it-web-admin/commit/1e4b1dc15e08f5fe9807519e70cbce8307da10df))
* **deps:** update dependency @goat-it/schemas to ^0.0.2 ([#35](https://github.com/antoinezanardi/goat-it-web-admin/issues/35)) ([f3c490e](https://github.com/antoinezanardi/goat-it-web-admin/commit/f3c490ee10deffc5763d8adab0ad094d2197e6e6)), closes [#8203](https://github.com/antoinezanardi/goat-it-web-admin/issues/8203)
* **deps:** update dependency @iconify-json/lucide to ^1.2.95 ([#18](https://github.com/antoinezanardi/goat-it-web-admin/issues/18)) ([bec51f6](https://github.com/antoinezanardi/goat-it-web-admin/commit/bec51f61b1a35d46de8b70a6211a1b71887fe822))
* **deps:** update dependency @iconify-json/lucide to ^1.2.96 ([#42](https://github.com/antoinezanardi/goat-it-web-admin/issues/42)) ([4eecd3b](https://github.com/antoinezanardi/goat-it-web-admin/commit/4eecd3b7c89c60bd8e759023216727b5dc6baa09))
* **deps:** update dependency @nuxt/hints to ^1.0.0-alpha.10 ([#19](https://github.com/antoinezanardi/goat-it-web-admin/issues/19)) ([ea298d4](https://github.com/antoinezanardi/goat-it-web-admin/commit/ea298d4cb47c12fc368da49d85ae49a7787e1bf6))
* **deps:** update dependency @nuxt/hints to ^1.0.0-alpha.9 ([#16](https://github.com/antoinezanardi/goat-it-web-admin/issues/16)) ([658138a](https://github.com/antoinezanardi/goat-it-web-admin/commit/658138a17ffba5634191e0d0083974c838ec13b7))
* **deps:** update dependency @nuxt/ui to ^4.5.0 ([#9](https://github.com/antoinezanardi/goat-it-web-admin/issues/9)) ([72195f9](https://github.com/antoinezanardi/goat-it-web-admin/commit/72195f93d2ac6c92a3ab86a706eb56c3dca2c659))
* **deps:** update dependency @nuxt/ui to ^4.5.1 ([#24](https://github.com/antoinezanardi/goat-it-web-admin/issues/24)) ([97a5cc9](https://github.com/antoinezanardi/goat-it-web-admin/commit/97a5cc9606a839aed3c89e7d120fcfa52753de10))
* **deps:** update dependency eslint to ^9.39.4 ([#43](https://github.com/antoinezanardi/goat-it-web-admin/issues/43)) ([11563b1](https://github.com/antoinezanardi/goat-it-web-admin/commit/11563b1bb8d1b953c2a5eb9326c6d3580f91ac67))
* **deps:** update dependency eslint to v10 ([#44](https://github.com/antoinezanardi/goat-it-web-admin/issues/44)) ([717fb97](https://github.com/antoinezanardi/goat-it-web-admin/commit/717fb9765c41d2d1665a9a3ca72d3257d284887b))
* **deps:** update dependency happy-dom to ^20.8.3 ([#26](https://github.com/antoinezanardi/goat-it-web-admin/issues/26)) ([1549e02](https://github.com/antoinezanardi/goat-it-web-admin/commit/1549e0292a61954cfd7f83951df4033aa5cfec20))
* **deps:** update dependency lint-staged to ^16.3.1 ([#20](https://github.com/antoinezanardi/goat-it-web-admin/issues/20)) ([f6d0eb8](https://github.com/antoinezanardi/goat-it-web-admin/commit/f6d0eb83b3eec8183323698b99cf54434b027b53))
* **deps:** update dependency lint-staged to ^16.3.2 ([#31](https://github.com/antoinezanardi/goat-it-web-admin/issues/31)) ([d6ca62d](https://github.com/antoinezanardi/goat-it-web-admin/commit/d6ca62d47db80a73d65846d5976619b3bdbde1ef))
* **deps:** update docker/build-push-action action to v7 ([#41](https://github.com/antoinezanardi/goat-it-web-admin/issues/41)) ([0b47d00](https://github.com/antoinezanardi/goat-it-web-admin/commit/0b47d00c1af0a1bc6941cf0843c3d6beb5925994))
* **deps:** update docker/login-action action to v4 ([#36](https://github.com/antoinezanardi/goat-it-web-admin/issues/36)) ([cab0302](https://github.com/antoinezanardi/goat-it-web-admin/commit/cab0302021e7d82ffe05ddce14c0ec724206964c))
* **deps:** update docker/metadata-action action to v6 ([#40](https://github.com/antoinezanardi/goat-it-web-admin/issues/40)) ([555747c](https://github.com/antoinezanardi/goat-it-web-admin/commit/555747cdf6d46340ef113d4683d8105b6aadf64b))
* **deps:** update docker/setup-buildx-action action to v4 ([#39](https://github.com/antoinezanardi/goat-it-web-admin/issues/39)) ([4c7bc8e](https://github.com/antoinezanardi/goat-it-web-admin/commit/4c7bc8e4532603f6ab0c8500684a2df84151b534))
* **deps:** update docker/setup-qemu-action action to v4 ([#37](https://github.com/antoinezanardi/goat-it-web-admin/issues/37)) ([bff38c2](https://github.com/antoinezanardi/goat-it-web-admin/commit/bff38c220e91630714e5ee3d4e36d92a9dd77d4b))
* **deps:** update github artifact actions (major) ([#34](https://github.com/antoinezanardi/goat-it-web-admin/issues/34)) ([3d6f793](https://github.com/antoinezanardi/goat-it-web-admin/commit/3d6f79368d00a87862c857b967d070df025a6469))
* **deps:** update node.js ([#29](https://github.com/antoinezanardi/goat-it-web-admin/issues/29)) ([de3b996](https://github.com/antoinezanardi/goat-it-web-admin/commit/de3b996e5d41d7d3a26f7ec7cde3dd8b94c3076f))
* **deps:** update node.js to v25.7.0 ([#11](https://github.com/antoinezanardi/goat-it-web-admin/issues/11)) ([5e95eaf](https://github.com/antoinezanardi/goat-it-web-admin/commit/5e95eafff56f32e7142391aec4de76d8f6647c1a))
* **deps:** update pnpm to v10.30.2 ([#8](https://github.com/antoinezanardi/goat-it-web-admin/issues/8)) ([ce3f734](https://github.com/antoinezanardi/goat-it-web-admin/commit/ce3f734e31307a025311d65d0d1e5328d463e20b))
* **deps:** update pnpm to v10.30.3 ([#14](https://github.com/antoinezanardi/goat-it-web-admin/issues/14)) ([a1f568b](https://github.com/antoinezanardi/goat-it-web-admin/commit/a1f568b2a9586c2a92ba6fce6731a7885e1ce6fd))
* **deps:** update pnpm to v10.31.0 ([#45](https://github.com/antoinezanardi/goat-it-web-admin/issues/45)) ([f42e8af](https://github.com/antoinezanardi/goat-it-web-admin/commit/f42e8af39b55021fa53dd8f64e71b364e557fb05))
* **deps:** update raven-actions/actionlint action to v2.1.2 ([#25](https://github.com/antoinezanardi/goat-it-web-admin/issues/25)) ([6b9267b](https://github.com/antoinezanardi/goat-it-web-admin/commit/6b9267b89a534d609ff81ad491a6b240202146ae))
* merge from main ([5bed416](https://github.com/antoinezanardi/goat-it-web-admin/commit/5bed416b17766eee8d6040b670840812e947bb6b))
* merge from main ([0b68516](https://github.com/antoinezanardi/goat-it-web-admin/commit/0b68516179b306bb53c035668a0b2afa74297710))
