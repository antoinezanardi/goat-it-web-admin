const QUESTION_DEFAULT_AUTHOR = {
  role: "admin",
  name: "Admin",
} as const satisfies Question["author"];

export { QUESTION_DEFAULT_AUTHOR };