type RouteMock = {
  name: string | symbol | number;
  path: string;
  meta?: {
    titleKey?: string;
    icon?: string;
  };
};

export type { RouteMock };