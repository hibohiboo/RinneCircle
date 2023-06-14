import { PCStory } from "@rinne-components/tests/storybook";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent as user, waitFor, within } from "@storybook/testing-library";
import { ScenarioForm } from "./";

export default {
  component: ScenarioForm,
  decorators: [],
  parameters: {
    ...PCStory.parameters,
  },
  args: {
    title: "新規シナリオ",
    description: "公開ステータスを変更するまで、シナリオは公開されません",
    onClickSave: () => {},
    onClickDelete: () => {},
    onChangeImage: () => {},
  },
} as Meta<typeof ScenarioForm>;

type Story = StoryObj<typeof ScenarioForm>;

export const Default: Story = {};

export const SucceedSaveAsDraft: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await user.type(
      canvas.getByRole("textbox", { name: "シナリオタイトル" }),
      "私の技術シナリオ",
    );
  },
};

export const FailedSaveAsDraft: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      user.click(canvas.getByRole("button", { name: "下書き保存する" }));
      const textbox = canvas.getByRole("textbox", { name: "シナリオタイトル" });
      expect(textbox).toHaveErrorMessage("1文字以上入力してください");
    });
  },
};

export const SavePublish: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await user.type(
      canvas.getByRole("textbox", { name: "シナリオタイトル" }),
      "私の技術シナリオ",
    );
    await waitFor(() => {
      user.click(canvas.getByRole("switch", { name: "公開ステータス" }));
      expect(
        canvas.getByRole("button", { name: "シナリオを公開する" }),
      ).toBeInTheDocument();
    });
  },
};
