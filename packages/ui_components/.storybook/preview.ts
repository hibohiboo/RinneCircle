import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { handleGetMyProfile } from "../src/services/client/MyProfile/__mock__/msw";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    msw: { handlers: [handleGetMyProfile()] },
  },
};

export default preview;
export const decorators = [mswDecorator];
const options =
  location.hostname !== "hibohiboo.github.io"
    ? {}
    : {
        serviceWorker: {
          url: "/RinneCircle/storybook-static/mockServiceWorker.js",
        },
      };
initialize(options);
