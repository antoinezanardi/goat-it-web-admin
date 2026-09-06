import type { NavigationMenuItem } from "@nuxt/ui";
import { describe, beforeEach, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { MOCKED_ROUTES } from "~~/tests/unit/utils/mocks/composables/nuxt/useRouter/useRouter.mock.constants";

import { DefaultLayoutHeader } from "#components";

describe("DefaultLayoutHeader Component", () => {
  let wrapper: VueWrapper;

  async function mountDefaultLayoutHeaderComponent(options: MountSuspendedOptions<typeof DefaultLayoutHeader> = {}): Promise<VueWrapper> {
    return mountSuspended(DefaultLayoutHeader, {
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountDefaultLayoutHeaderComponent();
  });

  it("should render DefaultLayoutHeader when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render DefaultLayoutHeaderRightContent in the right slot when mounted.", () => {
    const rightContent = wrapper.findComponent({ name: "DefaultLayoutHeaderRightContent" });

    expect(rightContent.exists()).toBeTruthy();
  });

  describe("Header", () => {
    it("should pass the translated title prop to the header component when mounted.", () => {
      const header = wrapper.getComponent({ name: "UHeader" });

      expect(header.props("title")).toBe("common.app.name");
    });
  });

  describe("Title", () => {
    it("should render the logo image with the correct i18n alt attribute when mounted.", () => {
      const logo = wrapper.find("img");

      expect(logo.attributes("alt")).toBe("common.app.logo");
    });

    it("should render the full app name span with the correct i18n text when mounted.", () => {
      const fullNameSpan = wrapper.find("[data-testid='default-layout-header-full-name']");

      expect(fullNameSpan.text()).toBe("common.app.name");
    });

    it("should render the short app name span with the correct i18n text when mounted.", () => {
      const shortNameSpan = wrapper.find("[data-testid='default-layout-header-short-name']");

      expect(shortNameSpan.text()).toBe("common.app.nameShort");
    });

    it("should render the short app name span visible on small screens when mounted.", () => {
      const shortNameSpan = wrapper.find("[data-testid='default-layout-header-short-name']");

      expect(shortNameSpan.attributes("class")).toContain("inline md:hidden");
    });
  });

  describe("Navigation Menu", () => {
    it("should pass the items sorted by order as props to the navigation menu component when mounted.", () => {
      const navigationMenu = wrapper.getComponent({ name: "UNavigationMenu" });
      const expectedNavigationMenuItems: NavigationMenuItem[] = [
        {
          label: MOCKED_ROUTES[3].meta.titleKey,
          to: MOCKED_ROUTES[3].path,
          active: true,
          icon: MOCKED_ROUTES[3].meta.icon,
        },
        {
          label: MOCKED_ROUTES[1].name,
          to: MOCKED_ROUTES[1].path,
          active: false,
          icon: undefined,
        },
        {
          to: MOCKED_ROUTES[0].path,
          label: undefined,
          active: false,
          icon: undefined,
        },
        {
          label: MOCKED_ROUTES[2].name,
          to: MOCKED_ROUTES[2].path,
          active: false,
          icon: undefined,
        },
      ];

      expect(navigationMenu.props("items")).toStrictEqual(expectedNavigationMenuItems);
    });
  });

  describe("Mobile Navigation Menu", () => {
    beforeEach(async() => {
      wrapper = await mountDefaultLayoutHeaderComponent({
        global: {
          stubs: {
            UModal: {
              template: "<div><slot name=\"content\"><slot name=\"body\" /></slot></div>",
              props: ["open"],
            },
          },
        },
      });
    });

    it("should render a vertical navigation menu for mobile in the body slot when mounted.", () => {
      const mobileNavigationMenu = wrapper.find("#default-layout-header-mobile-navigation-menu");

      expect(mobileNavigationMenu.exists()).toBeTruthy();
    });

    it("should pass the items sorted by order as props to the mobile navigation menu component when mounted.", () => {
      const mobileNavigationMenu = wrapper.findAllComponents({ name: "UNavigationMenu" })
        .find(component => component.html().includes("default-layout-header-mobile-navigation-menu"));
      const expectedNavigationMenuItems: NavigationMenuItem[] = [
        {
          label: MOCKED_ROUTES[3].meta.titleKey,
          to: MOCKED_ROUTES[3].path,
          active: true,
          icon: MOCKED_ROUTES[3].meta.icon,
        },
        {
          label: MOCKED_ROUTES[1].name,
          to: MOCKED_ROUTES[1].path,
          active: false,
          icon: undefined,
        },
        {
          to: MOCKED_ROUTES[0].path,
          label: undefined,
          active: false,
          icon: undefined,
        },
        {
          label: MOCKED_ROUTES[2].name,
          to: MOCKED_ROUTES[2].path,
          active: false,
          icon: undefined,
        },
      ];

      expect(mobileNavigationMenu?.props("items")).toStrictEqual(expectedNavigationMenuItems);
    });

    it("should pass vertical orientation to the mobile navigation menu when mounted.", () => {
      const mobileNavigationMenu = wrapper.findAllComponents({ name: "UNavigationMenu" })
        .find(component => component.html().includes("default-layout-header-mobile-navigation-menu"));

      expect(mobileNavigationMenu?.props("orientation")).toBe("vertical");
    });
  });
});