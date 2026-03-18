import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UBadge, QuestionThemeAliasPill } from "#components";
import { QuestionThemeAliasesList } from "#components";

import type { QuestionThemeAliasesListProperties } from "~/components/domain/question-theme/QuestionThemeAliasesList/question-theme-aliases-list.types";

describe("Question Theme Aliases List Component", () => {
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
    const pills = wrapper.findAllComponents<typeof QuestionThemeAliasPill>({ name: "QuestionThemeAliasPill" });

    expect(pills).toHaveLength(2);
  });

  it("should pass the alias to the badge when there is at least one alias.", async() => {
    const aliases = ["alias"];
    wrapper = await mountQuestionThemeAliasesListComponent({ props: { aliases } });

    const pill = wrapper.getComponent<typeof QuestionThemeAliasPill>({ name: "QuestionThemeAliasPill" });

    expect(pill.props("alias")).toBe(aliases[0]);
  });

  it("should render a none badge when aliases are not defined.", async() => {
    wrapper = await mountQuestionThemeAliasesListComponent({ props: { aliases: undefined } });

    const badge = wrapper.findComponent<typeof UBadge>({ name: "UBadge" });

    expect(badge.exists()).toBeTruthy();
  });

  it("should render the none badge  when there is no alias.", async() => {
    wrapper = await mountQuestionThemeAliasesListComponent({ props: { aliases: [] } });

    const badge = wrapper.findComponent<typeof UBadge>({ name: "UBadge" });

    expect(badge.exists()).toBeTruthy();
  });
});