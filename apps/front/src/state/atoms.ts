import { ScenarioInputSchema } from "@rinne-components/index";
import { atom, useAtom } from "jotai";
import { Scenario } from "@rinne-circle/backend";

const postId = atom("front-test");
const scenarioData = atom(async (get) => {
  const id = get(postId);
  const response = await fetch(`/v1/api/scenario?id=${id}`);
  const [data]: Scenario[] = await response.json();
  const res: ScenarioInputSchema = {
    title: data.title,
    description: "",
    published: data.published,
    imageUrl: data.imageUrl,
  };
  return res;
});
export const useScenario = () => {
  return useAtom(scenarioData);
};
