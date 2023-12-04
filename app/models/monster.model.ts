import { Prisma, PrismaClient } from "@prisma/client";

const MonsterModel = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

MonsterModel.$on("query", (e) => {
  console.info("Query: " + e.query);
  console.info("Params: " + e.params);
  console.info("Duration: " + e.duration + "ms");
});

MonsterModel.$use(async (params, next) => {
  // callback before request
  const result = await next(params);
  // callback after request
  return result;
});

const Model = MonsterModel.$extends({
  model: {
    monster: {
      async findOrCreate({ key, data }: { key: string; data: Prisma.SettingCreateInput }) {
        const admin = await MonsterModel.monster.findFirst({
          where: {
            key: key,
          },
        });
        if (admin) return admin;
        return await MonsterModel.monster.create({ data: data });
      },
    },
  },
});

export default Model;
