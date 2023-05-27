import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { PostFormInfo } from "./";
import { UpdateMyPostInput } from "@/lib/schema/MyPost";

function TestComponent() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<UpdateMyPostInput>();
  return <PostFormInfo register={register} control={control} errors={errors} />;
}

export default {
  component: TestComponent,
} as Meta<typeof PostFormInfo>;

type Story = StoryObj<typeof PostFormInfo>;

export const Default: Story = {};
