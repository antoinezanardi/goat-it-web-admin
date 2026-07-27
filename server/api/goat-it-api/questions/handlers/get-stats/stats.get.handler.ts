import { QUESTION_STATS_DTO } from "@goat-it/schemas/question";
import type { QuestionStatsDto } from "@goat-it/schemas/question";
import type { H3Event } from "h3";

import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";

async function getQuestionStatsHandler(event: H3Event): Promise<QuestionStatsDto> {
  const config = useRuntimeConfig(event);
  const endpoint = `${createGoatItApiEndpoint("questions")}/stats`;
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);

  try {
    const rawData = await $fetch(endpoint, fetchOptions);

    return QUESTION_STATS_DTO.parse(rawData);
  } catch(error: unknown) {
    handleGoatItApiError(error);
  }
}

export {
  getQuestionStatsHandler,
};