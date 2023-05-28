import { getMyProfileData } from "@/services/server/MyProfile/__mock__/fixture";
import { Meta, StoryObj } from "@storybook/react";
import { Profile } from "./";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  component: Profile,
  args: getMyProfileData,
  decorators: [withRouter],
} as Meta<typeof Profile>;

type Story = StoryObj<typeof Profile>;

export const Default: Story = {};
