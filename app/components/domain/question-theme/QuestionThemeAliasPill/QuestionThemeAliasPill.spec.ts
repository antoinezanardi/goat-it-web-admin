import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UBadge } from "#components";
import { QuestionThemeAliasPill } from "#components";

import type { QuestionThemeAliasPillProps } from "~/components/domain/question-theme/QuestionThemeAliasPill/question-theme-alias-pill.types";

describe("QuestionThemeAliasPill Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionThemeAliasPillProps: QuestionThemeAliasPillProps = {
    alias: "alias-1",
  } as const;

  async function mountQuestionThemeAliasPillComponent(options: MountSuspendedOptions<typeof QuestionThemeAliasPill> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeAliasPill, {
      props: defaultQuestionThemeAliasPillProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeAliasPillComponent();
  });

  it("should render the question theme alias pill component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Badge", () => {
    it("should render the alias as slot content inside the badge component when mounted.", () => {
      const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

      expect(badge.text()).toBe(defaultQuestionThemeAliasPillProps.alias);
    });
  });
});