import type { IFuseOptions } from "fuse.js";

const DEFAULT_FUSE_OPTIONS: Partial<IFuseOptions<unknown>> = {
  threshold: 0.4,
  ignoreLocation: true,
  ignoreDiacritics: true,
} as const;

export { DEFAULT_FUSE_OPTIONS };