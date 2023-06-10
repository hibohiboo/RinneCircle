import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const addTodo: MutationResolvers["addTodo"] = async (
  parent,
  args,
  context,
  info,
) => {
  // @ts-ignore
  let userId = context.user?.id;
  if (!userId) {
    userId = "sample";
  }
  // @ts-ignore
  const todo = await prisma.todo.create({
    data: {
      // @ts-ignore
      title: args.input.title,
      status: "pending",
      userId: userId,
    },
  });
  return todo;
};
