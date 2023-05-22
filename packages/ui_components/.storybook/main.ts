import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { loadConfigFromFile, mergeConfig } from "vite";

const configEnvServe = {
  mode: "development",
  command: "serve",
  ssrBuild: false,
} as const;
const storybookConfig: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config, { configType }) {
    const f = await loadConfigFromFile(
      configEnvServe,
      path.resolve(__dirname, "../vite.config.ts"),
    );
    if (!f) return config;
    const { config: userConfig } = f;

    return mergeConfig(config, {
      ...userConfig,
      // manually specify plugins to avoid conflict
      plugins: [],
    });
  },
  staticDirs: ["../public"],
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="styles/globals.css" />
  `,
};
export default storybookConfig;
