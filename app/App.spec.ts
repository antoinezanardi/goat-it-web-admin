import { VueWrapper } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@/App.vue";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

describe("App Component", () => {
  let wrapper: VueWrapper;

  async function mountAppComponent(options: MountSuspendedOptions = {}): Promise<VueWrapper> {
    return await mountSuspended(App, {
      shallow: true,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountAppComponent();
  });

  it("should render the app component when mounted.", async() => {
    expect(wrapper.exists()).toBe(true);
  });
});