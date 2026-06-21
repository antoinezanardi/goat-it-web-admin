import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { mockStore } from "~~/tests/unit/utils/mocks/stores/store.mock";
import { createUseOverlayInstanceMock } from "~~/tests/unit/utils/mocks/composables/ui/useOverlay/useOverlay.mock";
import type { UseOverlayInstanceMock, UseOverlayMock } from "~~/tests/unit/utils/mocks/composables/ui/useOverlay/useOverlay.mock";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { ArchiveQuestionButton, ConfirmDialog } from "#components";

import type { ArchiveQuestionButtonProps } from "~/components/domain/question/QuestionsTable/QuestionsTableActions/ArchiveQuestionButton/archive-question-button.types";

describe("ArchiveQuestionButton Component", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;
  let questionsStore: ReturnType<typeof mockStore<typeof useQuestionsStore>>;
  let overlayInstance: UseOverlayInstanceMock;
  let overlayMock: UseOverlayMock;

  const defaultProps: ArchiveQuestionButtonProps = {
    questionId: "question-id-123",
  };

  async function mountArchiveQuestionButtonComponent(options: MountSuspendedOptions<typeof ArchiveQuestionButton> = {}): Promise<VueWrapper> {
    return mountSuspended(ArchiveQuestionButton, {
      global: {
        plugins: [pinia],
      },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    overlayInstance = createUseOverlayInstanceMock();
    overlayMock = useOverlay() as unknown as UseOverlayMock;
    overlayMock.create.mockReturnValue(overlayInstance);
    pinia = createTestingPinia();
    wrapper = await mountArchiveQuestionButtonComponent();
    questionsStore = mockStore(useQuestionsStore);
  });

  it("should render the archive button when mounted.", () => {
    const button = wrapper.find(".archive-question-button");

    expect(button.exists()).toBeTruthy();
  });

  it("should render the archive tooltip when mounted.", () => {
    const tooltip = wrapper.findComponent({ name: "UTooltip" });

    expect(tooltip.props("text")).toBe("questions.actions.archive");
  });

  it("should set the aria-label on the archive button when mounted.", () => {
    const button = wrapper.find(".archive-question-button");

    expect(button.attributes("aria-label")).toBe("questions.actions.archive");
  });

  it("should register the confirm dialog with the overlay when mounted.", () => {
    expect(overlayMock.create).toHaveBeenCalledExactlyOnceWith(ConfirmDialog);
  });

  describe("Archive click", () => {
    it("should open the confirm dialog with the archive icon and i18n keys when the archive button is clicked.", async() => {
      const button = wrapper.find(".archive-question-button");
      await button.trigger("click");

      expect(overlayInstance.open).toHaveBeenCalledExactlyOnceWith({
        icon: "i-lucide-archive",
        title: "questions.archive.confirmTitle",
        description: "questions.archive.confirmDescription",
      });
    });

    it("should call archiveAndStoreQuestion with the question id when the confirm dialog resolves with true.", async() => {
      overlayInstance.open.mockReturnValue({ result: Promise.resolve(true) });
      const button = wrapper.find(".archive-question-button");
      await button.trigger("click");
      await flushPromises();

      expect(questionsStore.archiveAndStoreQuestion).toHaveBeenCalledExactlyOnceWith("question-id-123");
    });

    it("should not call archiveAndStoreQuestion when the confirm dialog resolves with false.", async() => {
      overlayInstance.open.mockReturnValue({ result: Promise.resolve(false) });
      const button = wrapper.find(".archive-question-button");
      await button.trigger("click");
      await flushPromises();

      expect(questionsStore.archiveAndStoreQuestion).not.toHaveBeenCalled();
    });
  });
});