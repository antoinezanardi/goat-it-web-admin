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

import { ArchiveQuestionThemeButton, ConfirmDialog } from "#components";

import type { ArchiveQuestionThemeButtonProperties } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableActions/ArchiveQuestionThemeButton/archive-question-theme-button.types";

describe("ArchiveQuestionThemeButton Component", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;
  let questionThemesStore: ReturnType<typeof mockStore<typeof useQuestionThemesStore>>;
  let overlayInstance: UseOverlayInstanceMock;
  let overlayMock: UseOverlayMock;

  const defaultProperties: ArchiveQuestionThemeButtonProperties = {
    questionThemeId: "theme-id-123",
    questionThemeSlug: "music",
  };

  async function mountArchiveQuestionThemeButtonComponent(options: MountSuspendedOptions<typeof ArchiveQuestionThemeButton> = {}): Promise<VueWrapper> {
    return mountSuspended(ArchiveQuestionThemeButton, {
      global: {
        plugins: [pinia],
      },
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    overlayInstance = createUseOverlayInstanceMock();
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    overlayMock = useOverlay() as unknown as UseOverlayMock;
    overlayMock.create.mockReturnValue(overlayInstance);
    pinia = createTestingPinia();
    wrapper = await mountArchiveQuestionThemeButtonComponent();
    questionThemesStore = mockStore(useQuestionThemesStore);
  });

  it("should render the archive button when mounted.", () => {
    const button = wrapper.find("[data-testid='archive-button-music']");

    expect(button.exists()).toBeTruthy();
  });

  it("should render the archive tooltip when mounted.", () => {
    const tooltip = wrapper.findComponent({ name: "UTooltip" });

    expect(tooltip.props("text")).toBe("questionThemes.actions.archive");
  });

  it("should set the aria-label on the archive button when mounted.", () => {
    const button = wrapper.find("[data-testid='archive-button-music']");

    expect(button.attributes("aria-label")).toBe("questionThemes.actions.archive");
  });

  it("should register the confirm dialog with the overlay when mounted.", () => {
    expect(overlayMock.create).toHaveBeenCalledExactlyOnceWith(ConfirmDialog);
  });

  describe("Archive click", () => {
    it("should open the confirm dialog with the archive icon and i18n keys when the archive button is clicked.", async() => {
      const button = wrapper.find("[data-testid='archive-button-music']");
      await button.trigger("click");

      expect(overlayInstance.open).toHaveBeenCalledExactlyOnceWith({
        icon: "i-lucide-archive",
        title: "questionThemes.archive.confirmTitle",
        description: "questionThemes.archive.confirmDescription",
      });
    });

    it("should call archiveAndStoreQuestionTheme with the question theme id when the confirm dialog resolves with true.", async() => {
      overlayInstance.open.mockReturnValue({ result: Promise.resolve(true) });
      const button = wrapper.find("[data-testid='archive-button-music']");
      await button.trigger("click");
      await flushPromises();

      expect(questionThemesStore.archiveAndStoreQuestionTheme).toHaveBeenCalledExactlyOnceWith("theme-id-123");
    });

    it("should not call archiveAndStoreQuestionTheme when the confirm dialog resolves with false.", async() => {
      overlayInstance.open.mockReturnValue({ result: Promise.resolve(false) });
      const button = wrapper.find("[data-testid='archive-button-music']");
      await button.trigger("click");
      await flushPromises();

      expect(questionThemesStore.archiveAndStoreQuestionTheme).not.toHaveBeenCalled();
    });
  });
});