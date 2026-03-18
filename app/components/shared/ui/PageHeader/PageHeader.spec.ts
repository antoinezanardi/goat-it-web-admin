import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UIcon, UPageHeader } from "#components";
import { PageHeader } from "#components";

import type { PageHeaderProperties } from "~/components/shared/ui/PageHeader/page-header.types";

describe("Page Header Component", () => {
  let wrapper: VueWrapper;
  const defaultPageHeaderProperties: PageHeaderProperties = {
    title: "Test Title",
    icon: "i-lucide-palette",
  } as const;

  async function mountPageHeaderComponent(options: MountSuspendedOptions<typeof PageHeader> = {}): Promise<VueWrapper> {
    return mountSuspended(PageHeader, {
      props: defaultPageHeaderProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountPageHeaderComponent();
  });

  it("should render the page header component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Page Header", () => {
    it("should pass the title prop to the page header component when mounted.", async() => {
      wrapper = await mountPageHeaderComponent({
        props: {
          ...defaultPageHeaderProperties,
          title: "My Page",
        },
      });
      const pageHeader = wrapper.getComponent<typeof UPageHeader>({ name: "UPageHeader" });

      expect(pageHeader.text()).toContain("My Page");
    });

    it("should pass the icon name prop to the icon component when mounted.", async() => {
      wrapper = await mountPageHeaderComponent({
        props: {
          ...defaultPageHeaderProperties,
          icon: "i-lucide-star",
        },
      });
      const icon = wrapper.getComponent<typeof UIcon>({ name: "UIcon" });

      expect(icon.props("name")).toBe("i-lucide-star");
    });
  });
});