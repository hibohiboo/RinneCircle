import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { WatchCounter } from "./";
import { Textbox } from "@/components/common/atoms/Textbox";

export function TestComponent({ text = "" }: { text?: string }) {
  const { register, control } = useForm({ defaultValues: { text } });
  const name = "text";
  return (
    <>
      <Textbox {...register(name)} id="input" />
      <WatchCounter max={10} name={name} control={control} />
    </>
  );
}

export default {
  component: TestComponent,
  excludeStories: /.*Component$/,
  parameters: {
    a11y: {
      config: { rules: [{ id: "label", enabled: false }] },
    },
  },
} as ComponentMeta<typeof TestComponent>;

type Story = ComponentStoryObj<typeof TestComponent>;

export const Default: Story = {};

export const LimitOver: Story = {
  args: { text: "01234567890" },
};
