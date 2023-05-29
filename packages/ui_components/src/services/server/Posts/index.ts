export type GetPostsReturn = {
  pagination: {
    current: number;
    prev: number | null;
    next: number | null;
    items: (string | number)[];
  } | null;
  paginationInfo: {
    start: number;
    end: number;
    hitCount: number;
  };
  posts: Record<string, any>[];
};
export async function getPosts() {
  return {};
}
