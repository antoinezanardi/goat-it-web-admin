/**
 * Returns a promise that resolves after the given number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to wait.
 * @return {Promise<void>} A promise that resolves after the delay.
 */
async function sleep(ms: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });
}

export {
  sleep,
};