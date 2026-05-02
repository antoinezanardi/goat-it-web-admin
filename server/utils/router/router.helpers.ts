import { createError, getRouterParam } from "h3";
import type { H3Event } from "h3";

import { isNonEmptyString } from "#shared/utils/helpers/string/string.helpers";
import { HttpStatusCode } from "#server/utils/http/http.enums";

function getRequiredRouterParameter(event: H3Event, parameterName: string, errorMessage: string): string {
  const value = getRouterParam(event, parameterName);

  if (!isNonEmptyString(value)) {
    throw createError({
      statusCode: HttpStatusCode.BAD_REQUEST,
      message: errorMessage,
    });
  }
  return value;
}

export {
  getRequiredRouterParameter as getRequiredRouterParam,
};