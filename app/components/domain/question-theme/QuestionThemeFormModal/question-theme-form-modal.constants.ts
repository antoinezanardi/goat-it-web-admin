import type { ModalProps } from "#ui/components/Modal.vue";

const QUESTION_THEME_FORM_MODAL_UI = {
  content: "w-[calc(100vw-2rem)] max-w-2xl",
} as const satisfies ModalProps["ui"];

export {
  QUESTION_THEME_FORM_MODAL_UI,
};