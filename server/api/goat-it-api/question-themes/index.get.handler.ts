import { ADMIN_QUESTION_THEME_DTO } from "@goat-it/schemas/question-theme";
import type { H3Event } from "h3";
import { z } from "zod";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";

async function getQuestionThemesHandler(event: H3Event): Promise<QuestionTheme[]> {
  const config = useRuntimeConfig(event);
  const endpoint = createGoatItApiEndpoint("question-themes");
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);

  const rawData = await $fetch(endpoint, fetchOptions);
  const adminQuestionThemes = z.array(ADMIN_QUESTION_THEME_DTO).parse(rawData);

  return adminQuestionThemes.map(createQuestionThemeFromAdminQuestionThemeDto);
}

export {
  getQuestionThemesHandler,
};