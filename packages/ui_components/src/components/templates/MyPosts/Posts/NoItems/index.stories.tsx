import { getMyPostsData } from "@/services/server/MyPosts/__mock__/fixture";
import { Meta, StoryObj } from "@storybook/react";
import { NoItems } from "./";

export default {
  component: NoItems,
  args: getMyPostsData,
} as Meta<typeof NoItems>;

type Story = StoryObj<typeof NoItems>;

export const Default: Story = {};
