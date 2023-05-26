import { Meta, StoryObj } from "@storybook/react";
import { TextboxWithError } from "./";

export default {
  component: TextboxWithError,
  args: {
    id: "title",
    name: "title",
    defaultValue: "タイトル",
    maxLength: 10,
  },
  parameters: {
    a11y: {
      config: { rules: [{ id: "label", enabled: false }] },
    },
  },
} as Meta<typeof TextboxWithError>;

type Story = StoryObj<typeof TextboxWithError>;

export const Default: Story = {};

export const Error: Story = {
  args: { error: "エラーがあります" },
};
