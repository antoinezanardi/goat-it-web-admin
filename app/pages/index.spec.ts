import HomePage from "@/pages/index.vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { definePageMetaMock } from "~~/tests/unit/utils/mocks/nuxt/definePageMeta.mock";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

describe("Home Page", () => {
  let wrapper: VueWrapper;

  async function mountHomePage(options: MountSuspendedOptions = {}): Promise<VueWrapper> {
    return await mountSuspended(HomePage, {
      ...options,
    });
  }

  beforeEach(async () => {
    wrapper = await mountHomePage();
  });

  it("should render the home page when mounted.", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should define page metadata when mounted.", async () => {
    const expectedPageMeta: Parameters<typeof definePageMeta>[0] = {
      "icon": "i-lucide-home",
      "titleKey": "home.pageTitle",
    };

    expect(definePageMetaMock).toHaveBeenCalledExactlyOnceWith(expectedPageMeta);
  });
});
