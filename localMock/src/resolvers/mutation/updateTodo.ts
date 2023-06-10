import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const updateTodo: MutationResolvers["updateTodo"] = async (
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
  const targetTodo = await prisma.todo.findUnique({
    where: {
      // @ts-ignore
      id: args.id,
    },
  });

  if (!targetTodo) {
    throw new Error("Not Found Todo.");
  }

  if (targetTodo.userId !== userId) {
    throw new Error("Authorization Error.");
  }
  if (!args.input) throw new Error("args Error.");
  // @ts-ignore
  const todo = await prisma.todo.update({
    where: {
      // @ts-ignore
      id: args.id,
    },
    data: {
      // @ts-ignore
      title: args.input.title,
      // @ts-ignore
      status: args.input.status,
    },
  });
  return todo;
};
