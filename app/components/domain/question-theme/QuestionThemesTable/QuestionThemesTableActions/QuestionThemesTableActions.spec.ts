import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { TestingPinia } from "@pinia/testing";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { getWrapperVm } from "~~/tests/unit/utils/helpers/vtu.helpers";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { QuestionThemesTableActions } from "#components";
import type { ArchiveQuestionThemeButton, EditQuestionThemeButton } from "#components";

import type { QuestionThemesTableActionsProperties } from "~/components/domain/question-theme/QuestionThemesTable/QuestionThemesTableActions/question-themes-table-actions.types";

describe("QuestionThemesTableActions Component", () => {
  let wrapper: VueWrapper;
  let pinia: TestingPinia;

  const defaultProperties: QuestionThemesTableActionsProperties = {
    questionTheme: createFakeQuestionTheme({ id: "theme-id-123", slug: "music", status: "active" }),
  };

  async function mountQuestionThemesTableActionsComponent(options: MountSuspendedOptions<typeof QuestionThemesTableActions> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionThemesTableActions, {
      global: {
        plugins: [pinia],
      },
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    pinia = createTestingPinia();
    wrapper = await mountQuestionThemesTableActionsComponent();
  });

  it("should render the actions component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Archive button", () => {
    it("should render the archive button when the question theme is active.", () => {
      const archiveButton = wrapper.findComponent<typeof ArchiveQuestionThemeButton>("[data-testid='question-themes-table-actions-archive-music']");

      expect(archiveButton.exists()).toBeTruthy();
    });

    it("should pass the question theme id to the archive button when the question theme is active.", () => {
      const archiveButton = wrapper.findComponent<typeof ArchiveQuestionThemeButton>("[data-testid='question-themes-table-actions-archive-music']");

      expect(archiveButton.props("questionThemeId")).toBe("theme-id-123");
    });

    it("should pass the question theme slug to the archive button when the question theme is active.", () => {
      const archiveButton = wrapper.findComponent<typeof ArchiveQuestionThemeButton>("[data-testid='question-themes-table-actions-archive-music']");

      expect(archiveButton.props("questionThemeSlug")).toBe("music");
    });

    it("should not render the archive button when the question theme is archived.", async() => {
      wrapper = await mountQuestionThemesTableActionsComponent({
        props: {
          questionTheme: createFakeQuestionTheme({ slug: "music", status: "archived" }),
        },
      });
      const archiveButton = wrapper.find("[data-testid='question-themes-table-actions-archive-music']");

      expect(archiveButton.exists()).toBeFalsy();
    });
  });

  describe("Edit button", () => {
    it("should render the edit button when the question theme is active.", () => {
      const editButton = wrapper.findComponent<typeof EditQuestionThemeButton>("[data-testid='question-themes-table-actions-edit-music']");

      expect(editButton.exists()).toBeTruthy();
    });

    it("should render the edit button when the question theme is archived.", async() => {
      wrapper = await mountQuestionThemesTableActionsComponent({
        props: {
          questionTheme: createFakeQuestionTheme({ slug: "music", status: "archived" }),
        },
      });
      const editButton = wrapper.findComponent<typeof EditQuestionThemeButton>("[data-testid='question-themes-table-actions-edit-music']");

      expect(editButton.exists()).toBeTruthy();
    });

    it("should pass the question theme id to the edit button when the question theme is active.", () => {
      const editButton = wrapper.findComponent<typeof EditQuestionThemeButton>("[data-testid='question-themes-table-actions-edit-music']");

      expect(editButton.props("questionThemeId")).toBe("theme-id-123");
    });

    it("should pass the question theme slug to the edit button when the question theme is active.", () => {
      const editButton = wrapper.findComponent<typeof EditQuestionThemeButton>("[data-testid='question-themes-table-actions-edit-music']");

      expect(editButton.props("questionThemeSlug")).toBe("music");
    });

    it("should re-emit startEdit with the id when the edit button emits startEdit.", () => {
      const editButton = wrapper.findComponent<typeof EditQuestionThemeButton>("[data-testid='question-themes-table-actions-edit-music']");
      getWrapperVm(editButton).$emit("startEdit", "theme-id-123");

      expect(wrapper.emitted("startEdit")).toStrictEqual([["theme-id-123"]]);
    });
  });
});