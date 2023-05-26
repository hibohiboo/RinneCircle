import { Meta, StoryObj } from "@storybook/react";
import { ContentHeader } from "./";

export default {
  component: ContentHeader,
} as Meta<typeof ContentHeader>;

type Story = StoryObj<typeof ContentHeader>;

export const Default: Story = {
  args: { title: "見出し", description: "概要" },
};
