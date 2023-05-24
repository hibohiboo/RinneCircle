import { rest } from "msw";
import { path } from "..";
import { getMyProfileData } from "./fixture";

export function handleGetMyProfile(args?: {
  mock?: jest.Mock<any, any>;
  status?: number;
}) {
  return rest.get(path(), async (_, res, ctx) => {
    args?.mock?.();
    if (args?.status) {
      return res(ctx.status(args.status));
    }
    if (location.hostname === "hibohiboo.github.io") {
      return res(
        ctx.status(200),
        ctx.json({
          ...getMyProfileData,
          imageUrl: `/RinneCircle/storybook-static/${getMyProfileData.imageUrl}`,
        }),
      );
    }
    return res(ctx.status(200), ctx.json(getMyProfileData));
  });
}

export const handlers = [handleGetMyProfile()];
