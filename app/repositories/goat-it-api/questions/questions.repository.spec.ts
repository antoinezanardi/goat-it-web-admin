import type { $Fetch } from "nitropack";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { createFakeQuestion } from "~~/tests/unit/utils/faketories/questions/entity/question.entity.faketory";
import { createFakeQuestionCreationDto } from "~~/tests/unit/utils/faketories/questions/dto/question.dto.faketory";
import { createFakeQuestionThemeAssignmentCreationDto } from "~~/tests/unit/utils/faketories/questions/dto/question-theme-assignment-creation/question-theme-assignment-creation.dto.faketory";
import { createFakeQuestionThemeAssignmentModificationDto } from "~~/tests/unit/utils/faketories/questions/dto/question-theme-assignment-modification/question-theme-assignment-modification.dto.faketory";

import type { Question } from "#shared/types/question.types";
import { questionsRepository } from "~/repositories/goat-it-api/questions/questions.repository";

describe(questionsRepository, () => {
  let fetchMock: ReturnType<typeof vi.fn<$Fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn<$Fetch>();
  });

  it("should return the repository object when called.", () => {
    const repository = questionsRepository(fetchMock as $Fetch);

    expect(repository).toStrictEqual({
      getAll: expect.any(Function) as () => Promise<Question[]>,
      getById: expect.any(Function) as (id: string) => Promise<Question>,
      create: expect.any(Function) as (creationDto: unknown) => Promise<Question>,
      archive: expect.any(Function) as (id: string) => Promise<Question>,
      assignTheme: expect.any(Function) as (id: string, dto: unknown) => Promise<Question>,
      removeTheme: expect.any(Function) as (id: string, themeId: string) => Promise<Question>,
      modifyThemeAssignment: expect.any(Function) as (id: string, themeId: string, dto: unknown) => Promise<Question>,
    });
  });

  describe("getAll", () => {
    it("should call fetch with correct endpoint when called.", async() => {
      const repository = questionsRepository(fetchMock);
      fetchMock.mockResolvedValue([]);
      await repository.getAll();

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions");
    });

    it("should return questions from fetch when called.", async() => {
      const fakeQuestions: Question[] = [createFakeQuestion(), createFakeQuestion()];
      const repository = questionsRepository(fetchMock);
      fetchMock.mockResolvedValue(fakeQuestions);

      const result = await repository.getAll();

      expect(result).toStrictEqual(fakeQuestions);
    });
  });

  describe("getById", () => {
    it("should call fetch with correct endpoint when called.", async() => {
      const repository = questionsRepository(fetchMock);
      fetchMock.mockResolvedValue(createFakeQuestion());
      await repository.getById("123");

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions/123");
    });

    it("should return the question from fetch when called.", async() => {
      const fakeQuestion = createFakeQuestion();
      const repository = questionsRepository(fetchMock);
      fetchMock.mockResolvedValue(fakeQuestion);

      const result = await repository.getById("123");

      expect(result).toStrictEqual(fakeQuestion);
    });
  });

  describe("create", () => {
    it("should call fetch with correct endpoint and body when called.", async() => {
      const repository = questionsRepository(fetchMock);
      const dto = createFakeQuestionCreationDto();
      fetchMock.mockResolvedValue(createFakeQuestion());
      await repository.create(dto);

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions", { method: "POST", body: dto });
    });

    it("should return the created question from fetch when called.", async() => {
      const fakeQuestion = createFakeQuestion();
      const repository = questionsRepository(fetchMock);
      fetchMock.mockResolvedValue(fakeQuestion);

      const result = await repository.create(createFakeQuestionCreationDto());

      expect(result).toStrictEqual(fakeQuestion);
    });
  });

  describe("archive", () => {
    it("should call fetch with correct endpoint when called.", async() => {
      const repository = questionsRepository(fetchMock);
      fetchMock.mockResolvedValue(createFakeQuestion());
      await repository.archive("123");

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions/123/archive", { method: "POST" });
    });

    it("should return the archived question from fetch when called.", async() => {
      const fakeQuestion = createFakeQuestion();
      const repository = questionsRepository(fetchMock);
      fetchMock.mockResolvedValue(fakeQuestion);

      const result = await repository.archive("123");

      expect(result).toStrictEqual(fakeQuestion);
    });
  });

  describe("assignTheme", () => {
    it("should call fetch with correct endpoint and body when called.", async() => {
      const repository = questionsRepository(fetchMock);
      const dto = createFakeQuestionThemeAssignmentCreationDto();
      fetchMock.mockResolvedValue(createFakeQuestion());
      await repository.assignTheme("123", dto);

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions/123/themes", { method: "POST", body: dto });
    });

    it("should return the question from fetch when called.", async() => {
      const fakeQuestion = createFakeQuestion();
      const repository = questionsRepository(fetchMock);
      fetchMock.mockResolvedValue(fakeQuestion);

      const result = await repository.assignTheme("123", createFakeQuestionThemeAssignmentCreationDto());

      expect(result).toStrictEqual(fakeQuestion);
    });
  });

  describe("removeTheme", () => {
    it("should call fetch with correct endpoint when called.", async() => {
      const repository = questionsRepository(fetchMock);
      fetchMock.mockResolvedValue(createFakeQuestion());
      await repository.removeTheme("123", "456");

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions/123/themes/456", { method: "DELETE" });
    });

    it("should return the question from fetch when called.", async() => {
      const fakeQuestion = createFakeQuestion();
      const repository = questionsRepository(fetchMock);
      fetchMock.mockResolvedValue(fakeQuestion);

      const result = await repository.removeTheme("123", "456");

      expect(result).toStrictEqual(fakeQuestion);
    });
  });

  describe("modifyThemeAssignment", () => {
    it("should call fetch with correct endpoint and body when called.", async() => {
      const repository = questionsRepository(fetchMock);
      const dto = createFakeQuestionThemeAssignmentModificationDto();
      fetchMock.mockResolvedValue(createFakeQuestion());
      await repository.modifyThemeAssignment("123", "456", dto);

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/questions/123/themes/456", { method: "PATCH", body: dto });
    });

    it("should return the question from fetch when called.", async() => {
      const fakeQuestion = createFakeQuestion();
      const repository = questionsRepository(fetchMock);
      fetchMock.mockResolvedValue(fakeQuestion);

      const result = await repository.modifyThemeAssignment("123", "456", createFakeQuestionThemeAssignmentModificationDto());

      expect(result).toStrictEqual(fakeQuestion);
    });
  });
});