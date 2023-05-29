export type GetPostReturn = any;

export async function getPost({ postId }: { postId: number }) {
  return { postId };
}
