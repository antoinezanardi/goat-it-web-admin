import type { AdminQuestionThemeDto } from "@goat-it/schemas/question-theme";

function createQuestionThemeFromAdminQuestionThemeDto(adminQuestionThemeDto: AdminQuestionThemeDto): QuestionTheme {
  return {
    id: adminQuestionThemeDto.id,
    slug: adminQuestionThemeDto.slug,
    label: adminQuestionThemeDto.label,
    aliases: adminQuestionThemeDto.aliases,
    description: adminQuestionThemeDto.description,
    status: adminQuestionThemeDto.status,
    createdAt: new Date(adminQuestionThemeDto.createdAt),
    updatedAt: new Date(adminQuestionThemeDto.updatedAt),
  };
}

export {
  createQuestionThemeFromAdminQuestionThemeDto,
};