import { ADMIN_QUESTION_THEME_DTO } from "@goat-it/schemas/question-theme";
import type { H3Event } from "h3";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { HttpStatusCode } from "#server/utils/http/http.enums";

async function getQuestionThemeHandler(event: H3Event): Promise<QuestionTheme> {
  const config = useRuntimeConfig(event);
  const id = getRouterParam(event, "id");

  if (!isNonEmptyString(id)) {
    throw createError({ statusCode: HttpStatusCode.BAD_REQUEST, message: "Question theme id is required" });
  }

  const endpoint = createGoatItApiEndpoint("question-themes", id);
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);

  const rawData = await $fetch(endpoint, fetchOptions);
  const adminQuestionTheme = ADMIN_QUESTION_THEME_DTO.parse(rawData);

  return createQuestionThemeFromAdminQuestionThemeDto(adminQuestionTheme);
}

export {
  getQuestionThemeHandler,
};