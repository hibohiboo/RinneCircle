import { getMyProfileData } from "@/services/server/MyProfile/__mock__/fixture";
import { Meta, StoryObj } from "@storybook/react";
import { Profile } from "./";

export default {
  component: Profile,
  args: getMyProfileData,
} as Meta<typeof Profile>;

type Story = StoryObj<typeof Profile>;

export const Default: Story = {};
