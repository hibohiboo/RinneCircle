import { GetMyProfileReturn } from "../";
const preImage =
  location.hostname === "hibohiboo.github.io"
    ? "/RinneCircle/storybook-static"
    : "";
export const getMyProfileData: GetMyProfileReturn = {
  id: 1,
  name: "TaroYamada",
  bio: "フロントエンドエンジニア。TypeScript と UIコンポーネントのテストに興味があります。",
  twitterAccount: "taro-yamada",
  githubAccount: "taro-yamada",
  imageUrl: `${preImage}/__mocks__/images/img01.jpg`,
  email: "taroyamada@example.com",
  likeCount: 1,
};
