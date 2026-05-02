import { ADMIN_QUESTION_DTO } from "@goat-it/schemas/question";
import type { H3Event } from "h3";

import type { Question } from "#shared/types/question.types";
import { createQuestionFromAdminQuestionDto } from "#server/utils/goat-it-api/mappers/question/question.mappers";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { getRequiredRouterParam } from "#server/utils/router/router.helpers";

async function getQuestionByIdHandler(event: H3Event): Promise<Question> {
  const config = useRuntimeConfig(event);
  const id = getRequiredRouterParam(event, "id", "Question id is required");
  const endpoint = createGoatItApiEndpoint("questions", id);
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);

  try {
    const rawData = await $fetch(endpoint, fetchOptions);
    const adminQuestion = ADMIN_QUESTION_DTO.parse(rawData);

    return createQuestionFromAdminQuestionDto(adminQuestion);
  } catch(error: unknown) {
    handleGoatItApiError(error);
  }
}

export {
  getQuestionByIdHandler,
};