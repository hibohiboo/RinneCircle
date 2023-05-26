import { Meta, StoryObj } from "@storybook/react";
import { ErrorMessage } from "./";

export default {
  component: ErrorMessage,
  args: { children: "エラー" },
} as Meta<typeof ErrorMessage>;

type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {};
