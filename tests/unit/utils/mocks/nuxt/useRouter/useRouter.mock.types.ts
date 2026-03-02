type RouteMock = {
  path: string;
  name?: string | symbol | number;
  meta?: {
    titleKey?: string;
    icon?: string;
  };
};

export type { RouteMock };