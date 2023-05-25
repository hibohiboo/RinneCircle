import { Meta, StoryObj } from "@storybook/react";
import { PaginationInfo } from "./";

export default {
  component: PaginationInfo,
  args: { start: 1, end: 10, hitCount: 100 },
} as Meta<typeof PaginationInfo>;

type Story = StoryObj<typeof PaginationInfo>;

export const Default: Story = {};
