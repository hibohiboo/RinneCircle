import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { BasicLayoutDecorator, PCStory, SPStory } from "@/tests/storybook";
import { Meta, StoryObj } from "@storybook/react";
import { Login } from "./";

export default {
  component: Login,
  parameters: {
    nextRouter: { pathname: "/login" },
    msw: { handlers: [handleGetMyProfile({ status: 401 })] },
  },
  decorators: [BasicLayoutDecorator],
} as Meta<typeof Login>;

type Story = StoryObj<typeof Login>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
