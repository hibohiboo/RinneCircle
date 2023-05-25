import { Meta, StoryObj } from "@storybook/react";
import { PaginationInfo } from "./";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  component: PaginationInfo,
  args: { start: 1, end: 10, hitCount: 100 },
  decorators: [withRouter],
} as Meta<typeof PaginationInfo>;

type Story = StoryObj<typeof PaginationInfo>;

export const Default: Story = {};
