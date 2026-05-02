import type { $Fetch } from "nitropack";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { createFakeQuestionCreationDto } from "~~/tests/unit/utils/faketories/questions/dto/question.dto.faketory";
import { createFakeQuestionThemeAssignmentCreationDto } from "~~/tests/unit/utils/faketories/questions/dto/question-theme-assignment-creation/question-theme-assignment-creation.dto.faketory";
import { createFakeQuestionThemeAssignmentModificationDto } from "~~/tests/unit/utils/faketories/questions/dto/question-theme-assignment-modification/question-theme-assignment-modification.dto.faketory";

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
      const dto = createFakeQuestionCreationDto();
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
      const dto = createFakeQuestionThemeAssignmentCreationDto();
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
      const dto = createFakeQuestionThemeAssignmentModificationDto();
      await repository.modifyThemeAssignment("123", "456", dto);

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions/123/themes/456", { method: "PATCH", body: dto });
    });
  });
});