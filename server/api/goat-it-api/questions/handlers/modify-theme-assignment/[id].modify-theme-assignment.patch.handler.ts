import { ADMIN_QUESTION_DTO, QUESTION_THEME_ASSIGNMENT_MODIFICATION_DTO } from "@goat-it/schemas/question";
import type { H3Event } from "h3";

import type { Question } from "#shared/types/question.types";
import { createQuestionFromAdminQuestionDto } from "#server/utils/goat-it-api/mappers/question/question.mappers";
import { createGoatItApiEndpoint, createGoatItApiFetchOptions, handleGoatItApiError } from "#server/utils/goat-it-api/helpers/goat-it-api.helpers";
import { getRequiredRouterParam } from "#server/utils/router/router.helpers";

async function modifyThemeAssignmentHandler(event: H3Event): Promise<Question> {
  const config = useRuntimeConfig(event);
  const id = getRequiredRouterParam(event, "id", "Question id is required");
  const themeId = getRequiredRouterParam(event, "theme-id", "Theme id is required");
  const modificationDto = QUESTION_THEME_ASSIGNMENT_MODIFICATION_DTO.parse(await readBody(event));
  const endpoint = `${createGoatItApiEndpoint("questions", id)}/themes/${themeId}`;
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);

  try {
    const rawData = await $fetch(endpoint, {
      ...fetchOptions,
      method: "PATCH",
      body: modificationDto,
    });
    const adminQuestion = ADMIN_QUESTION_DTO.parse(rawData);

    return createQuestionFromAdminQuestionDto(adminQuestion);
  } catch(error: unknown) {
    handleGoatItApiError(error);
  }
}

export {
  modifyThemeAssignmentHandler,
};