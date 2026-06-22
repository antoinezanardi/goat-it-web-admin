import { describe, it, expect } from "vitest";

import { isEmptyRecord, isRecord, stripEmptyValues, toKebabCaseKeys } from "#shared/utils/helpers/object/object.helpers";

describe("Object Helpers", () => {
  describe(isRecord, () => {
    it.each<{ value: unknown; description: string }>([
      {
        value: { key: "value" },
        description: "a plain object",
      },
      {
        value: {},
        description: "an empty object",
      },
    ])("should return true when value is $description.", ({ value }) => {
      expect(isRecord(value)).toBeTruthy();
    });

    it.each<{ value: unknown; description: string }>([
      {
        value: [
          1,
          2,
          3,
        ],
        description: "an array",
      },
      {
        value: new Date(),
        description: "a Date",
      },
      {
        value: /abc/u,
        description: "a RegExp",
      },
      {
        value: new Map(),
        description: "a Map",
      },
      {
        value: new Set(),
        description: "a Set",
      },
      {
        value: null,
        description: "null",
      },
      {
        value: undefined,
        description: "undefined",
      },
      {
        value: "hello",
        description: "a string",
      },
      {
        value: 42,
        description: "a number",
      },
      {
        value: true,
        description: "a boolean",
      },
    ])("should return false when value is $description.", ({ value }) => {
      expect(isRecord(value)).toBeFalsy();
    });

    it("should return false when value is a class instance.", () => {
      class Foo {}

      expect(isRecord(new Foo())).toBeFalsy();
    });
  });

  describe(isEmptyRecord, () => {
    it.each<{ value: unknown; description: string }>([
      {
        value: {},
        description: "an empty object",
      },
      {
        value: {
          first: undefined,
          second: undefined,
        },
        description: "an object with all undefined values",
      },
    ])("should return true when value is $description.", ({ value }) => {
      expect(isEmptyRecord(value)).toBeTruthy();
    });

    it.each<{ value: unknown; description: string }>([
      {
        value: "hello",
        description: "not a record",
      },
      {
        value: null,
        description: "null",
      },
      {
        value: [
          1,
          2,
        ],
        description: "an array",
      },
      {
        value: {
          first: undefined,
          second: "value",
        },
        description: "an object with at least one defined value",
      },
      {
        value: { key: "value" },
        description: "a non-empty object",
      },
    ])("should return false when value is $description.", ({ value }) => {
      expect(isEmptyRecord(value)).toBeFalsy();
    });
  });

  describe(stripEmptyValues, () => {
    it.each<{ input: unknown; expected: unknown; description: string }>([
      {
        input: "hello",
        expected: "hello",
        description: "a string",
      },
      {
        input: null,
        expected: null,
        description: "null",
      },
      {
        input: [
          1,
          2,
          3,
        ],
        expected: [
          1,
          2,
          3,
        ],
        description: "an array",
      },
    ])("should return the input unchanged when it is $description.", ({
      input,
      expected,
    }) => {
      expect(stripEmptyValues(input)).toStrictEqual(expected);
    });

    it("should return the same structure when no values are empty records.", () => {
      const input = {
        name: "hello",
        count: 42,
      };

      expect(stripEmptyValues(input)).toStrictEqual({
        name: "hello",
        count: 42,
      });
    });

    it("should set nested object to undefined when all its values are undefined.", () => {
      const input = {
        name: "hello",
        nested: {
          first: undefined,
          second: undefined,
        },
      };

      expect(stripEmptyValues(input)).toStrictEqual({
        name: "hello",
        nested: undefined,
      });
    });

    it("should preserve nested object when at least one value is defined.", () => {
      const input = {
        name: "hello",
        nested: {
          first: undefined,
          second: "value",
        },
      };

      expect(stripEmptyValues(input)).toStrictEqual({
        name: "hello",
        nested: {
          first: undefined,
          second: "value",
        },
      });
    });

    it("should set top-level key to undefined when deeply nested records are all empty.", () => {
      const input = { outer: { middle: { inner: undefined } } };

      expect(stripEmptyValues(input)).toStrictEqual({ outer: undefined });
    });

    it("should preserve already undefined top-level values when other values exist.", () => {
      const input = {
        first: undefined,
        second: "value",
      };

      expect(stripEmptyValues(input)).toStrictEqual({
        first: undefined,
        second: "value",
      });
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
      const input = {
        items: [
          1,
          2,
          3,
        ],
        nested: { value: undefined },
      };

      expect(stripEmptyValues(input)).toStrictEqual({
        items: [
          1,
          2,
          3,
        ],
        nested: undefined,
      });
    });
  });

  describe(toKebabCaseKeys, () => {
    it.each<{ input: Record<string, unknown>; expected: Record<string, unknown>; description: string }>([
      {
        input: {
          cognitiveDifficulty: "hard",
          someKey: "value",
        },
        expected: {
          "cognitive-difficulty": "hard",
          "some-key": "value",
        },
        description: "keys are in camelCase",
      },
      {
        input: {
          "status": "active",
          "already-kebab": "value",
        },
        expected: {
          "status": "active",
          "already-kebab": "value",
        },
        description: "keys are already kebab-case",
      },
      {
        input: {},
        expected: {},
        description: "the input is an empty object",
      },
      {
        input: {
          numberKey: 42,
          booleanKey: true,
          nullKey: null,
          arrayKey: [
            1,
            2,
          ],
        },
        expected: {
          "number-key": 42,
          "boolean-key": true,
          "null-key": null,
          "array-key": [
            1,
            2,
          ],
        },
        description: "keys are converted with various value types",
      },
    ])("should convert keys correctly when $description.", ({
      input,
      expected,
    }) => {
      expect(toKebabCaseKeys(input)).toStrictEqual(expected);
    });
  });
});