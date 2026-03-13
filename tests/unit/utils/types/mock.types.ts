import type { Mock } from "vitest";

type StubToMock<Stub> = {
  [Key in keyof Stub]: Stub[Key] extends (...arguments_: unknown[]) => unknown ? Mock<Stub[Key]> : Stub[Key];
};

export type { StubToMock };