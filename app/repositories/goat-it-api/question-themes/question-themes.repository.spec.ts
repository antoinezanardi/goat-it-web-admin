import { vi, describe, it, expect, beforeEach } from "vitest";
import type { $Fetch } from "nitropack";

import { createFakeQuestionTheme } from "~~/tests/unit/utils/faketories/question-themes/entity/question-theme.entity.faketory";
import { createFakeQuestionThemeCreationDto, createFakeQuestionThemeModificationDto } from "~~/tests/unit/utils/faketories/question-themes/dto/question-theme.dto.faketory";

import { questionThemesRepository } from "@/repositories/goat-it-api/question-themes/question-themes.repository";

describe(questionThemesRepository, () => {
  let fetchMock: ReturnType<typeof vi.fn<$Fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn<$Fetch>();
  });

  it("should return the repository object when called.", () => {
    const repository = questionThemesRepository(fetchMock as $Fetch);

    expect(repository).toStrictEqual({
      getAll: expect.any(Function) as () => Promise<QuestionTheme[]>,
      getById: expect.any(Function) as (id: string) => Promise<QuestionTheme>,
      create: expect.any(Function) as (creationDto: unknown) => Promise<QuestionTheme>,
      patch: expect.any(Function) as (id: string, modificationDto: unknown) => Promise<QuestionTheme>,
      archive: expect.any(Function) as (id: string) => Promise<QuestionTheme>,
    });
  });

  describe("getAll", () => {
    it("should call fetch with the correct endpoint when called.", async() => {
      const repository = questionThemesRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue([]);
      await repository.getAll();

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/question-themes");
    });

    it("should return question themes when fetch resolves.", async() => {
      const fakeQuestionThemes: QuestionTheme[] = [
        createFakeQuestionTheme(),
        createFakeQuestionTheme(),
      ];
      const repository = questionThemesRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(fakeQuestionThemes);
      const result = await repository.getAll();

      expect(result).toStrictEqual<QuestionTheme[]>(fakeQuestionThemes);
    });
  });

  describe("getById", () => {
    it("should call fetch with the correct endpoint when called.", async() => {
      const fakeId = "fake-id-123";
      const repository = questionThemesRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(createFakeQuestionTheme());
      await repository.getById(fakeId);

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith(`/api/goat-it-api/question-themes/${fakeId}`);
    });

    it("should return the question theme when fetch resolves.", async() => {
      const fakeQuestionTheme = createFakeQuestionTheme();
      const repository = questionThemesRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(fakeQuestionTheme);
      const result = await repository.getById("fake-id-123");

      expect(result).toStrictEqual<QuestionTheme>(fakeQuestionTheme);
    });
  });

  describe("create", () => {
    it("should call fetch with the correct endpoint and body when called.", async() => {
      const fakeCreationDto = createFakeQuestionThemeCreationDto();
      const repository = questionThemesRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(createFakeQuestionTheme());
      await repository.create(fakeCreationDto);

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/goat-it-api/question-themes", { method: "POST", body: fakeCreationDto });
    });

    it("should return the created question theme when fetch resolves.", async() => {
      const fakeQuestionTheme = createFakeQuestionTheme();
      const repository = questionThemesRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(fakeQuestionTheme);
      const result = await repository.create(createFakeQuestionThemeCreationDto());

      expect(result).toStrictEqual<QuestionTheme>(fakeQuestionTheme);
    });
  });

  describe("patch", () => {
    it("should call fetch with the correct endpoint and body when called.", async() => {
      const fakeId = "fake-id-456";
      const fakeModificationDto = createFakeQuestionThemeModificationDto();
      const repository = questionThemesRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(createFakeQuestionTheme());
      await repository.patch(fakeId, fakeModificationDto);

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith(`/api/goat-it-api/question-themes/${fakeId}`, { method: "PATCH", body: fakeModificationDto });
    });

    it("should return the patched question theme when fetch resolves.", async() => {
      const fakeQuestionTheme = createFakeQuestionTheme();
      const repository = questionThemesRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(fakeQuestionTheme);
      const result = await repository.patch("fake-id-456", createFakeQuestionThemeModificationDto());

      expect(result).toStrictEqual<QuestionTheme>(fakeQuestionTheme);
    });
  });

  describe("archive", () => {
    it("should call fetch with the correct endpoint when called.", async() => {
      const fakeId = "fake-id-789";
      const repository = questionThemesRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(createFakeQuestionTheme());
      await repository.archive(fakeId);

      expect(fetchMock).toHaveBeenCalledExactlyOnceWith(`/api/goat-it-api/question-themes/${fakeId}/archive`, { method: "POST" });
    });

    it("should return the archived question theme when fetch resolves.", async() => {
      const fakeQuestionTheme = createFakeQuestionTheme();
      const repository = questionThemesRepository(fetchMock as $Fetch);
      fetchMock.mockResolvedValue(fakeQuestionTheme);
      const result = await repository.archive("fake-id-789");

      expect(result).toStrictEqual<QuestionTheme>(fakeQuestionTheme);
    });
  });
});