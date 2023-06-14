import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlertDialogAction } from "./AlertDialog/hooks";
import { ScenarioInputSchema } from "@rinne-components/index";

export function useScenarioEdit({ id }: { id: string }) {
  const navigate = useNavigate();
  const [action, setAction] = useState<"delete" | "save">();

  const { showAlertDialog, hideAlertDialog } = useAlertDialogAction();

  const onClickSave = (isPublish: boolean) => {
    if (!isPublish) return;
    setAction("save");
    showAlertDialog({ message: "記事を公開します。よろしいですか？" });
  };

  const onClickDelete = () => {
    setAction("delete");
    showAlertDialog({ message: "記事を削除します。よろしいですか？" });
  };

  const handleSave = async (input: ScenarioInputSchema) => {
    const status = input.published ? "公開" : "保存";
    try {
      const body = JSON.stringify({
        id,
        authorId: "x33fCzdRoHwgB2BXX5ttxbEJPYtM2",
        title: input.title,
        published: input.published,
        path: "",
        imageUl: "",
      });
      await fetch("/api/scenario", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body,
      });
      await navigate("/");
      // await navigate(`/my/posts/${id}`);
    } catch (err) {}
  };

  const onValid = async (input: ScenarioInputSchema) => {
    hideAlertDialog();
    switch (action) {
      case "delete":
        break;
      case "save":
        await handleSave(input);
        break;
      default:
        if (!input.published) {
          await handleSave(input);
        }
        break;
    }
  };

  const onInvalid = async () => {
    hideAlertDialog();
    switch (action) {
      case "delete":
        break;
      case "save":
        hideAlertDialog();
        break;
    }
  };

  return {
    onClickSave,
    onClickDelete,
    onValid,
    onInvalid,
  };
}
