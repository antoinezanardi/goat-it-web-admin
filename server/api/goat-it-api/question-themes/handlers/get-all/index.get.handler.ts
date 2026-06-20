import { ADMIN_FIND_QUESTION_THEMES_QUERY_DTO, ADMIN_QUESTION_THEME_DTO } from "@goat-it/schemas/question-theme";
import type { H3Event } from "h3";
import { z } from "zod";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";

async function getQuestionThemesHandler(event: H3Event): Promise<QuestionTheme[]> {
  const config = useRuntimeConfig(event);
  const endpoint = createGoatItApiEndpoint("question-themes");
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);
  console.log(event);
  const rawQuery = getQuery(event);
  const query = ADMIN_FIND_QUESTION_THEMES_QUERY_DTO.parse(rawQuery);

  try {
    const rawData = await $fetch(endpoint, { ...fetchOptions, query });
    const adminQuestionThemes = z.array(ADMIN_QUESTION_THEME_DTO).parse(rawData);

    return adminQuestionThemes.map(createQuestionThemeFromAdminQuestionThemeDto);
  } catch(error: unknown) {
    handleGoatItApiError(error);
  }
}

export {
  getQuestionThemesHandler,
};