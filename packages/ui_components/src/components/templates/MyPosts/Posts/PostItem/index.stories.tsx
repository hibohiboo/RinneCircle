import { getMyPostsData } from "@/services/server/MyPosts/__mock__/fixture";
import { Meta, StoryObj } from "@storybook/react";
import { PostItem } from "./";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  component: PostItem,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: "label", enabled: false },
          { id: "listitem", enabled: false },
        ],
      },
    },
  },
  decorators: [withRouter],
} as Meta<typeof PostItem>;

type Story = StoryObj<typeof PostItem>;

export const Default: Story = {
  args: { post: getMyPostsData.posts[0] },
};

export const Draft: Story = {
  args: { post: { ...getMyPostsData.posts[0], published: false } },
};
