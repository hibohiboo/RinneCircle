import { getMyPostsData } from "@/services/server/MyPosts/__mock__/fixture";
import { Meta, StoryObj } from "@storybook/react";
import { Header } from "./";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  component: Header,
  args: getMyPostsData,
  decorators: [withRouter],
} as Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
