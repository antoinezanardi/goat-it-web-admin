import { ADMIN_QUESTION_THEME_DTO } from "@goat-it/schemas/question-theme";
import type { AdminQuestionThemeDto } from "@goat-it/schemas/question-theme";
import type { H3Event } from "h3";
import { z } from "zod";

import { createGoatItApiEndpoint, createGoatItApiFetchOptions } from "#server/api/goat-it-api/helpers/goat-it-api.helpers";

async function getQuestionThemesHandler(event: H3Event): Promise<AdminQuestionThemeDto[]> {
  const config = useRuntimeConfig(event);
  const endpoint = createGoatItApiEndpoint("question-themes");
  const fetchOptions = createGoatItApiFetchOptions(config.goatItApi);

  const rawData = await $fetch(endpoint, fetchOptions);

  return z.array(ADMIN_QUESTION_THEME_DTO).parse(rawData);
}

export {
  getQuestionThemesHandler,
};