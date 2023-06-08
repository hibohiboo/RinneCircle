export type HasuraResponse<T> =
  | { data?: T } & {
      errors?: {
        message: string;
        extensions: { code: string; path: string };
      }[];
    };
