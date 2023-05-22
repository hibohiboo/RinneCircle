import { BasicLayout } from "@/components/layouts/BasicLayout";
import { LoginUserInfoProvider } from "@/components/providers/LoginUserInfo";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Args, PartialStoryFn } from "@storybook/csf";
import type { ReactRenderer } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

export const BasicLayoutDecorator = (
  Story: PartialStoryFn<ReactRenderer, Args>,
) => <MemoryRouter>{BasicLayout(<Story />)}</MemoryRouter>;

export const LoginUserInfoProviderDecorator = (
  Story: PartialStoryFn<ReactRenderer, Args>,
) => (
  <MemoryRouter>
    <LoginUserInfoProvider>
      <Story />
    </LoginUserInfoProvider>
  </MemoryRouter>
);

export const SPStory = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
    screenshot: {
      viewport: {
        width: 375,
        height: 667,
        deviceScaleFactor: 1,
      },
      fullPage: false,
    },
  },
};

export const PCStory = {
  parameters: {
    screenshot: {
      viewport: {
        width: 1280,
        height: 800,
      },
      fullPage: false,
    },
  },
};
