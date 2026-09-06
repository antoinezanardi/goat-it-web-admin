import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { createFakeLocalizedTexts } from "@goat-it/schemas/testing/shared";

import { DEFAULT_MOCKED_LOCALE } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock.constants";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { QuestionThemeAliasPill, TranslationsOverview, UBadge } from "#components";
import { QuestionThemeAliasesList } from "#components";

import type { QuestionThemeAliasesListProps } from "~/components/domain/question-theme/QuestionThemeAliasesList/question-theme-aliases-list.types";

describe("QuestionThemeAliasesList Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionThemeAliasesListProps: QuestionThemeAliasesListProps = {
    localizedTexts: createFakeLocalizedTexts({
      [DEFAULT_MOCKED_LOCALE]: ["alias-1", "alias-2"],
    }),
  };

  async function mountQuestionThemeAliasesListComponent(options: MountSuspendedOptions<typeof QuestionThemeAliasesList> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeAliasesList, {
      props: defaultQuestionThemeAliasesListProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeAliasesListComponent();
  });

  it("should render the question theme aliases list component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render a QuestionThemeAliasPill for each alias when the current locale has multiple aliases.", () => {
    const pills = wrapper.findAll("[data-testid^='alias-pill-']");

    expect(pills).toHaveLength(2);
  });

  it("should pass the alias to the pill when there is at least one alias for the current locale.", () => {
    const pill = wrapper.getComponent<typeof QuestionThemeAliasPill>("[data-testid='alias-pill-alias-1']");

    expect(pill.props("alias")).toBe("alias-1");
  });

  it("should render the none badge when the current locale has no aliases.", async() => {
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { localizedTexts: createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: [] }) },
      global: {
        stubs: { UPopover: { template: "<div><slot /><slot name=\"content\" /></div>" } },
      },
    });

    const badge = wrapper.find("[data-testid='aliases-none-badge']");

    expect(badge.exists()).toBeTruthy();
  });

  it("should render the none badge with the correct icon when the current locale has no aliases.", async() => {
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { localizedTexts: createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: [] }) },
      global: {
        stubs: { UPopover: { template: "<div><slot /><slot name=\"content\" /></div>" } },
      },
    });

    const badgeComponent = wrapper.findComponent<typeof UBadge>("[data-testid='aliases-none-badge']");

    expect(badgeComponent.props("icon")).toBe("i-lucide-circle-slash");
  });

  it("should render the none badge with the correct i18n key when the current locale has no aliases.", async() => {
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { localizedTexts: createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: [] }) },
      global: {
        stubs: { UPopover: { template: "<div><slot /><slot name=\"content\" /></div>" } },
      },
    });

    const badge = wrapper.find("[data-testid='aliases-none-badge']");

    expect(badge.text()).toContain("questionThemes.aliases.noneForLocale");
  });

  it("should render the none badge when the current locale value is undefined.", async() => {
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { localizedTexts: createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: undefined }) },
      global: {
        stubs: { UPopover: { template: "<div><slot /><slot name=\"content\" /></div>" } },
      },
    });

    const badge = wrapper.find("[data-testid='aliases-none-badge']");

    expect(badge.exists()).toBeTruthy();
  });

  it("should render the none badge inside a popover when the current locale has no aliases.", async() => {
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { localizedTexts: createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: [] }) },
    });

    const popover = wrapper.findComponent({ name: "UPopover" });

    expect(popover.exists()).toBeTruthy();
  });

  it("should pass localized texts to translations overview when the current locale has no aliases.", async() => {
    const localizedTexts = createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: [] });
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { localizedTexts },
      global: {
        stubs: { UPopover: { template: "<div><slot /><slot name=\"content\" /></div>" } },
      },
    });

    const translationsOverview = wrapper.findComponent<typeof TranslationsOverview>({ name: "TranslationsOverview" });

    expect(translationsOverview.props("localizedTexts")).toStrictEqual(localizedTexts);
  });

  it("should not render alias pills when the current locale has only whitespace aliases.", async() => {
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { localizedTexts: createFakeLocalizedTexts({ [DEFAULT_MOCKED_LOCALE]: ["  ", "\t"] }) },
      global: {
        stubs: { UPopover: { template: "<div><slot /><slot name=\"content\" /></div>" } },
      },
    });

    const pills = wrapper.findAll("[data-testid^='alias-pill-']");

    expect(pills).toHaveLength(0);
  });
});