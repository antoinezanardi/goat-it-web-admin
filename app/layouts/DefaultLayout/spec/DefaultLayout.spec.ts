import type { VueWrapper } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout.vue";

describe("Default Layout", () => {
  let wrapper: VueWrapper;

  async function mountDefaultLayout(options: MountSuspendedOptions = {}): Promise<VueWrapper> {
    return mountSuspended(DefaultLayout, {
      shallow: true,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountDefaultLayout();
  });

  it("should render the default layout when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});