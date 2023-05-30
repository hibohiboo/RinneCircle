import { PCStory, SPStory } from "@/tests/storybook";
import { Meta, StoryObj } from "@storybook/react";
import { Login } from "./";

export default {
  component: Login,
} as Meta<typeof Login>;

type Story = StoryObj<typeof Login>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
