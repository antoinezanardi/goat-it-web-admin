import { ADMIN_QUESTION_THEME_DTO } from "@goat-it/schemas/question-theme";
import type { H3Event } from "h3";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { getRequiredRouterParam } from "#server/utils/router/router.helpers";

async function archiveQuestionThemeHandler(event: H3Event): Promise<QuestionTheme> {
  const config = useRuntimeConfig(event);
  const id = getRequiredRouterParam(event, "id", "Question theme id is required");
  const endpoint = `${createGoatItApiEndpoint("question-themes", id)}/archive`;
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);

  try {
    const rawData = await $fetch(endpoint, {
      ...fetchOptions,
      method: "POST",
    });
    const adminQuestionTheme = ADMIN_QUESTION_THEME_DTO.parse(rawData);

    return createQuestionThemeFromAdminQuestionThemeDto(adminQuestionTheme);
  } catch(error: unknown) {
    handleGoatItApiError(error);
  }
}

export {
  archiveQuestionThemeHandler,
};