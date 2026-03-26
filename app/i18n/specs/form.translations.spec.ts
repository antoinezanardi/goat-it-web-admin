import { crush } from "radashi";
import { describe, it, expect } from "vitest";

import frForm from "~/i18n/locales/fr/form.json";
import enForm from "~/i18n/locales/en/form.json";

describe("form.json translations", () => {
  it("should have the same keys in english as in french when context is form.", () => {
    const crushedFrFormKeys = Object.keys(crush(frForm)).toSorted();
    const crushedEnFormKeys = Object.keys(crush(enForm)).toSorted();

    expect(crushedEnFormKeys).toStrictEqual<string[]>(crushedFrFormKeys);
  });
});