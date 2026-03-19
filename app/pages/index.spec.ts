import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { PageHeader } from "#components";

import { HOME_PAGE_ICON, HOME_PAGE_TITLE_KEY } from "@/pages/index.constants";
import HomePage from "@/pages/index.vue";

describe("Home Page", () => {
  let wrapper: VueWrapper;

  async function mountHomePage(options: MountSuspendedOptions<typeof HomePage> = {}): Promise<VueWrapper> {
    return mountSuspended(HomePage, {
      shallow: true,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountHomePage();
  });

  it("should render the home page when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should define page metadata when mounted.", () => {
    const expectedPageMeta: Parameters<typeof definePageMeta>[0] = {
      icon: HOME_PAGE_ICON,
      titleKey: HOME_PAGE_TITLE_KEY,
    };

    expect(definePageMeta).toHaveBeenCalledExactlyOnceWith(expectedPageMeta);
  });

  it("should set the page title via useHead when mounted.", () => {
    const expectedHeadInput = {
      title: HOME_PAGE_TITLE_KEY,
    };
    const extractedHeadFunction = vi.mocked(useHead).mock.calls[0]?.[0] as () => Record<string, unknown>;

    expect(extractedHeadFunction()).toStrictEqual(expectedHeadInput);
  });

  describe("Page Header", () => {
    it("should pass the translated page title to the page header component when mounted.", () => {
      const pageHeader = wrapper.getComponent<typeof PageHeader>({ name: "PageHeader" });

      expect(pageHeader.props("title")).toBe(HOME_PAGE_TITLE_KEY);
    });

    it("should pass the page icon to the page header component when mounted.", () => {
      const pageHeader = wrapper.getComponent<typeof PageHeader>({ name: "PageHeader" });

      expect(pageHeader.props("icon")).toBe(HOME_PAGE_ICON);
    });
  });
});