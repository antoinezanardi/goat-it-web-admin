import { dash } from "radashi";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
}

function isEmptyRecord(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }
  return Object.values(value).every(entry => entry === undefined);
}

function stripEmptyValues<T>(input: T): T {
  if (!isRecord(input)) {
    return input;
  }
  const result = Object.fromEntries(Object.entries(input).map(([key, value]) => {
    if (!isRecord(value)) {
      return [key, value];
    }
    const cleaned = stripEmptyValues(value);

    if (Object.values(cleaned).every(entry => entry === undefined)) {
      return [key, undefined];
    }
    return [key, cleaned];
  }));

  // Acceptable as the result is structurally identical to the input type
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return result as T;
}

function toKebabCaseKeys(object: Record<string, unknown>): Record<string, unknown> {
  const entries = Object.entries(object).map(([key, value]: [string, unknown]): [string, unknown] => [dash(key), value]);

  return Object.fromEntries(entries);
}

export {
  isRecord,
  isEmptyRecord,
  stripEmptyValues,
  toKebabCaseKeys,
};