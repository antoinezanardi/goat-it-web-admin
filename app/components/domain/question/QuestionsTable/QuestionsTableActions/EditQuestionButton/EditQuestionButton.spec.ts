import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UButton, UTooltip } from "#components";
import { EditQuestionButton } from "#components";

import type { EditQuestionButtonProperties } from "~/components/domain/question/QuestionsTable/QuestionsTableActions/EditQuestionButton/edit-question-button.types";

describe("EditQuestionButton Component", () => {
  let wrapper: VueWrapper;

  const defaultProperties: EditQuestionButtonProperties = {
    questionId: "question-id-123",
  };

  async function mountEditQuestionButtonComponent(options: MountSuspendedOptions<typeof EditQuestionButton> = {}): Promise<VueWrapper> {
    return mountSuspended(EditQuestionButton, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountEditQuestionButtonComponent();
  });

  it("should render the edit question button component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should display the tooltip with the correct action label when mounted.", () => {
    const tooltip = wrapper.findComponent<typeof UTooltip>({ name: "UTooltip" });

    expect(tooltip.props("text")).toBe("questions.actions.edit");
  });

  it("should set the correct aria-label on the button when mounted.", () => {
    const button = wrapper.findComponent<typeof UButton>({ name: "UButton" });

    expect(button.attributes("aria-label")).toBe("questions.actions.edit");
  });

  it("should emit startEdit with the question id when clicked.", () => {
    const button = wrapper.findComponent<typeof UButton>({ name: "UButton" });
    getWrapperVm(button).$emit("click");

    expect(wrapper.emitted("startEdit")).toStrictEqual([["question-id-123"]]);
  });
});