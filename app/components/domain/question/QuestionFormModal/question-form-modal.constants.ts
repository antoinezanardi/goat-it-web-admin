import type { ModalProps } from "#ui/components/Modal.vue";

const QUESTION_FORM_MODAL_UI = {
  content: "w-[calc(100vw-2rem)] max-w-3xl",
} as const satisfies ModalProps["ui"];

export { QUESTION_FORM_MODAL_UI };