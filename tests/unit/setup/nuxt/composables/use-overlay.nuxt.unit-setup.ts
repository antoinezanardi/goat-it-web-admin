import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach } from "vitest";

import { createUseOverlayMock } from "~~/tests/unit/utils/mocks/composables/ui/useOverlay/useOverlay.mock";
import type { UseOverlayMock } from "~~/tests/unit/utils/mocks/composables/ui/useOverlay/useOverlay.mock";

let useOverlayMock: UseOverlayMock = createUseOverlayMock();
mockNuxtImport("useOverlay", () => (): UseOverlayMock => useOverlayMock);
beforeEach(() => {
  useOverlayMock = createUseOverlayMock();
});