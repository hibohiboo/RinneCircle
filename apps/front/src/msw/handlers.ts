// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";

export const handlers = [
  rest.put("/v1/api/scenario", (_, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`/v1/api/scenario`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json([
        {
          id,
          authorId: "33fCzdRoHwgB2BXX5ttxbEJPYtM2",
          title: "てすとタイトル",
          imageUrl:
            "/33fCzdRoHwgB2BXX5ttxbEJPYtM2/scenario/2023/06/05/7d8bb386-0f86-4dff-be34-86bb2f55b366/scenarioTitle.png",
          path: "/33fCzdRoHwgB2BXX5ttxbEJPYtM2/scenario/2023/06/05/7d8bb386-0f86-4dff-be34-86bb2f55b366/scenario.json",
          published: true,
        },
      ]),
    );
  }),
];
