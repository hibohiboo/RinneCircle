import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { PostFormHeroImage } from "./";
import { ScenarioInputSchema } from "@/domain/scenario/schema";

function TestComponent() {
  const {
    formState: { errors },
  } = useForm<ScenarioInputSchema>();
  return (
    <div style={{ display: "flex", height: "120px" }}>
      <PostFormHeroImage
        name="imageUrl"
        error={errors.imageUrl?.message}
        onChangeImage={() => {}}
        imageUrl=""
      />
    </div>
  );
}

export default {
  component: TestComponent,
} as Meta<typeof PostFormHeroImage>;

type Story = StoryObj<typeof PostFormHeroImage>;

export const Default: Story = {};
