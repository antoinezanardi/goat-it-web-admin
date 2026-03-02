import type { NavigationMenuItem } from "@nuxt/ui";
import { describe } from "vitest";
import { DefaultLayoutHeader, UHeader, UNavigationMenu, UTooltip } from "#components";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { VueWrapper } from "@vue/test-utils";
import { beforeEach, expect, it } from "vitest";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { MOCKED_ROUTES } from "~~/tests/unit/utils/mocks/nuxt/useRouter/useRouter.mock.constants";

describe("Default Layout Header Component", () => {
  let wrapper: VueWrapper;

  async function mountDefaultLayoutHeaderComponent(options: MountSuspendedOptions = {}): Promise<VueWrapper> {
    return await mountSuspended(DefaultLayoutHeader, {
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountDefaultLayoutHeaderComponent();
  });

  it("should render the default layout header component when mounted.", async() => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Header", () => {
    it("should pass the translated title prop to the header component when mounted.", async() => {
      const header = wrapper.findComponent<typeof UHeader>({ ref: "uHeader" });

      expect(header.props("title")).toBe("common.app.name");
    });
  });

  describe("Navigation Menu", () => {
    it("should pass the items as props to the navigation menu component when mounted.", async() => {
      const navigationMenu = wrapper.findComponent<typeof UNavigationMenu>({ ref: "uNavigationMenu" });
      const expectedNavigationMenuItems: NavigationMenuItem[] = [
        {
          label: MOCKED_ROUTES[0].meta?.titleKey ?? MOCKED_ROUTES[0].name?.toString(),
          to: MOCKED_ROUTES[0].path,
          active: true,
          icon: MOCKED_ROUTES[0].meta?.icon,
        },
        {
          label: MOCKED_ROUTES[1].name?.toString(),
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
    it("should have a tooltip with translated text when mounted.", async() => {
      const gitHubTooltip = wrapper.findComponent<typeof UTooltip>({ ref: "uTooltip" });

      expect(gitHubTooltip.props("text")).toBe("navigation.openOnGitHub");
    });
  });
});
