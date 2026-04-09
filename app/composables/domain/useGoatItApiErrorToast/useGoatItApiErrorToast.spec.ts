import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FetchError } from "ofetch";

import type { UseAppToastMock } from "~~/tests/unit/utils/mocks/composables/ui/useAppToast/useAppToast.mock";
import { createUseAppToastMock } from "~~/tests/unit/utils/mocks/composables/ui/useAppToast/useAppToast.mock";
import type { UseI18nMock } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock";
import { createUseI18nMock } from "~~/tests/unit/utils/mocks/composables/nuxt/useI18n/useI18n.mock";

import type { useGoatItApiErrorToast as UseGoatItApiErrorToastType } from "~/composables/domain/useGoatItApiErrorToast/useGoatItApiErrorToast";

let useAppToastMock: UseAppToastMock;
let useI18nMock: UseI18nMock;

mockNuxtImport("useAppToast", () => (): UseAppToastMock => useAppToastMock);
mockNuxtImport("useI18n", () => (): UseI18nMock => useI18nMock);

let useGoatItApiErrorToast: typeof UseGoatItApiErrorToastType;

describe("useGoatItApiErrorToast", () => {
  beforeEach(async() => {
    useAppToastMock = createUseAppToastMock();
    useI18nMock = createUseI18nMock();
    ({ useGoatItApiErrorToast } = await import("~/composables/domain/useGoatItApiErrorToast/useGoatItApiErrorToast"));
  });

  describe("handleGoatItApiError", () => {
    it("should check if translation exists for the error code key when error is a FetchError with an errorCode.", () => {
      vi.mocked(useI18nMock.te).mockReturnValue(true);
      vi.mocked(useI18nMock.t).mockImplementation((key: string) => `translated:${key}`);
      const fetchError = new FetchError("Conflict");
      fetchError.data = {
        data: { errorCode: "questionThemeReferencedByLiveQuestions" },
      };
      const { handleGoatItApiError } = useGoatItApiErrorToast();

      handleGoatItApiError(fetchError, "Can't archive question theme");

      expect(useI18nMock.te).toHaveBeenCalledExactlyOnceWith("errors.goatItApi.questionThemeReferencedByLiveQuestions");
    });

    it("should call addErrorToast with title and translated error code description when error is a FetchError with a known errorCode.", () => {
      vi.mocked(useI18nMock.te).mockReturnValue(true);
      vi.mocked(useI18nMock.t).mockImplementation((key: string) => `translated:${key}`);
      const fetchError = new FetchError("Conflict");
      fetchError.data = {
        data: { errorCode: "questionThemeReferencedByLiveQuestions" },
      };
      const { handleGoatItApiError } = useGoatItApiErrorToast();

      handleGoatItApiError(fetchError, "Can't archive question theme");

      expect(useAppToastMock.addErrorToast).toHaveBeenCalledExactlyOnceWith({
        title: "Can't archive question theme",
        description: "translated:errors.goatItApi.questionThemeReferencedByLiveQuestions",
      });
    });

    it("should call addErrorToast with generic fallback description when error is a FetchError with an unknown errorCode.", () => {
      vi.mocked(useI18nMock.te).mockReturnValue(false);
      vi.mocked(useI18nMock.t).mockImplementation((key: string) => `translated:${key}`);
      const fetchError = new FetchError("Conflict");
      fetchError.data = {
        data: { errorCode: "unknownErrorCode" },
      };
      const { handleGoatItApiError } = useGoatItApiErrorToast();

      handleGoatItApiError(fetchError, "Can't fetch question themes");

      expect(useAppToastMock.addErrorToast).toHaveBeenCalledExactlyOnceWith({
        title: "Can't fetch question themes",
        description: "translated:errors.unknown",
      });
    });

    it("should log error when error is a FetchError with an unknown errorCode.", () => {
      vi.mocked(useI18nMock.te).mockReturnValue(false);
      vi.mocked(useI18nMock.t).mockImplementation((key: string) => `translated:${key}`);
      const consoleSpy = vi.spyOn(console, "error").mockReturnValue();
      const fetchError = new FetchError("Conflict");
      fetchError.data = {
        data: { errorCode: "unknownErrorCode" },
      };
      const { handleGoatItApiError } = useGoatItApiErrorToast();

      handleGoatItApiError(fetchError, "Can't fetch question themes");

      expect(consoleSpy).toHaveBeenCalledExactlyOnceWith("Unknown Goat It API error code: unknownErrorCode");

      consoleSpy.mockRestore();
    });

    it("should call addErrorToast with generic fallback description when error is a FetchError with no errorCode.", () => {
      vi.mocked(useI18nMock.t).mockImplementation((key: string) => `translated:${key}`);
      const fetchError = new FetchError("Bad Request");
      fetchError.data = {
        data: {},
      };
      const { handleGoatItApiError } = useGoatItApiErrorToast();

      handleGoatItApiError(fetchError, "Can't create question theme");

      expect(useAppToastMock.addErrorToast).toHaveBeenCalledExactlyOnceWith({
        title: "Can't create question theme",
        description: "translated:errors.unknown",
      });
    });

    it("should call addErrorToast with generic fallback description when error is a FetchError with non-object nested data.", () => {
      vi.mocked(useI18nMock.t).mockImplementation((key: string) => `translated:${key}`);
      const fetchError = new FetchError("Server Error");
      fetchError.data = { data: "not-an-object" };
      const { handleGoatItApiError } = useGoatItApiErrorToast();

      handleGoatItApiError(fetchError, "Can't fetch question themes");

      expect(useAppToastMock.addErrorToast).toHaveBeenCalledExactlyOnceWith({
        title: "Can't fetch question themes",
        description: "translated:errors.unknown",
      });
    });

    it("should call addErrorToast with generic fallback description when error is a FetchError with no data.", () => {
      vi.mocked(useI18nMock.t).mockImplementation((key: string) => `translated:${key}`);
      const fetchError = new FetchError("Server Error");
      const { handleGoatItApiError } = useGoatItApiErrorToast();

      handleGoatItApiError(fetchError, "Can't fetch question themes");

      expect(useAppToastMock.addErrorToast).toHaveBeenCalledExactlyOnceWith({
        title: "Can't fetch question themes",
        description: "translated:errors.unknown",
      });
    });

    it("should call addErrorToast with generic fallback description when error is not a FetchError.", () => {
      vi.mocked(useI18nMock.t).mockImplementation((key: string) => `translated:${key}`);
      const genericError = new Error("Something broke");
      const { handleGoatItApiError } = useGoatItApiErrorToast();

      handleGoatItApiError(genericError, "Can't fetch question themes");

      expect(useAppToastMock.addErrorToast).toHaveBeenCalledExactlyOnceWith({
        title: "Can't fetch question themes",
        description: "translated:errors.unknown",
      });
    });
  });
});