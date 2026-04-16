import { ADMIN_QUESTION_THEME_DTO } from "@goat-it/schemas/question-theme";
import type { H3Event } from "h3";

import { createQuestionThemeFromAdminQuestionThemeDto } from "#server/utils/goat-it-api/mappers/goat-it-api.mappers";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { HttpStatusCode } from "#server/utils/http/http.enums";
import { isNonEmptyString } from "#shared/utils/helpers/string/string.helpers";

async function archiveQuestionThemeHandler(event: H3Event): Promise<QuestionTheme> {
  const config = useRuntimeConfig(event);
  const id = getRouterParam(event, "id");

  if (!isNonEmptyString(id)) {
    throw createError({
      statusCode: HttpStatusCode.BAD_REQUEST,
      message: "Question theme id is required",
    });
  }

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