import { describe, it, expect } from "vitest";

import { isEmptyRecord, isRecord, stripEmptyValues } from "#shared/utils/helpers/object/object.helpers";

describe("Object Helpers", () => {
  describe(isRecord, () => {
    it("should return true when value is a plain object.", () => {
      expect(isRecord({ key: "value" })).toBeTruthy();
    });

    it("should return true when value is an empty object.", () => {
      expect(isRecord({})).toBeTruthy();
    });

    it("should return false when value is an array.", () => {
      expect(isRecord([1, 2, 3])).toBeFalsy();
    });

    it("should return false when value is a Date.", () => {
      expect(isRecord(new Date())).toBeFalsy();
    });

    it("should return false when value is a RegExp.", () => {
      expect(isRecord(/abc/u)).toBeFalsy();
    });

    it("should return false when value is a Map.", () => {
      expect(isRecord(new Map())).toBeFalsy();
    });

    it("should return false when value is a Set.", () => {
      expect(isRecord(new Set())).toBeFalsy();
    });

    it("should return false when value is a class instance.", () => {
      class Foo {}

      expect(isRecord(new Foo())).toBeFalsy();
    });

    it("should return false when value is null.", () => {
      expect(isRecord(null)).toBeFalsy();
    });

    it("should return false when value is undefined.", () => {
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

  describe(isEmptyRecord, () => {
    it("should return false when value is not a record.", () => {
      expect(isEmptyRecord("hello")).toBeFalsy();
    });

    it("should return false when value is null.", () => {
      expect(isEmptyRecord(null)).toBeFalsy();
    });

    it("should return false when value is an array.", () => {
      expect(isEmptyRecord([1, 2])).toBeFalsy();
    });

    it("should return true when value is an empty object.", () => {
      expect(isEmptyRecord({})).toBeTruthy();
    });

    it("should return true when all values are undefined.", () => {
      expect(isEmptyRecord({ first: undefined, second: undefined })).toBeTruthy();
    });

    it("should return false when at least one value is defined.", () => {
      expect(isEmptyRecord({ first: undefined, second: "value" })).toBeFalsy();
    });

    it("should return false when value is a non-empty object.", () => {
      expect(isEmptyRecord({ key: "value" })).toBeFalsy();
    });
  });

  describe(stripEmptyValues, () => {
    it("should return the input unchanged when it is not a record.", () => {
      expect(stripEmptyValues("hello")).toBe("hello");
    });

    it("should return the input unchanged when it is null.", () => {
      expect(stripEmptyValues(null)).toBeNull();
    });

    it("should return the input unchanged when it is an array.", () => {
      const input = [1, 2, 3];

      expect(stripEmptyValues(input)).toStrictEqual([1, 2, 3]);
    });

    it("should return the same structure when no values are empty records.", () => {
      const input = { name: "hello", count: 42 };

      expect(stripEmptyValues(input)).toStrictEqual({ name: "hello", count: 42 });
    });

    it("should set nested object to undefined when all its values are undefined.", () => {
      const input = { name: "hello", nested: { first: undefined, second: undefined } };

      expect(stripEmptyValues(input)).toStrictEqual({ name: "hello", nested: undefined });
    });

    it("should preserve nested object when at least one value is defined.", () => {
      const input = { name: "hello", nested: { first: undefined, second: "value" } };

      expect(stripEmptyValues(input)).toStrictEqual({ name: "hello", nested: { first: undefined, second: "value" } });
    });

    it("should set top-level key to undefined when deeply nested records are all empty.", () => {
      const input = { outer: { middle: { inner: undefined } } };

      expect(stripEmptyValues(input)).toStrictEqual({ outer: undefined });
    });

    it("should preserve already undefined top-level values when other values exist.", () => {
      const input = { first: undefined, second: "value" };

      expect(stripEmptyValues(input)).toStrictEqual({ first: undefined, second: "value" });
    });

    it("should set empty nested objects to undefined when mixed with non-empty siblings.", () => {
      const input = {
        name: "test",
        empty: { value: undefined },
        filled: { value: "data" },
      };

      expect(stripEmptyValues(input)).toStrictEqual({
        name: "test",
        empty: undefined,
        filled: { value: "data" },
      });
    });

    it("should not modify array values when they exist inside objects.", () => {
      const input = { items: [1, 2, 3], nested: { value: undefined } };

      expect(stripEmptyValues(input)).toStrictEqual({ items: [1, 2, 3], nested: undefined });
    });
  });
});