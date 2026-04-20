/**
 * Returns a new array where the element with the matching `id` is replaced by `replacement`.
 * If no element matches, the original array is returned unchanged.
 *
 * @param {ReadonlyArray<T>} array - The source array.
 * @param {string} id - The id to match against.
 * @param {T} replacement - The value to substitute in.
 * @return {T[]} A new array with the replacement applied, or the original array if no match was found.
 */
function replaceInArrayById<T extends { id: string }>(array: readonly T[], id: string, replacement: T): T[] {
  const index = array.findIndex(item => item.id === id);
  if (index === -1) {
    return [...array];
  }
  return array.toSpliced(index, 1, replacement);
}

export {
  replaceInArrayById,
};