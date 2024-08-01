import { PrismaClient } from "@prisma/client";

const prismaClient = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClient>;

const globalPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalPrisma.prisma ?? prismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prisma;
