import { describe, it, expect } from "vitest";

import type { SharedRuntimeConfig } from "#build/types/runtime-config";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";

describe("Goat It API Helpers", () => {
  describe(createGoatItApiEndpoint, () => {
    it("should create the correct endpoint for a given resource name when called.", () => {
      const resourceName = "question-themes";
      const expectedEndpoint = "/admin/question-themes";
      const endpoint = createGoatItApiEndpoint(resourceName);

      expect(endpoint).toBe(expectedEndpoint);
    });
  });

  describe(createGoatItApiFetchOptions, () => {
    it("should create the correct fetch options for a given Goat It API runtime config when called.", () => {
      const goatItApiRuntimeConfig: SharedRuntimeConfig["goatItApi"] = {
        baseUrl: "https://api.example.com",
        adminKey: "secret-admin-key",
      };
      const expectedFetchOptions: Parameters<typeof $fetch>[1] = {
        baseURL: goatItApiRuntimeConfig.baseUrl,
        headers: {
          "goat-it-api-key": goatItApiRuntimeConfig.adminKey,
        },
      };
      const fetchOptions = createGoatItApiFetchOptions(goatItApiRuntimeConfig);

      expect(fetchOptions).toStrictEqual<Parameters<typeof $fetch>[1]>(expectedFetchOptions);
    });
  });
});