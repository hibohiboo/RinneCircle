import {
  BasicLayoutDecorator,
  PCStory,
  SPStory,
} from "@rinne-components/tests/storybook";
import { Meta, StoryObj } from "@storybook/react";
import { RinneBuilderTop } from ".";

export default {
  decorators: [BasicLayoutDecorator],
  component: RinneBuilderTop,
  parameters: {
    msw: { handlers: [] },
  },
} as Meta<typeof RinneBuilderTop>;

type Story = StoryObj<typeof RinneBuilderTop>;

const args = {
  children: (
    <>
      ないものは作ればいい。
      <a href="https://github.com/hibohiboo/RinneCircle" target="_blank">
        ♾
      </a>
    </>
  ),
};

export const Default: Story = {
  ...PCStory,
  args,
};

export const SP: Story = { ...SPStory, args };
