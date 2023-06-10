import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getTodos: QueryResolvers["getTodos"] = async (
  parent,
  args,
  context,
  info,
) => {
  // @ts-ignore
  let userId = context.user?.id;
  if (!userId) {
    userId = 1;
  }
  // @ts-ignore
  const todos = await prisma.todo.findMany({
    where: {
      userId,
    },
  });
  return todos;
};
