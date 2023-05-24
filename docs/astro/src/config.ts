export const SITE = {
  title: "Doc",
  description: "Your website description.",
  defaultLanguage: "ja_JP",
};

export const OPEN_GRAPH = {
  image: {
    src: "https://d3snr6xc5uvnuy.cloudfront.net/friends-shakehand/assets/icons/fa-handshake-regular.svg",
    alt: "font awesome",
  },
  twitter: "hibohiboo",
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
  title: string;
  description: string;
  layout: string;
  image?: { src: string; alt: string };
  dir?: "ltr" | "rtl";
  ogLocale?: string;
  lang?: string;
};

export const KNOWN_LANGUAGES = {
  日本語: "ja",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/hibohiboo/RinneCircle/tree/main/docs`;
export const BASE_PATH = "RinneCircle";

export type Sidebar = Record<
  (typeof KNOWN_LANGUAGE_CODES)[number],
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  ja: {
    目次: [
      { text: "イントロダクション", link: `${BASE_PATH}/ja/introduction` },
      { text: "更新履歴", link: `${BASE_PATH}/ja/histroy` },
    ],
    開発用: [
      { text: "StoryBook", link: `${BASE_PATH}/storybook-static/index.html` },
      {
        text: "Jestレポート - UIコンポーネント",
        link: `${BASE_PATH}/jest-reports/jest.html`,
      },
    ],
  },
};
