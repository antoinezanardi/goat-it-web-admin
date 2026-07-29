import { QUESTION_THEME_STATS_DTO } from "@goat-it/schemas/question-theme";
import type { QuestionThemeStatsDto } from "@goat-it/schemas/question-theme";
import type { H3Event } from "h3";

import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";

async function getQuestionThemeStatsHandler(event: H3Event): Promise<QuestionThemeStatsDto> {
  const config = useRuntimeConfig(event);
  const endpoint = `${createGoatItApiEndpoint("question-themes")}/stats`;
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);

  try {
    const rawData = await $fetch(endpoint, fetchOptions);

    return QUESTION_THEME_STATS_DTO.parse(rawData);
  } catch(error: unknown) {
    handleGoatItApiError(error);
  }
}

export {
  getQuestionThemeStatsHandler,
};