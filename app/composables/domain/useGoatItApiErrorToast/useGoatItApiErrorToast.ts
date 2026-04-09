import { FetchError } from "ofetch";

type UseGoatItApiErrorToast = {
  handleGoatItApiError: (error: unknown, title: string) => void;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractErrorCode(error: unknown): string | undefined {
  if (!(error instanceof FetchError)) {
    return undefined;
  }

  if (!isRecord(error.data)) {
    return undefined;
  }

  if (!isRecord(error.data.data)) {
    return undefined;
  }

  const { errorCode } = error.data.data;

  if (typeof errorCode !== "string") {
    return undefined;
  }
  return errorCode;
}

function useGoatItApiErrorToast(): UseGoatItApiErrorToast {
  const { addErrorToast } = useAppToast();
  const i18n = useI18n();

  function handleGoatItApiError(error: unknown, title: string): void {
    const errorCodeValue = extractErrorCode(error);

    if (errorCodeValue !== undefined && errorCodeValue !== "") {
      const i18nKey = `errors.goatItApi.${errorCodeValue}`;

      if (i18n.te(i18nKey)) {
        addErrorToast({ title, description: i18n.t(i18nKey) });

        return;
      }

      // eslint-disable-next-line no-console -- Intentional: log unknown API error codes for debugging
      console.error(`Unknown Goat It API error code: ${errorCodeValue}`);
    }

    addErrorToast({ title, description: i18n.t("errors.unknown") });
  }
  return { handleGoatItApiError };
}

export type { UseGoatItApiErrorToast };

export { useGoatItApiErrorToast };