import { HttpError } from "@/lib/error";

import { rest } from "msw";
import { Input, path } from "..";
import { data } from "./fixture";

export function handlePostLogin() {
  return rest.post<Input, {}, { redirectUrl: string }>(
    path(),
    async (req, res, ctx) => {
      const body: Input = await req.json();
      if (body.email === "500@example.com") {
        const err = new HttpError(500).serialize();
        return res(ctx.status(err.status));
      }
      return res(ctx.json(data));
    },
  );
}

export const handlers = [handlePostLogin()];
