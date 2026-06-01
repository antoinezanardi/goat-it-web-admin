import { faker } from "@faker-js/faker";

import type { TableFilterSelectItem } from "~/components/shared/table/TableFilterSelect/table-filter-select.types";

function createFakeTableFilterSelectItem<T extends string = string>(tableFilterSelectItem: Partial<TableFilterSelectItem<T>> = {}): TableFilterSelectItem<T> {
  return {
    label: faker.word.sample(),
    // Acceptable as faker.word.sample() always returns a string which satisfies T extends string at runtime
    // oxlint-disable-next-line no-unsafe-type-assertion
    value: faker.word.sample() as T,
    ...tableFilterSelectItem,
  };
}

export { createFakeTableFilterSelectItem };