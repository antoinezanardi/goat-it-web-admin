import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { TableEmptyState } from "#components";

import type { TableEmptyStateProps } from "~/components/shared/table/TableEmptyState/table-empty-state.types";

describe("TableEmptyState Component", () => {
  const defaultProps: TableEmptyStateProps = { hasActiveFilter: false };
  let wrapper: VueWrapper;

  async function mountTableEmptyStateComponent(options: MountSuspendedOptions<typeof TableEmptyState> = {}): Promise<VueWrapper> {
    return mountSuspended(TableEmptyState, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountTableEmptyStateComponent();
  });

  it("should render the table empty state component when mounted.", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("Message", () => {
    it("should render the no data i18n key when hasActiveFilter is false.", () => {
      const message = wrapper.find("[data-testid='table-empty-state']");

      expect(message.text()).toBe("common.table.noData");
    });

    it("should render the no results i18n key when hasActiveFilter is true.", async() => {
      wrapper = await mountTableEmptyStateComponent({ props: { hasActiveFilter: true } });

      const message = wrapper.find("[data-testid='table-empty-state']");

      expect(message.text()).toBe("common.table.noResults");
    });
  });
});