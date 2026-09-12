import { describe, it, expect } from "vitest";

import { isNonEmptyString } from "#shared/utils/helpers/string/string.helpers";

describe(isNonEmptyString, () => {
  it("should return true when input is a non-empty string.", () => {
    expect(isNonEmptyString("hello")).toBeTruthy();
  });

  it("should return false when input is an empty string.", () => {
    expect(isNonEmptyString("")).toBeFalsy();
  });

  it("should return false when input is undefined.", () => {
    expect(isNonEmptyString()).toBeFalsy();
  });
});