import type { AsyncDataRequestStatus } from "#app";

type UseAsyncAction<TResult, TArguments extends unknown[]> = {
  execute: (...arguments_: TArguments) => Promise<TResult | undefined>;
  fetchStatus: Ref<AsyncDataRequestStatus>;
  isIdle: ComputedRef<boolean>;
  isPending: ComputedRef<boolean>;
  isSuccess: ComputedRef<boolean>;
  isError: ComputedRef<boolean>;
};

/**
 * This composable is useful to execute an asynchronous action and track its status.
 * For example, when fetching a resource or creating it.
 * @param action The async function to be executed, the associated status is returned.
 * @param onError What to do when the action throws an error, the error is passed as parameter.
 * @returns An object containing the execute function, the status of the action and some helper computed properties.
 */
function useAsyncAction<TResult, TArguments extends unknown[] = []>(
  action: (...arguments_: TArguments) => Promise<TResult>,
  onError: (error: unknown) => void,
): UseAsyncAction<TResult, TArguments> {
  const {
    fetchStatus,
    isIdle,
    isPending,
    isSuccess,
    isError,
    setFetchStatusToPending,
    setFetchStatusToSuccess,
    setFetchStatusToError,
  } = useFetchStatus();

  async function execute(...arguments_: TArguments): Promise<TResult | undefined> {
    setFetchStatusToPending();
    try {
      const result = await action(...arguments_);
      setFetchStatusToSuccess();

      return result;
    } catch(error: unknown) {
      setFetchStatusToError();
      onError(error);
    }
    return undefined;
  }
  return {
    execute,
    fetchStatus,
    isIdle,
    isPending,
    isSuccess,
    isError,
  };
}

export { useAsyncAction };