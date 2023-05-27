import {
  getMyPostsData,
  getMyPostsEmptyData,
} from "@/services/server/MyPosts/__mock__/fixture";
import { Meta, StoryObj } from "@storybook/react";
import { Posts } from "./";

export default {
  component: Posts,
  args: getMyPostsData,
} as Meta<typeof Posts>;

type Story = StoryObj<typeof Posts>;

export const Default: Story = {};

export const NoItems: Story = {
  args: getMyPostsEmptyData,
};
