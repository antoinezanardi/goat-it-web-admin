import type { NavigationMenuItem } from "@nuxt/ui";
import { describe, beforeEach, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { MOCKED_ROUTES } from "~~/tests/unit/utils/mocks/composables/nuxt/useRouter/useRouter.mock.constants";

import type { UButton, UTooltip } from "#components";
import { DefaultLayoutHeader } from "#components";

describe("Default Layout Header Component", () => {
  let wrapper: VueWrapper;

  async function mountDefaultLayoutHeaderComponent(options: MountSuspendedOptions<typeof DefaultLayoutHeader> = {}): Promise<VueWrapper> {
    return mountSuspended(DefaultLayoutHeader, {
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountDefaultLayoutHeaderComponent();
  });

  it("should render the default layout header component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Header", () => {
    it("should pass the translated title prop to the header component when mounted.", () => {
      const header = wrapper.getComponent({ name: "UHeader" });

      expect(header.props("title")).toBe("common.app.name");
    });
  });

  describe("Navigation Menu", () => {
    it("should pass the items as props to the navigation menu component when mounted.", () => {
      const navigationMenu = wrapper.getComponent({ name: "UNavigationMenu" });
      const expectedNavigationMenuItems: NavigationMenuItem[] = [
        {
          label: MOCKED_ROUTES[0].meta.titleKey,
          to: MOCKED_ROUTES[0].path,
          active: true,
          icon: MOCKED_ROUTES[0].meta.icon,
        },
        {
          label: MOCKED_ROUTES[1].name,
          to: MOCKED_ROUTES[1].path,
          active: false,
          icon: undefined,
        },
        {
          to: MOCKED_ROUTES[2].path,
          label: undefined,
          active: false,
          icon: undefined,
        },
      ];

      expect(navigationMenu.props("items")).toStrictEqual<NavigationMenuItem[]>(expectedNavigationMenuItems);
    });
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
});