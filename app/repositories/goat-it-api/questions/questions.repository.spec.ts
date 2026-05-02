import type { $Fetch } from "nitropack";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { QuestionCreationDto, QuestionThemeAssignmentCreationDto } from "@goat-it/schemas/question";

import type { QuestionThemeAssignmentModificationDto } from "#shared/types/question.types";
import { questionsRepository } from "~/repositories/goat-it-api/questions/questions.repository";

describe("Questions Repository", () => {
  let fetchMock: ReturnType<typeof vi.fn<$Fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn<$Fetch>();
  });

  describe("getAll", () => {
    it("should call fetch with correct endpoint when called.", async() => {
      const repository = questionsRepository(fetchMock);
      await repository.getAll();

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions");
    });
  });

  describe("getById", () => {
    it("should call fetch with correct endpoint when called.", async() => {
      const repository = questionsRepository(fetchMock);
      await repository.getById("123");

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions/123");
    });
  });

  describe("create", () => {
    it("should call fetch with correct endpoint and body when called.", async() => {
      const repository = questionsRepository(fetchMock);
      const dto = {} as QuestionCreationDto;
      await repository.create(dto);

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions", { method: "POST", body: dto });
    });
  });

  describe("archive", () => {
    it("should call fetch with correct endpoint when called.", async() => {
      const repository = questionsRepository(fetchMock);
      await repository.archive("123");

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions/123/archive", { method: "POST" });
    });
  });

  describe("assignTheme", () => {
    it("should call fetch with correct endpoint and body when called.", async() => {
      const repository = questionsRepository(fetchMock);
      const dto = {} as QuestionThemeAssignmentCreationDto;
      await repository.assignTheme("123", dto);

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions/123/themes", { method: "POST", body: dto });
    });
  });

  describe("removeTheme", () => {
    it("should call fetch with correct endpoint when called.", async() => {
      const repository = questionsRepository(fetchMock);
      await repository.removeTheme("123", "456");

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions/123/themes/456", { method: "DELETE" });
    });
  });

  describe("modifyThemeAssignment", () => {
    it("should call fetch with correct endpoint and body when called.", async() => {
      const repository = questionsRepository(fetchMock);
      const dto: QuestionThemeAssignmentModificationDto = { isPrimary: true };
      await repository.modifyThemeAssignment("123", "456", dto);

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions/123/themes/456", { method: "PATCH", body: dto });
    });
  });
});