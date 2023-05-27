import { Meta, StoryObj } from "@storybook/react";
import { DescriptionMessage } from "./";

export default {
  component: DescriptionMessage,
  args: { children: "概要" },
} as Meta<typeof DescriptionMessage>;

type Story = StoryObj<typeof DescriptionMessage>;

export const Default: Story = {};
