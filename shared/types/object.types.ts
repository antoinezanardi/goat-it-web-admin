/**
 * Recursively transforms an object type into an empty "shell" version of itself,
 * where all leaf (primitive) values can be `undefined`.
 *
 * This is particularly useful for:
 * - **Vue reactivity**: ensuring all keys are present upfront so Vue can track them.
 * - **Form state initialization**: creating a blank form object that mirrors the shape of the final data.
 *
 * Behavior per field type:
 * - **Primitive** (`string`, `number`, `boolean`, etc.) → `T | undefined`
 * - **Array** → `T | undefined` (kept as-is, not recursed into)
 * - **Object** → `Shell<T>` applied recursively on each property
 *
 * @example
 * interface Product {
 *   name: string;
 *   price: number;
 *   description: { en: string; fr: string };
 *   tags: { label: string; color: string }[];
 * }
 *
 * type ProductShell = Shell<Product>;
 * // Resolves to:
 * // {
 * //   name: string | undefined;
 * //   price: number | undefined;
 * //   description: {
 * //     en: string | undefined;
 * //     fr: string | undefined;
 * //   };
 * //   tags: { label: string; color: string }[] | undefined;
 * // }
 */
type Shell<T> = {
  [K in keyof T]: T[K] extends unknown[] ?
    T[K] | undefined : T[K] extends object ?
      Shell<T[K]> :
      T[K] | undefined;
};

export type {
  Shell,
};