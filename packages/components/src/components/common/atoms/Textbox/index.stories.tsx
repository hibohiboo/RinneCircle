import { Meta, StoryObj } from "@storybook/react";
import { Textbox } from "./";

export default {
  component: Textbox,
  args: { placeholder: "ここに文字を入力します" },
} as Meta<typeof Textbox>;

type Story = StoryObj<typeof Textbox>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
