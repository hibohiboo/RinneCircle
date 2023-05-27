import { getMyPostsData } from "@/services/server/MyPosts/__mock__/fixture";
import { getMyProfileData } from "@/services/server/MyProfile/__mock__/fixture";
import { BasicLayoutDecorator, PCStory, SPStory } from "@/tests/storybook";
import { Meta, StoryObj } from "@storybook/react";
import { MyPosts } from "./";

export default {
  component: MyPosts,
  args: { profile: getMyProfileData, posts: getMyPostsData },
  decorators: [BasicLayoutDecorator],
} as Meta<typeof MyPosts>;

type Story = StoryObj<typeof MyPosts>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
