import { ADMIN_QUESTION_THEME_DTO, QUESTION_THEME_MODIFICATION_DTO } from "@goat-it/schemas/question-theme";
import type { H3Event } from "h3";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { getRequiredRouterParam } from "#server/utils/router/router.helpers";

async function patchQuestionThemeHandler(event: H3Event): Promise<QuestionTheme> {
  const config = useRuntimeConfig(event);
  const id = getRequiredRouterParam(event, "id", "Question theme id is required");
  const body: unknown = await readBody(event);
  const modificationDto = QUESTION_THEME_MODIFICATION_DTO.parse(body);
  const endpoint = createGoatItApiEndpoint("question-themes", id);
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);

  try {
    const rawData = await $fetch(endpoint, {
      ...fetchOptions,
      method: "PATCH",
      body: modificationDto,
    });
    const adminQuestionTheme = ADMIN_QUESTION_THEME_DTO.parse(rawData);

    return createQuestionThemeFromAdminQuestionThemeDto(adminQuestionTheme);
  } catch(error: unknown) {
    handleGoatItApiError(error);
  }
}

export {
  patchQuestionThemeHandler,
};