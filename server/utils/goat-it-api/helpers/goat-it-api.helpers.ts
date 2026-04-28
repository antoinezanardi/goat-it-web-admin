import { FetchError } from "ofetch";
import { API_RESPONSE_EXCEPTION_DTO } from "@goat-it/schemas/shared/error";

import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { GOAT_IT_API_ADMIN_SCOPE_NAME } from "#server/utils/goat-it-api/goat-it-api.constants";
import type { GoatItApiResourceName } from "#server/utils/goat-it-api/goat-it-api.types";
import { HttpStatusCode } from "#server/utils/http/http.enums";
import { isNonEmptyString } from "#shared/utils/helpers/string/string.helpers";

function createGoatItApiEndpoint(resourceName: GoatItApiResourceName, id?: string): string {
  const base = `/${GOAT_IT_API_ADMIN_SCOPE_NAME}/${resourceName}`;

  return isNonEmptyString(id) ? `${base}/${id}` : base;
}

function createGoatItApiFetchOptions(goatItApiRuntimeConfig: SharedRuntimeConfig["goatItApi"]): Parameters<typeof $fetch>[1] {
  return {
    baseURL: goatItApiRuntimeConfig.baseUrl,
    headers: {
      "goat-it-api-key": goatItApiRuntimeConfig.adminKey,
    },
  };
}

function handleGoatItApiError(error: unknown): never {
  if (!(error instanceof FetchError)) {
    throw error;
  }

  const parsedError = API_RESPONSE_EXCEPTION_DTO.safeParse(error.data);

  if (!parsedError.success) {
    throw createError({
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    });
  }

  throw createError({
    statusCode: parsedError.data.statusCode,
    message: parsedError.data.message,
    data: { errorCode: parsedError.data.errorCode },
  });
}

export {
  createGoatItApiEndpoint,
  createGoatItApiFetchOptions,
  handleGoatItApiError,
};