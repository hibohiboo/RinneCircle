import { prisma } from "../../lib/prisma";
import { QueryResolvers } from "../../types/generated/graphql";

export const getTodoById: QueryResolvers["getTodoById"] = async (
  parent,
  args,
  context,
  info,
) => {
  // @ts-ignore
  const todo = await prisma.todo.findUnique({
    where: {
      id: args.id,
    },
  });
  if (!todo) {
    throw new Error("Not Found Todo.");
  }
  return { ...todo };
};
