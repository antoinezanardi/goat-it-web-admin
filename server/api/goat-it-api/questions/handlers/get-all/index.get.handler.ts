import { ADMIN_QUESTION_DTO } from "@goat-it/schemas/question";
import type { H3Event } from "h3";
import { z } from "zod";

import type { Question } from "#shared/types/question.types";
import { createQuestionFromAdminQuestionDto } from "#server/utils/goat-it-api/mappers/question/question.mappers";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";

async function getQuestionsHandler(event: H3Event): Promise<Question[]> {
  const config = useRuntimeConfig(event);
  const endpoint = createGoatItApiEndpoint("questions");
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);

  try {
    const rawData = await $fetch(endpoint, fetchOptions);
    const adminQuestions = z.array(ADMIN_QUESTION_DTO).parse(rawData);

    return adminQuestions.map(createQuestionFromAdminQuestionDto);
  } catch(error: unknown) {
    handleGoatItApiError(error);
  }
}

export {
  getQuestionsHandler,
};