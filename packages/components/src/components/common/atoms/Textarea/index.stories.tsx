import { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./";

export default {
  component: Textarea,
  args: { placeholder: "ここに文字を入力します" },
} as Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
