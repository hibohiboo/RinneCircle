import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getTodos: QueryResolvers["getTodos"] = async (
  parent,
  args,
  context,
  info,
) => {
  let userId = context.user?.id;
  if (!userId) {
    userId = "sample";
  }
  const todos = await prisma.todo.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
  return todos;
};
