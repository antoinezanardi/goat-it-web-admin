import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestion } from "~~/tests/unit/utils/faketories/questions/entity/question.entity.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";

import { QuestionsTableActions } from "#components";
import type { ArchiveQuestionButton, EditQuestionButton } from "#components";

import type { QuestionsTableActionsProps } from "~/components/domain/question/QuestionsTable/QuestionsTableActions/questions-table-actions.types";

describe("QuestionsTableActions Component", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;

  const defaultProps: QuestionsTableActionsProps = {
    question: createFakeQuestion({ id: "question-id-123", status: "active" }),
  };

  async function mountQuestionsTableActionsComponent(options: MountSuspendedOptions<typeof QuestionsTableActions> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTableActions, {
      global: {
        plugins: [pinia],
      },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    pinia = createTestingPinia();
    wrapper = await mountQuestionsTableActionsComponent();
  });

  it("should render the actions component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Edit button", () => {
    it("should render the edit button when mounted.", () => {
      const editButton = wrapper.findComponent<typeof EditQuestionButton>(`[data-testid='questions-table-actions-edit-${defaultProps.question.id}']`);

      expect(editButton.exists()).toBeTruthy();
    });

    it("should pass the question id to the edit button when mounted.", () => {
      const editButton = wrapper.findComponent<typeof EditQuestionButton>(`[data-testid='questions-table-actions-edit-${defaultProps.question.id}']`);

      expect(editButton.props("questionId")).toBe("question-id-123");
    });

    it("should emit startEdit with the question id when the edit button emits startEdit.", () => {
      const editButton = wrapper.findComponent<typeof EditQuestionButton>(`[data-testid='questions-table-actions-edit-${defaultProps.question.id}']`);
      getWrapperVm(editButton).$emit("startEdit", "question-id-123");

      expect(wrapper.emitted("startEdit")).toStrictEqual([["question-id-123"]]);
    });
  });

  describe("Archive button", () => {
    it("should render the archive button when the question status is active.", () => {
      const archiveButton = wrapper.findComponent<typeof ArchiveQuestionButton>(`[data-testid='questions-table-actions-archive-${defaultProps.question.id}']`);

      expect(archiveButton.exists()).toBeTruthy();
    });

    it("should pass the question id to the archive button when the question status is active.", () => {
      const archiveButton = wrapper.findComponent<typeof ArchiveQuestionButton>(`[data-testid='questions-table-actions-archive-${defaultProps.question.id}']`);

      expect(archiveButton.props("questionId")).toBe("question-id-123");
    });

    it("should not render the archive button when the question status is archived.", async() => {
      wrapper = await mountQuestionsTableActionsComponent({
        props: {
          question: createFakeQuestion({ id: "question-id-123", status: "archived" }),
        },
      });
      const archiveButton = wrapper.find("[data-testid='questions-table-actions-archive-question-id-123']");

      expect(archiveButton.exists()).toBeFalsy();
    });
  });
});