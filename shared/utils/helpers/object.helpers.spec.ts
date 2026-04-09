import { describe, it, expect } from "vitest";

import { isRecord } from "~~/shared/utils/helpers/object.helpers";

describe("Object Helpers", () => {
  describe(isRecord, () => {
    it("should return true when value is a plain object.", () => {
      expect(isRecord({ key: "value" })).toBeTruthy();
    });

    it("should return true when value is an empty object.", () => {
      expect(isRecord({})).toBeTruthy();
    });

    it("should return true when value is an array.", () => {
      expect(isRecord([1, 2, 3])).toBeTruthy();
    });

    it("should return false when value is null.", () => {
      expect(isRecord(null)).toBeFalsy();
    });

    it("should return false when value is undefined.", () => {
      // oxlint-disable-next-line unicorn/no-useless-undefined
      expect(isRecord(undefined)).toBeFalsy();
    });

    it("should return false when value is a string.", () => {
      expect(isRecord("hello")).toBeFalsy();
    });

    it("should return false when value is a number.", () => {
      expect(isRecord(42)).toBeFalsy();
    });

    it("should return false when value is a boolean.", () => {
      expect(isRecord(true)).toBeFalsy();
    });
  });
});