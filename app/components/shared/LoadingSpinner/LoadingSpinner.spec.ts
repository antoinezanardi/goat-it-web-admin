import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UIcon } from "#components";
import { LoadingSpinner } from "#components";

describe("Loading Spinner Component", () => {
  let wrapper: VueWrapper;

  async function mountLoadingSpinnerComponent(options: MountSuspendedOptions<typeof LoadingSpinner> = {}): Promise<VueWrapper> {
    return mountSuspended(LoadingSpinner, {
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountLoadingSpinnerComponent();
  });

  it("should render the loading spinner component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Spinner Icon", () => {
    it("should pass the loader circle icon name to the icon component when mounted.", () => {
      const icon = wrapper.getComponent<typeof UIcon>({ name: "UIcon" });

      expect(icon.props("name")).toBe("i-lucide-loader-circle");
    });
  });

  describe("Label", () => {
    it("should not render the label when no label prop is provided.", () => {
      const label = wrapper.find("#loading-spinner-label");

      expect(label.exists()).toBeFalsy();
    });

    it("should not render the label when label prop is an empty string.", async() => {
      wrapper = await mountLoadingSpinnerComponent({
        props: {
          label: "",
        },
      });

      const label = wrapper.find("#loading-spinner-label");

      expect(label.exists()).toBeFalsy();
    });

    it("should render the label when label prop is a non-empty string.", async() => {
      wrapper = await mountLoadingSpinnerComponent({ props: { label: "Loading..." } });

      const label = wrapper.find("#loading-spinner-label");

      expect(label.exists()).toBeTruthy();
    });

    it("should display the provided label text when label prop is a non-empty string.", async() => {
      wrapper = await mountLoadingSpinnerComponent({ props: { label: "Please wait" } });

      const label = wrapper.find("#loading-spinner-label");

      expect(label.text()).toBe("Please wait");
    });
  });
});