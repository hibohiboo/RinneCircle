import { PCStory, SPStory } from "@/tests/storybook";
import { Meta, StoryObj } from "@storybook/react";
import { RinneBuilderTop } from ".";

export default {
  component: RinneBuilderTop,
  parameters: {
    msw: { handlers: [] },
  },
} as Meta<typeof RinneBuilderTop>;

type Story = StoryObj<typeof RinneBuilderTop>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
