import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import { DefaultModalFooter } from "#components";
import type { UButton } from "#components";

import type { DefaultModalFooterProperties } from "~/components/shared/ui/modal/DefaultModalFooter/default-modal-footer.types";

describe("DefaultModalFooter Component", () => {
  let wrapper: VueWrapper;

  const defaultDefaultModalFooterProperties: DefaultModalFooterProperties = {
    primaryButtonLabel: "common.create",
    primaryButtonIcon: "i-lucide-circle-plus",
  } as const;

  async function mountDefaultModalFooterComponent(options: MountSuspendedOptions<typeof DefaultModalFooter> = {}): Promise<VueWrapper> {
    return mountSuspended(DefaultModalFooter, {
      props: defaultDefaultModalFooterProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountDefaultModalFooterComponent();
  });

  it("should render the default modal footer component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Close button", () => {
    describe("Label", () => {
      it("should display the common.close i18n key as label when closeButtonLabel prop is not provided.", () => {
        const closeButton = wrapper.findAllComponents<typeof UButton>({ name: "UButton" }).at(0);

        expect(closeButton?.props("label")).toBe("common.close");
      });

      it("should display the custom label when closeButtonLabel prop is provided.", async() => {
        wrapper = await mountDefaultModalFooterComponent({
          props: { ...defaultDefaultModalFooterProperties, closeButtonLabel: "common.cancel" },
        });

        const closeButton = wrapper.findAllComponents<typeof UButton>({ name: "UButton" }).at(0);

        expect(closeButton?.props("label")).toBe("common.cancel");
      });
    });

    describe("Disabled state", () => {
      it("should not be disabled when isCloseButtonDisabled is not provided.", () => {
        const closeButton = wrapper.findAllComponents<typeof UButton>({ name: "UButton" }).at(0);

        expect(closeButton?.props("disabled")).toBeFalsy();
      });

      it("should be disabled when isCloseButtonDisabled is true.", async() => {
        wrapper = await mountDefaultModalFooterComponent({
          props: { ...defaultDefaultModalFooterProperties, isCloseButtonDisabled: true },
        });

        const closeButton = wrapper.findAllComponents<typeof UButton>({ name: "UButton" }).at(0);

        expect(closeButton?.props("disabled")).toBeTruthy();
      });
    });

    describe("Click", () => {
      it("should emit closeModal when the close button is clicked.", async() => {
        const closeButton = wrapper.findAll("button").at(0);

        await closeButton?.trigger("click");

        expect(wrapper.emitted("closeModal")).toHaveLength(1);
      });
    });
  });

  describe("Primary button", () => {
    describe("Label", () => {
      it("should pass the primaryButtonLabel prop to the primary button when mounted.", () => {
        const primaryButton = wrapper.findAllComponents<typeof UButton>({ name: "UButton" }).at(1);

        expect(primaryButton?.props("label")).toBe("common.create");
      });
    });

    describe("Icon", () => {
      it("should pass the primaryButtonIcon prop to the primary button when mounted.", () => {
        const primaryButton = wrapper.findAllComponents<typeof UButton>({ name: "UButton" }).at(1);

        expect(primaryButton?.props("icon")).toBe("i-lucide-circle-plus");
      });
    });

    describe("Disabled state", () => {
      it("should not be disabled when isPrimaryButtonDisabled is not provided.", () => {
        const primaryButton = wrapper.findAllComponents<typeof UButton>({ name: "UButton" }).at(1);

        expect(primaryButton?.props("disabled")).toBeFalsy();
      });

      it("should be disabled when isPrimaryButtonDisabled is true.", async() => {
        wrapper = await mountDefaultModalFooterComponent({
          props: { ...defaultDefaultModalFooterProperties, isPrimaryButtonDisabled: true },
        });

        const primaryButton = wrapper.findAllComponents<typeof UButton>({ name: "UButton" }).at(1);

        expect(primaryButton?.props("disabled")).toBeTruthy();
      });
    });

    describe("Loading state", () => {
      it("should not be loading when isPrimaryButtonLoading is not provided.", () => {
        const primaryButton = wrapper.findAllComponents<typeof UButton>({ name: "UButton" }).at(1);

        expect(primaryButton?.props("loading")).toBeFalsy();
      });

      it("should be loading when isPrimaryButtonLoading is true.", async() => {
        wrapper = await mountDefaultModalFooterComponent({
          props: { ...defaultDefaultModalFooterProperties, isPrimaryButtonLoading: true },
        });

        const primaryButton = wrapper.findAllComponents<typeof UButton>({ name: "UButton" }).at(1);

        expect(primaryButton?.props("loading")).toBeTruthy();
      });
    });

    describe("Click", () => {
      it("should emit primaryButtonClick when the primary button is clicked.", async() => {
        const primaryButton = wrapper.findAll("button").at(1);

        await primaryButton?.trigger("click");

        expect(wrapper.emitted("primaryButtonClick")).toHaveLength(1);
      });
    });
  });
});