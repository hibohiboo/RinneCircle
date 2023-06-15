// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from "msw";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
export const mswInit = async () => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { worker } = await import("./browser");

    worker.start();
  }
};
