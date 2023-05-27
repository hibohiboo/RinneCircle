import { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./";

export default {
  component: Switch,
  parameters: {
    a11y: {
      config: { rules: [{ id: "label", enabled: false }] },
    },
  },
} as Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};
