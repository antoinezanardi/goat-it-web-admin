import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Ref } from "vue";
import { nextTick, ref } from "vue";

import type { useFormDirtyGuard as UseFormDirtyGuardType } from "~/composables/ui/useFormDirtyGuard/useFormDirtyGuard";

const mockOverlayCreate = vi.fn<() => {
  open: (props?: unknown) => { result: Promise<unknown> };
}>();
const mockOverlayInstanceOpen = vi.fn<(props?: unknown) => { result: Promise<unknown> }>();
const { mockOnBeforeRouteLeave } = vi.hoisted(() => ({
  mockOnBeforeRouteLeave: vi.fn<(callback: (to: { fullPath: string }) => unknown) => void>(),
}));

type UseOverlayStub = {
  create: typeof mockOverlayCreate;
};

mockNuxtImport("useOverlay", () => (): UseOverlayStub => ({
  create: mockOverlayCreate,
}));

mockNuxtImport("onBeforeRouteLeave", () => mockOnBeforeRouteLeave);

let useFormDirtyGuard: typeof UseFormDirtyGuardType;

describe("useFormDirtyGuard", () => {
  let open: Ref<boolean>;
  let isDirty: Ref<boolean>;
  let mockPush: ReturnType<typeof vi.fn>;

  const messages = { titleKey: "common.unsavedChanges.title", descriptionKey: "common.unsavedChanges.description" };

  function getRouteGuard(): (to: { fullPath: string }) => unknown {
    // Acceptable as `toHaveBeenCalledExactlyOnceWith` ensures calls[0] exists before this helper runs
    // oxlint-disable-next-line @typescript-eslint/no-non-null-assertion
    return mockOnBeforeRouteLeave.mock.calls[0]![0];
  }

  beforeEach(async() => {
    open = ref<boolean>(true);
    isDirty = ref<boolean>(false);
    mockOverlayCreate.mockReset();
    mockOverlayInstanceOpen.mockReset();
    mockOnBeforeRouteLeave.mockReset();
    mockOverlayCreate.mockReturnValue({
      open: mockOverlayInstanceOpen,
    });

    mockPush = vi.fn<(...arguments_: unknown[]) => Promise<void>>();
    Object.assign(useRouter(), { push: mockPush });

    await import("~/components/shared/ui/modal/ConfirmDialog/ConfirmDialog.vue");
    ({ useFormDirtyGuard } = await import("~/composables/ui/useFormDirtyGuard/useFormDirtyGuard"));
  });

  describe("onRequestClose", () => {
    it("should set open to false when the form is clean.", () => {
      const { onRequestClose } = useFormDirtyGuard(open, isDirty, messages);

      onRequestClose();

      expect(open.value).toBeFalsy();
    });

    it("should leave open true and show confirmation dialog when the form is dirty.", async() => {
      isDirty.value = true;
      const resolvers: ((value: unknown) => void)[] = [];
      mockOverlayInstanceOpen.mockReturnValue({
        result: new Promise<unknown>(resolve => {
          resolvers.push(resolve);
        }),
      });
      const { onRequestClose } = useFormDirtyGuard(open, isDirty, messages);

      onRequestClose();
      await flushPromises();

      expect(open.value).toBeTruthy();
    });

    it("should set open to false when the form is dirty and the user confirms.", async() => {
      isDirty.value = true;
      mockOverlayInstanceOpen.mockReturnValue({ result: Promise.resolve(true) });
      const { onRequestClose } = useFormDirtyGuard(open, isDirty, messages);

      onRequestClose();
      await flushPromises();

      expect(open.value).toBeFalsy();
    });

    it("should keep open true when the form is dirty and the user cancels.", async() => {
      isDirty.value = true;
      mockOverlayInstanceOpen.mockReturnValue({ result: Promise.resolve(false) });
      const { onRequestClose } = useFormDirtyGuard(open, isDirty, messages);

      onRequestClose();
      await flushPromises();

      expect(open.value).toBeTruthy();
    });
  });

  describe("watcher", () => {
    it("should not show dialog when open transitions to false with a clean form.", async() => {
      useFormDirtyGuard(open, isDirty, messages);
      open.value = false;
      await flushPromises();

      expect(mockOverlayCreate).not.toHaveBeenCalled();
    });

    it("should show dialog and revert open when open transitions to false with a dirty form.", async() => {
      isDirty.value = true;
      mockOverlayInstanceOpen.mockReturnValue({
        result: new Promise<never>(() => {
          /* Empty */
        }),
      });
      useFormDirtyGuard(open, isDirty, messages);
      open.value = false;
      await flushPromises();

      expect(open.value).toBeTruthy();
    });

    it("should create the confirmation dialog when open transitions to false with a dirty form.", async() => {
      isDirty.value = true;
      mockOverlayInstanceOpen.mockReturnValue({
        result: new Promise<never>(() => {
          /* Empty */
        }),
      });
      useFormDirtyGuard(open, isDirty, messages);
      open.value = false;
      await flushPromises();

      expect(mockOverlayCreate).toHaveBeenCalledExactlyOnceWith(expect.any(Object), {});
    });
  });

  describe("onBeforeRouteLeave", () => {
    it("should register a route guard when used.", () => {
      useFormDirtyGuard(open, isDirty, messages);

      expect(mockOnBeforeRouteLeave).toHaveBeenCalledExactlyOnceWith(expect.any(Function));
    });

    it("should not show the confirmation dialog when the route guard runs with a clean form.", async() => {
      useFormDirtyGuard(open, isDirty, messages);
      const routeGuard = getRouteGuard();

      await routeGuard({ fullPath: "/target-route" });

      expect(mockOverlayCreate).not.toHaveBeenCalled();
    });

    it("should not show the confirmation dialog when the route guard runs with a closed form.", async() => {
      open.value = false;
      isDirty.value = true;
      useFormDirtyGuard(open, isDirty, messages);
      const routeGuard = getRouteGuard();

      await routeGuard({ fullPath: "/target-route" });

      expect(mockOverlayCreate).not.toHaveBeenCalled();
    });

    it("should show the confirmation dialog when the route guard runs with a dirty form.", async() => {
      isDirty.value = true;
      mockOverlayInstanceOpen.mockReturnValue({ result: Promise.resolve(true) });
      useFormDirtyGuard(open, isDirty, messages);
      const routeGuard = getRouteGuard();

      await routeGuard({ fullPath: "/target-route" });

      expect(mockOverlayCreate).toHaveBeenCalledExactlyOnceWith(expect.any(Object), {});
    });

    it("should set open to false when the route guard confirmation is accepted.", async() => {
      isDirty.value = true;
      mockOverlayInstanceOpen.mockReturnValue({ result: Promise.resolve(true) });
      useFormDirtyGuard(open, isDirty, messages);
      const routeGuard = getRouteGuard();

      await routeGuard({ fullPath: "/target-route" });

      expect(open.value).toBeFalsy();
    });

    it("should return true to allow navigation when the route guard confirmation is accepted.", async() => {
      isDirty.value = true;
      mockOverlayInstanceOpen.mockReturnValue({ result: Promise.resolve(true) });
      useFormDirtyGuard(open, isDirty, messages);
      const routeGuard = getRouteGuard();

      const result = await routeGuard({ fullPath: "/target-route" });

      expect(result).toBe(true);
    });

    it("should not call router.push when the route guard confirmation is accepted.", async() => {
      isDirty.value = true;
      mockOverlayInstanceOpen.mockReturnValue({ result: Promise.resolve(true) });
      useFormDirtyGuard(open, isDirty, messages);
      const routeGuard = getRouteGuard();
      await routeGuard({ fullPath: "/target-route" });

      expect(mockPush).not.toHaveBeenCalled();
    });

    it("should keep open true when the route guard confirmation is rejected.", async() => {
      isDirty.value = true;
      mockOverlayInstanceOpen.mockReturnValue({ result: Promise.resolve(false) });
      useFormDirtyGuard(open, isDirty, messages);
      const routeGuard = getRouteGuard();

      await routeGuard({ fullPath: "/target-route" });

      expect(open.value).toBeTruthy();
    });

    it("should return false when the route guard confirmation is rejected.", async() => {
      isDirty.value = true;
      mockOverlayInstanceOpen.mockReturnValue({ result: Promise.resolve(false) });
      useFormDirtyGuard(open, isDirty, messages);
      const routeGuard = getRouteGuard();

      const result = await routeGuard({ fullPath: "/target-route" });

      expect(result).toBe(false);
    });
  });

  describe("forceClose", () => {
    it("should set open to false when called.", () => {
      const { forceClose } = useFormDirtyGuard(open, isDirty, messages);

      forceClose();

      expect(open.value).toBeFalsy();
    });

    it("should bypass the guard when open is set to false externally after forceClose.", async() => {
      open.value = false;
      useFormDirtyGuard(open, isDirty, messages);
      open.value = true;
      isDirty.value = true;

      const { forceClose } = useFormDirtyGuard(open, isDirty, messages);
      forceClose();
      await nextTick();

      expect(open.value).toBeFalsy();
    });
  });
});