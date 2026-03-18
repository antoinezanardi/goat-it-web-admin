import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UButton, UTooltip } from "#components";
import { DefaultLayoutHeaderRightContent } from "#components";

describe("DefaultLayoutHeaderRightContent Component", () => {
  let wrapper: VueWrapper;

  async function mountDefaultLayoutHeaderRightContentComponent(options: MountSuspendedOptions<typeof DefaultLayoutHeaderRightContent> = {}): Promise<VueWrapper> {
    return mountSuspended(DefaultLayoutHeaderRightContent, {
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountDefaultLayoutHeaderRightContentComponent();
  });

  it("should render the component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("GitHub Button", () => {
    it("should have a tooltip with translated text when mounted.", () => {
      const gitHubTooltip = wrapper.getComponent<typeof UTooltip>("#default-layout-header-github-link-tooltip");

      expect(gitHubTooltip.props("text")).toBe("navigation.openOnGitHub");
    });

    it("should have translated aria-label on the GitHub link when mounted.", () => {
      const gitHubLink = wrapper.getComponent<typeof UButton>("#default-layout-header-github-link");

      expect(gitHubLink.attributes("aria-label")).toBe("navigation.openOnGitHub");
    });
  });

  describe("Color Mode Switch Tooltip", () => {
    it("should have a tooltip with switch to dark mode text when color mode is light.", async() => {
      const colorMode = useColorMode();
      colorMode.value = "light";
      await nextTick();

      const colorModeSwitchTooltip = wrapper.getComponent<typeof UTooltip>("#default-layout-header-color-mode-switch-tooltip");

      expect(colorModeSwitchTooltip.props("text")).toBe("navigation.switchOnDarkMode");
    });

    it("should have a tooltip with switch to light mode text when color mode is dark.", async() => {
      const colorMode = useColorMode();
      colorMode.value = "dark";
      await nextTick();

      const colorModeSwitchTooltip = wrapper.getComponent<typeof UTooltip>("#default-layout-header-color-mode-switch-tooltip");

      expect(colorModeSwitchTooltip.props("text")).toBe("navigation.switchOnLightMode");
    });
  });
});