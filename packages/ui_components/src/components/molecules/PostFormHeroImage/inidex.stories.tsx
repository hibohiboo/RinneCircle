import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { PostFormHeroImage } from "./";
import { UpdateMyPostInput } from "@/lib/schema/MyPost";

function TestComponent() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateMyPostInput>();
  return (
    <div style={{ display: "flex", height: "120px" }}>
      <PostFormHeroImage
        register={register}
        setValue={setValue}
        name="imageUrl"
        error={errors.imageUrl?.message}
      />
    </div>
  );
}

export default {
  component: TestComponent,
} as Meta<typeof PostFormHeroImage>;

type Story = StoryObj<typeof PostFormHeroImage>;

export const Default: Story = {};
