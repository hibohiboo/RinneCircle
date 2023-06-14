import { createBrowserRouter } from "react-router-dom";
import Top from "../components/pages/Top";
import ScenarioEdit from "../components/pages/ScenarioEdit";
declare let VITE_DEFINE_BASE_PATH: string;
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Top />,
    },
    {
      path: "/scenario/create",
      element: <ScenarioEdit />,
    },
  ],
  {
    basename: `/${VITE_DEFINE_BASE_PATH}`,
  },
);
