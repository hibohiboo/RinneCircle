import { GetPostReturn } from "../";

const preImage =
  location.hostname === "hibohiboo.github.io"
    ? "/RinneCircle/storybook-static"
    : "";

export const getPostData: GetPostReturn = {
  id: 1,
  title: "Frontend Testing Example",
  description: "post example text.",
  body: "post example text.",
  imageUrl: `${preImage}/__mocks__/images/img01.jpg`,
  published: true,
  authorId: 1,
  likeCount: 1,
  liked: true,
};
