import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeLocalizedTexts } from "~~/tests/unit/utils/faketories/shared/locale/locale.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { QuestionThemeAliasPill, TranslationsOverview } from "#components";
import { QuestionThemeAliasesList } from "#components";

import type { QuestionThemeAliasesListProperties } from "~/components/domain/question-theme/QuestionThemeAliasesList/question-theme-aliases-list.types";

describe("QuestionThemeAliasesList Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionThemeAliasesListProperties: QuestionThemeAliasesListProperties = {
    aliases: ["alias-1", "alias-2"],
  } as const;

  async function mountQuestionThemeAliasesListComponent(options: MountSuspendedOptions<typeof QuestionThemeAliasesList> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeAliasesList, {
      props: defaultQuestionThemeAliasesListProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeAliasesListComponent();
  });

  it("should render the question theme aliases list component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render a QuestionThemeAliasPill for each alias when there are multiple aliases.", () => {
    const pills = wrapper.findAll("[data-testid^='alias-pill-']");

    expect(pills).toHaveLength(2);
  });

  it("should pass the alias to the badge when there is at least one alias.", async() => {
    const aliases = ["alias"];
    await wrapper.setProps({ aliases });

    const pill = wrapper.getComponent<typeof QuestionThemeAliasPill>("[data-testid='alias-pill-alias']");

    expect(pill.props("alias")).toBe(aliases[0]);
  });

  it("should render a none badge when aliases are not defined.", async() => {
    await wrapper.setProps({ aliases: undefined });

    const badge = wrapper.find("[data-testid='aliases-none-badge']");

    expect(badge.exists()).toBeTruthy();
  });

  it("should render the none badge when there is no alias.", async() => {
    await wrapper.setProps({ aliases: [] });

    const badge = wrapper.find("[data-testid='aliases-none-badge']");

    expect(badge.exists()).toBeTruthy();
  });

  it("should render the none badge with border-dashed class when localized texts are provided and aliases are empty.", async() => {
    const localizedTexts = createFakeLocalizedTexts();
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { aliases: [], localizedTexts },
      global: {
        stubs: { UPopover: { template: "<div><slot /><slot name=\"content\" /></div>" } },
      },
    });

    const badge = wrapper.find("[data-testid='aliases-none-badge']");

    expect(badge.classes()).toContain("border-dashed");
  });

  it("should render the none badge with cursor-pointer class when localized texts are provided and aliases are empty.", async() => {
    const localizedTexts = createFakeLocalizedTexts();
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { aliases: [], localizedTexts },
      global: {
        stubs: { UPopover: { template: "<div><slot /><slot name=\"content\" /></div>" } },
      },
    });

    const badge = wrapper.find("[data-testid='aliases-none-badge']");

    expect(badge.classes()).toContain("cursor-pointer");
  });

  it("should render the none badge inside a popover when localized texts are provided and aliases are empty.", async() => {
    const localizedTexts = createFakeLocalizedTexts();
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { aliases: [], localizedTexts },
    });

    const popover = wrapper.findComponent({ name: "UPopover" });

    expect(popover.exists()).toBeTruthy();
  });

  it("should pass localized texts to translations overview when localized texts are provided and aliases are empty.", async() => {
    const localizedTexts = createFakeLocalizedTexts();
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { aliases: [], localizedTexts },
      global: {
        stubs: { UPopover: { template: "<div><slot /><slot name=\"content\" /></div>" } },
      },
    });

    const translationsOverview = wrapper.findComponent<typeof TranslationsOverview>({ name: "TranslationsOverview" });

    expect(translationsOverview.props("localizedTexts")).toStrictEqual(localizedTexts);
  });

  it("should not render popover when localized texts are not provided.", async() => {
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { aliases: [] },
    });

    const popover = wrapper.findComponent({ name: "UPopover" });

    expect(popover.exists()).toBeFalsy();
  });

  it("should render the none badge when localized texts are not provided.", async() => {
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { aliases: [] },
    });

    const badge = wrapper.find("[data-testid='aliases-none-badge']");

    expect(badge.exists()).toBeTruthy();
  });

  it("should render the none badge without border-dashed class when localized texts are not provided.", async() => {
    wrapper = await mountQuestionThemeAliasesListComponent({
      props: { aliases: [] },
    });

    const badge = wrapper.find("[data-testid='aliases-none-badge']");

    expect(badge.classes()).not.toContain("border-dashed");
  });
});