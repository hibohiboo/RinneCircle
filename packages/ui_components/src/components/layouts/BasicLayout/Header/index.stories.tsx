import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { LoginUserInfoProviderDecorator, SPStory } from "@/tests/storybook";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent as user, waitFor, within } from "@storybook/testing-library";
import { withRouter } from "storybook-addon-react-router-v6";
import { Header } from "./";

export default {
  component: Header,
  decorators: [withRouter, LoginUserInfoProviderDecorator],
} as Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const NotLoggedIn: Story = {
  parameters: {
    msw: { handlers: [handleGetMyProfile({ status: 401 })] },
  },
};

export const LoggedIn: Story = {};

export const RouteMyPosts: Story = {
  parameters: {
    reactRouter: {
      routePath: "/my/posts",
    },
  },
};

export const RouteMyPostsCreate: Story = {
  parameters: {
    reactRouter: {
      routePath: "/my/posts/create",
    },
  },
};

export const SPNotLogIn: Story = {
  parameters: {
    ...SPStory.parameters,
    ...NotLoggedIn.parameters,
  },
};

export const SPLoggedIn: Story = {
  parameters: {
    ...SPStory.parameters,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigation = canvas.queryByRole("navigation", {
      name: "ナビゲーション",
    });
    await expect(navigation).not.toBeInTheDocument();
  },
};

export const SPLoggedInOpenedMenu: Story = {
  name: "SPレイアウトでドロワーメニューを開ける",
  parameters: {
    ...SPStory.parameters,
    screenshot: {
      ...SPStory.parameters.screenshot,
      delay: 200,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", {
      name: "メニューを開く",
    });
    await user.click(button);
    const navigation = canvas.getByRole("navigation", {
      name: "ナビゲーション",
    });
    await expect(navigation).toBeInTheDocument();
  },
};

export const SPLoggedInClosedMenu: Story = {
  name: "SPレイアウトでドロワーメニューを閉じれる",
  parameters: {
    ...SPStory.parameters,
    screenshot: {
      ...SPStory.parameters.screenshot,
      delay: 200,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonOpen = await canvas.findByRole("button", {
      name: "メニューを開く",
    });
    await user.click(buttonOpen);
    const buttonClose = await canvas.findByRole("button", {
      name: "メニューを閉じる",
    });
    await expect(buttonClose).toBeInTheDocument();
    await user.click(buttonClose);
  },
};

export const PCLoggedInNotHaveOpenMenu: Story = {
  name: "PCレイアウトで「メニューを開く」は表示されない",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(
        canvas.queryByRole("button", {
          name: "メニューを開く",
        }),
      ).toBeNull(),
    );
  },
};
