import type { DataTable } from "@cucumber/cucumber";
import type { ZodType } from "zod";
import { z } from "zod";

function zCoerceOptionalString(): ZodType<string | undefined> {
  return z.preprocess((value: unknown): string | undefined => (typeof value !== "string" || value === "" ? undefined : value), z.string().optional());
}

function validateDataTableAndGetRows<T>(dataTable: DataTable, schema: ZodType<T>): T[] {
  const rows = dataTable.hashes();

  if (rows.length === 0) {
    throw new Error("DataTable must contain at least one data row.");
  }

  const parsedRows = schema.array().safeParse(rows);

  if (!parsedRows.success) {
    throw new Error(`Invalid DataTable:\n${parsedRows.error.message}`);
  }
  return parsedRows.data;
}

function validateDataTableAndGetFirstRow<T>(dataTable: DataTable, schema: ZodType<T>): T {
  const [firstRow] = validateDataTableAndGetRows(dataTable, schema);

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- validateDataTableAndGetRows guarantees at least one element
  return firstRow as T;
}

export { validateDataTableAndGetFirstRow, validateDataTableAndGetRows, zCoerceOptionalString };