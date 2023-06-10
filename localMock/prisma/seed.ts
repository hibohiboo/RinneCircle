import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  const scenarios = await createScenarios();

  console.log({ scenarios });
};

const createScenarios = async () => {
  const promises = [...Array(3)].map((_, i) => {
    const id = `${i + 1}`;
    return prisma.rinneScenario.upsert({
      where: { id: id },
      update: {},
      create: {
        id: id,
        authorId: `author-${id}`,
        title: `${id}_scenario_title`,
        path: "",
        published: false,
      },
    });
  });
  return await Promise.all(promises);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
