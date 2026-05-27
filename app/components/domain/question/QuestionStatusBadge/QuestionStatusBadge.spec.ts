import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UBadge } from "#components";
import { QuestionStatusBadge } from "#components";

import type { QuestionStatusBadgeProperties } from "~/components/domain/question/QuestionStatusBadge/question-status-badge.types";

describe("QuestionStatusBadge Component", () => {
  let wrapper: VueWrapper;
  const defaultQuestionStatusBadgeProperties: QuestionStatusBadgeProperties = {
    status: "active",
  } as const;

  async function mountQuestionStatusBadgeComponent(options: MountSuspendedOptions<typeof QuestionStatusBadge> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionStatusBadge, {
      props: defaultQuestionStatusBadgeProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionStatusBadgeComponent();
  });

  it("should render the question status badge component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Badge", () => {
    describe("Label", () => {
      it("should pass the active status i18n key as label to the badge component when status is active.", () => {
        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe("questions.status.active");
      });

      it("should pass the pending status i18n key as label to the badge component when status is pending.", async() => {
        await wrapper.setProps({ status: "pending" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe("questions.status.pending");
      });

      it("should pass the archived status i18n key as label to the badge component when status is archived.", async() => {
        await wrapper.setProps({ status: "archived" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("label")).toBe("questions.status.archived");
      });
    });

    describe("Color", () => {
      it("should use the success color for the badge component when status is active.", () => {
        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("success");
      });

      it("should use the info color for the badge component when status is pending.", async() => {
        await wrapper.setProps({ status: "pending" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("info");
      });

      it("should use the error color for the badge component when status is archived.", async() => {
        await wrapper.setProps({ status: "archived" });

        const badge = wrapper.getComponent<typeof UBadge>({ name: "UBadge" });

        expect(badge.props("color")).toBe("error");
      });
    });
  });
});