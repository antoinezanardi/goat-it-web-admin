import { ADMIN_QUESTION_THEME_DTO, QUESTION_THEME_CREATION_DTO } from "@goat-it/schemas/question-theme";
import type { H3Event } from "h3";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";

async function createQuestionThemeHandler(event: H3Event): Promise<QuestionTheme> {
  const config = useRuntimeConfig(event);
  const body: unknown = await readBody(event);
  const creationDto = QUESTION_THEME_CREATION_DTO.parse(body);
  const endpoint = createGoatItApiEndpoint("question-themes");
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);

  try {
    const rawData = await $fetch(endpoint, {
      ...fetchOptions,
      method: "POST",
      body: creationDto,
    });
    const adminQuestionTheme = ADMIN_QUESTION_THEME_DTO.parse(rawData);

    return createQuestionThemeFromAdminQuestionThemeDto(adminQuestionTheme);
  } catch(error: unknown) {
    handleGoatItApiError(error);
  }
}

export {
  createQuestionThemeHandler,
};