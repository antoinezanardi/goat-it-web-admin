import { describe, expect, it } from "vitest";

import { replaceInArrayById } from "#shared/utils/helpers/array/array.helpers";

describe(replaceInArrayById, () => {
  it("should return a new array with the matching element replaced when an element with the given id exists.", () => {
    const array = [{ id: "1", name: "a" }, { id: "2", name: "b" }, { id: "3", name: "c" }];

    const result = replaceInArrayById(array, "2", { id: "2", name: "replaced" });

    expect(result).toStrictEqual([{ id: "1", name: "a" }, { id: "2", name: "replaced" }, { id: "3", name: "c" }]);
  });

  it("should not mutate the original array when an element is replaced.", () => {
    const array = [{ id: "1", name: "a" }, { id: "2", name: "b" }];

    replaceInArrayById(array, "2", { id: "2", name: "replaced" });

    expect(array).toStrictEqual([{ id: "1", name: "a" }, { id: "2", name: "b" }]);
  });

  it("should return a copy of the original array when no element matches the given id.", () => {
    const array = [{ id: "1", name: "a" }, { id: "2", name: "b" }];

    const result = replaceInArrayById(array, "999", { id: "999", name: "replaced" });

    expect(result).toStrictEqual([{ id: "1", name: "a" }, { id: "2", name: "b" }]);
  });

  it("should only replace the first matching element when multiple elements share the same id.", () => {
    const array = [{ id: "1", name: "a" }, { id: "1", name: "b" }, { id: "2", name: "c" }];

    const result = replaceInArrayById(array, "1", { id: "1", name: "replaced" });

    expect(result).toStrictEqual([{ id: "1", name: "replaced" }, { id: "1", name: "b" }, { id: "2", name: "c" }]);
  });

  it("should return an empty array when the source array is empty.", () => {
    const result = replaceInArrayById([], "1", { id: "1", name: "a" });

    expect(result).toStrictEqual([]);
  });
});