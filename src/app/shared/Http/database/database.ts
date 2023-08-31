import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const teste = await prisma.category.create({
    data: {
      title: "Teste JR",
      description: "Aaaaa",
      ownerId: "23134asdf",
    },
  });
  console.log(teste);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
