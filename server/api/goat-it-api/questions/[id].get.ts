import { getQuestionByIdHandler } from "#server/api/goat-it-api/questions/handlers/get-by-id/[id].get.handler";

export default defineEventHandler(getQuestionByIdHandler);