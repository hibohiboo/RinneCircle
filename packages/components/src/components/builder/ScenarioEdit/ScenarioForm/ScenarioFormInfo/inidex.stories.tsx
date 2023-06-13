import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { ScenarioFormInfo } from ".";
import { ScenarioDetailInput } from "@/domain/scenario/types";

function TestComponent() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<ScenarioDetailInput>();
  return (
    <ScenarioFormInfo register={register} control={control} errors={errors} />
  );
}

export default {
  component: TestComponent,
} as Meta<typeof ScenarioFormInfo>;

type Story = StoryObj<typeof ScenarioFormInfo>;

export const Default: Story = {};
