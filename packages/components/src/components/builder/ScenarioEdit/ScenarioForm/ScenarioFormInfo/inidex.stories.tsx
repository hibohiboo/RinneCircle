import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { ScenarioFormInfo } from ".";
import { ScenarioDetailInput } from "@/domain/scenario/types";
import { ScenarioInputSchema } from "@/domain/scenario/schema";

function TestComponent() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<ScenarioInputSchema>();
  return (
    <ScenarioFormInfo register={register} control={control} errors={errors} />
  );
}

export default {
  component: TestComponent,
} as Meta<typeof ScenarioFormInfo>;

type Story = StoryObj<typeof ScenarioFormInfo>;

export const Default: Story = {};
