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
    if (value === undefined) {
      return [key, undefined];
    }
    if (isRecord(value)) {
      const cleaned = stripEmptyValues(value);

      return [key, isEmptyRecord(cleaned) ? undefined : cleaned];
    }
    return [key, value];
  }));

  // Acceptable as the result is structurally identical to the input type
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return result as T;
}

export {
  isRecord,
  isEmptyRecord,
  stripEmptyValues,
};