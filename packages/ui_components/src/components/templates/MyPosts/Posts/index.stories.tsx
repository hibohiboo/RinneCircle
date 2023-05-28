import {
  getMyPostsData,
  getMyPostsEmptyData,
} from "@/services/server/MyPosts/__mock__/fixture";
import { Meta, StoryObj } from "@storybook/react";
import { Posts } from "./";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  component: Posts,
  args: getMyPostsData,
  decorators: [withRouter],
} as Meta<typeof Posts>;

type Story = StoryObj<typeof Posts>;

export const Default: Story = {};

export const NoItems: Story = {
  args: getMyPostsEmptyData,
};
