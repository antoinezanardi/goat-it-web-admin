import type { VueWrapper } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import App from "@/App.vue";
import { APP_TOAST_CONFIG, APP_TOOLTIP_CONFIG } from "~/app.constants";

describe("App Component", () => {
  let wrapper: VueWrapper;

  async function mountAppComponent(options: MountSuspendedOptions<typeof App> = {}): Promise<VueWrapper> {
    return mountSuspended(App, {
      shallow: true,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountAppComponent();
  });

  it("should render the app component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Nuxt UI App", () => {
    it("should pass tooltip props to the Nuxt UI App component when mounted.", () => {
      const nuxtUIApp = wrapper.getComponent({ name: "App" });

      expect(nuxtUIApp.props("tooltip")).toStrictEqual<typeof APP_TOOLTIP_CONFIG>(APP_TOOLTIP_CONFIG);
    });

    it("should pass toaster props to the Nuxt UI App component when mounted.", () => {
      const nuxtUIApp = wrapper.getComponent({ name: "App" });

      expect(nuxtUIApp.props("toaster")).toStrictEqual<typeof APP_TOAST_CONFIG>(APP_TOAST_CONFIG);
    });
  });
});