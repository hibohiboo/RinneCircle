import { generatePagination } from "@/lib/util/pagination";
import { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  component: Pagination,
  args: { pathname: "/posts" },
  decorators: [withRouter],
} as Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

const getStory = (page: number) => ({
  args: {
    pagination: generatePagination(page, 9),
  },
  parameters: {
    reactRouter: {
      searchParams: { page },
    },
  },
});

export const Page1: Story = getStory(1);
export const Page2: Story = getStory(2);
export const Page3: Story = getStory(3);
export const Page4: Story = getStory(4);
export const Page5: Story = getStory(5);
export const Page9: Story = getStory(9);
