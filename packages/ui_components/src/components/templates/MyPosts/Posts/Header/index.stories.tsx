import { getMyPostsData } from "@/services/server/MyPosts/__mock__/fixture";
import { Meta, StoryObj } from "@storybook/react";
import { Header } from "./";

export default {
  component: Header,
  args: getMyPostsData,
} as Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
