import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { GOAT_IT_API_ADMIN_SCOPE_NAME } from "#server/utils/goat-it-api/goat-it-api.constants";
import type { GoatItApiResourceName } from "#server/utils/goat-it-api/goat-it-api.types";

function createGoatItApiEndpoint(resourceName: GoatItApiResourceName): string {
  return `/${GOAT_IT_API_ADMIN_SCOPE_NAME}/${resourceName}`;
}

function createGoatItApiFetchOptions(goatItApiRuntimeConfig: SharedRuntimeConfig["goatItApi"]): Parameters<typeof $fetch>[1] {
  return {
    baseURL: goatItApiRuntimeConfig.baseUrl,
    headers: {
      "goat-it-api-key": goatItApiRuntimeConfig.adminKey,
    },
  };
}

export {
  createGoatItApiEndpoint,
  createGoatItApiFetchOptions,
};