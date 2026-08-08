import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach } from "vitest";

import { createUseFormDirtyGuardMock } from "~~/tests/unit/utils/mocks/composables/ui/useFormDirtyGuard/useFormDirtyGuard.mock";
import type { UseFormDirtyGuardMock } from "~~/tests/unit/utils/mocks/composables/ui/useFormDirtyGuard/useFormDirtyGuard.mock";

let useFormDirtyGuardMock: UseFormDirtyGuardMock = createUseFormDirtyGuardMock();

mockNuxtImport("useFormDirtyGuard", () => (): UseFormDirtyGuardMock => useFormDirtyGuardMock);

beforeEach(() => {
  useFormDirtyGuardMock = createUseFormDirtyGuardMock();
});