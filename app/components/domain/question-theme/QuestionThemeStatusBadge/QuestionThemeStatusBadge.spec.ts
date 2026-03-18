import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UBadge } from "#components";
import { QuestionThemeStatusBadge } from "#components";

import type { QuestionThemeStatusBadgeProperties } from "~/components/domain/question-theme/QuestionThemeStatusBadge/question-theme-status-badge.types";

describe("QuestionThemeStatusBadgeComponent", () => {
  let wrapper: VueWrapper;
  const defaultQuestionThemeStatusBadgeProperties: QuestionThemeStatusBadgeProperties = {
    status: "active",
  } as const;

  async function mountQuestionThemeStatusBadgeComponent(options: MountSuspendedOptions<typeof QuestionThemeStatusBadge> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemeStatusBadge, {
      props: defaultQuestionThemeStatusBadgeProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionThemeStatusBadgeComponent();
  });

  it("should render the question theme status badge component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Badge", () => {
    describe("Label", () => {
      it("should pass the active status i18n key as label to the badge component when status is active.", () => {
        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe("questionThemes.status.active");
      });

      it("should pass the archived status i18n key as label to the badge component when status is archived.", async() => {
        wrapper = await mountQuestionThemeStatusBadgeComponent({ props: { status: "archived" } });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe("questionThemes.status.archived");
      });
    });

    describe("Color", () => {
      it("should use the success color for the badge component when status is active.", () => {
        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("success");
      });

      it("should use the neutral color for the badge component when status is archived.", async() => {
        wrapper = await mountQuestionThemeStatusBadgeComponent({ props: { status: "archived" } });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("neutral");
      });
    });
  });
});