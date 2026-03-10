import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import type { GoatItApiResourceName } from "#server/api/goat-it-api/goat-it-api.types";

function createGoatItApiEndpoint(resourceName: GoatItApiResourceName): string {
  return `/admin/${resourceName}`;
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