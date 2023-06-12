import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { ScenarioFormInfo } from ".";
import { ScenarioInput } from "@rinne-circle/backend";

function TestComponent() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<ScenarioInput>();
  return (
    <ScenarioFormInfo register={register} control={control} errors={errors} />
  );
}

export default {
  component: TestComponent,
} as Meta<typeof ScenarioFormInfo>;

type Story = StoryObj<typeof ScenarioFormInfo>;

export const Default: Story = {};
