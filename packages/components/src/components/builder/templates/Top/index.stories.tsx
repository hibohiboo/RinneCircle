import { PCStory, SPStory } from "@/tests/storybook";
import { Meta, StoryObj } from "@storybook/react";
import { Top } from ".";

export default {
  component: Top,
  parameters: {
    msw: { handlers: [] },
  },
} as Meta<typeof Top>;

type Story = StoryObj<typeof Top>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
