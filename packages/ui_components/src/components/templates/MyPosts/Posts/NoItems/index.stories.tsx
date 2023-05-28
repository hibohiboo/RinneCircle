import { getMyPostsData } from "@/services/server/MyPosts/__mock__/fixture";
import { Meta, StoryObj } from "@storybook/react";
import { NoItems } from "./";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  component: NoItems,
  args: getMyPostsData,
  decorators: [withRouter],
} as Meta<typeof NoItems>;

type Story = StoryObj<typeof NoItems>;

export const Default: Story = {};
