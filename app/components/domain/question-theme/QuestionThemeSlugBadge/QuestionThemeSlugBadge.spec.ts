import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UBadge } from "#components";
import { QuestionThemeSlugBadge } from "#components";

import type { QuestionThemeSlugBadgeProperties } from "~/components/domain/question-theme/QuestionThemeSlugBadge/question-theme-slug-badge.types";

describe(QuestionThemeSlugBadge, () => {
  let wrapper: VueWrapper;
  const defaultQuestionThemeSlugBadgeProperties: QuestionThemeSlugBadgeProperties = {
    slug: "math-algebra",
  } as const;

  async function mountQuestionThemeSlugBadgeComponent(options: MountSuspendedOptions<typeof QuestionThemeSlugBadge> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeSlugBadge, {
      props: defaultQuestionThemeSlugBadgeProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeSlugBadgeComponent();
  });

  it("should render the question theme slug badge component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Badge", () => {
    it("should pass the slug prop as label to the badge component when mounted.", () => {
      const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

      expect(badge.props("label")).toBe(defaultQuestionThemeSlugBadgeProperties.slug);
    });

    it("should use the neutral color for the badge component when mounted.", () => {
      const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

      expect(badge.props("color")).toBe("neutral");
    });

    it("should use the outline variant for the badge component when mounted.", () => {
      const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

      expect(badge.props("variant")).toBe("outline");
    });
  });
});