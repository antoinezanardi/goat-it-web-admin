import { ADMIN_QUESTION_DTO, QUESTION_CREATION_DTO } from "@goat-it/schemas/question";
import type { H3Event } from "h3";

import type { Question } from "#shared/types/question.types";
import { createQuestionFromAdminQuestionDto } from "#server/utils/goat-it-api/mappers/question/question.mappers";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";

async function createQuestionHandler(event: H3Event): Promise<Question> {
  const config = useRuntimeConfig(event);
  const body: unknown = await readBody(event);
  const creationDto = QUESTION_CREATION_DTO.parse(body);
  const endpoint = createGoatItApiEndpoint("questions");
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);

  try {
    const rawData = await $fetch(endpoint, {
      ...fetchOptions,
      method: "POST",
      body: creationDto,
    });
    const adminQuestion = ADMIN_QUESTION_DTO.parse(rawData);

    return createQuestionFromAdminQuestionDto(adminQuestion);
  } catch(error: unknown) {
    handleGoatItApiError(error);
  }
}

export {
  createQuestionHandler,
};