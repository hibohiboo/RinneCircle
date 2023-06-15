import { AlertDialog, ScenarioForm } from "@rinne-circle/components";
import { useScenarioEdit } from "./useScenarioEdit";

export default function ScenarioEdit() {
  const { onClickSave, onValid, onInvalid, scenario } = useScenarioEdit({
    id: "front-test",
  });
  return (
    <ScenarioForm
      title="シナリオ"
      defaultValues={scenario}
      onClickSave={onClickSave}
      onValid={onValid}
      onInvalid={onInvalid}
    >
      <AlertDialog />
    </ScenarioForm>
  );
}
