import { VueWrapper } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@/App.vue";
import { APP_TOOLTIP_CONFIG } from "~/app.constants";
import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";
import { UApp } from "#components";

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

  describe("Nuxt UI App", () => {
    it("should pass tooltip props to the Nuxt UI App component when mounted.", async() => {
      const nuxtUIApp = wrapper.findComponent<typeof UApp>({ ref: "nuxt-ui-app" });

      expect(nuxtUIApp.props("tooltip")).toStrictEqual<typeof APP_TOOLTIP_CONFIG>(APP_TOOLTIP_CONFIG);
    });
  })
});