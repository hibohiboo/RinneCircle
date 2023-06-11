import { QueryResolvers } from "../../types/generated/graphql";
import { prisma } from "../../lib/prisma";
export const getRinneScenario: QueryResolvers["RinneScenario"] = async (
  parent,
  args,
  context,
  info,
) => {
  const scenarios = await prisma.rinneScenario.findMany({
    where: {
      id: args.where?.id?.["_eq"],
      authorId: args.where?.authorId?._eq,
    },
  });
  return scenarios;
};
