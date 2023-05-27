import { Meta, StoryObj } from "@storybook/react";
import { getMyPostData } from "@/services/server/MyPost/__mock__/fixture";
import { BasicLayoutDecorator, PCStory, SPStory } from "@/tests/storybook";
import { MyPostEdit } from "./";

export default {
  component: MyPostEdit,
  args: { post: getMyPostData },
  decorators: [BasicLayoutDecorator],
} as Meta<typeof MyPostEdit>;

type Story = StoryObj<typeof MyPostEdit>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
