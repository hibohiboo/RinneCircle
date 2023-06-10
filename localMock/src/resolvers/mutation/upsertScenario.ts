import { prisma } from "../../lib/prisma";
import { MutationResolvers } from "../../types/generated/graphql";

export const upsertPostRinneScenario: MutationResolvers["upsertPostRinneScenario"] =
  async (parent, args, context, info) => {
    const update = args.on_conflict.update_columns?.reduce(
      (a, b) => ({ ...a, [b]: args.object[b] }),
      {},
    ) as any;
    const updatedAt = new Date(args.object.updatedAt);
    const scenario = await prisma.rinneScenario.upsert({
      where: {
        id: args.object.id,
      },
      create: { ...args.object, updatedAt },
      update: { ...update, updatedAt },
    });
    return scenario;
  };
