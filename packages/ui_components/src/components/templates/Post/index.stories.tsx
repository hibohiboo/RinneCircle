import { getPostData } from "@/services/server/Post/__mock__/fixture";
import { BasicLayoutDecorator, PCStory, SPStory } from "@/tests/storybook";
import { Meta, StoryObj } from "@storybook/react";
import { Post } from "./";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  component: Post,
  args: { post: getPostData, user: null },
  decorators: [BasicLayoutDecorator, withRouter],
} as Meta<typeof Post>;

type Story = StoryObj<typeof Post>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
