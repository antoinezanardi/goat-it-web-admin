import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestion } from "~~/tests/unit/utils/faketories/questions/entity/question.entity.faketory";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionsTableActions } from "#components";
import type { ArchiveQuestionButton } from "#components";

import type { QuestionsTableActionsProperties } from "~/components/domain/question/QuestionsTable/QuestionsTableActions/questions-table-actions.types";

describe("QuestionsTableActions Component", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;

  const defaultProperties: QuestionsTableActionsProperties = {
    question: createFakeQuestion({ id: "question-id-123", status: "active" }),
  };

  async function mountQuestionsTableActionsComponent(options: MountSuspendedOptions<typeof QuestionsTableActions> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionsTableActions, {
      global: {
        plugins: [pinia],
      },
      props: defaultProperties,
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

  describe("Archive button", () => {
    it("should render the archive button when the question status is active.", () => {
      const archiveButton = wrapper.findComponent<typeof ArchiveQuestionButton>(`[data-testid='questions-table-actions-archive-${defaultProperties.question.id}']`);

      expect(archiveButton.exists()).toBeTruthy();
    });

    it("should pass the question id to the archive button when the question status is active.", () => {
      const archiveButton = wrapper.findComponent<typeof ArchiveQuestionButton>(`[data-testid='questions-table-actions-archive-${defaultProperties.question.id}']`);

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