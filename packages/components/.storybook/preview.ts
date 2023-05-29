import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { initialize, mswDecorator } from "msw-storybook-addon";

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
    msw: { handlers: [] },
  },
};

export default preview;
export const decorators = [mswDecorator];
const options =
  location.hostname !== "hibohiboo.github.io"
    ? {}
    : {
        serviceWorker: {
          url: "/RinneCircle/rinne-components/mockServiceWorker.js",
        },
      };
initialize(options);
