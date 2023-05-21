import { rest } from "msw";
import { path } from "..";
import { data } from "./fixture";
import { PostReturn } from "../types";

export function handlePostLogout(args?: {
  mock?: jest.Mock<any, any>;
  status?: number;
}) {
  return rest.post<{}, {}, PostReturn>(path(), async (_, res, ctx) => {
    args?.mock?.();
    if (args?.status) {
      return res(ctx.status(args.status));
    }
    return res(ctx.status(200), ctx.json(data));
  });
}

export const handlers = [handlePostLogout()];
