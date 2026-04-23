import { VALID_LOCATOR_ROLES } from "#acceptance/features/step-definitions/element/helpers/element.steps.helpers.ts";

const ROLE_ALTERNATION_PATTERN = [...VALID_LOCATOR_ROLES].join("|");

export { ROLE_ALTERNATION_PATTERN };