import { Prisma, PrismaClient } from "@prisma/client";

const AdminModel = new PrismaClient({
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

AdminModel.$on("query", (e) => {
  console.info("Query: " + e.query);
  console.info("Params: " + e.params);
  console.info("Duration: " + e.duration + "ms");
});

AdminModel.$use(async (params, next) => {
  // callback before request
  const result = await next(params);
  // callback after request
  return result;
});

const Model = AdminModel.$extends({
  model: {
    admin: {
      async findOrCreate({ email, phone, data }: { email: string; phone: string; data: Prisma.AdminCreateInput }) {
        const admin = await AdminModel.admin.findFirst({
          where: {
            OR: [
              {
                email: email,
              },
              {
                phone: phone,
              },
            ],
          },
        });
        if (admin) return admin;
        return await AdminModel.admin.create({ data: data });
      },
      async findByEmailOrPhone({ email, phone }: { email: string; phone: string }) {
        return await AdminModel.admin.findFirst({
          where: {
            OR: [
              {
                email: email,
              },
              {
                phone: phone,
              },
            ],
          },
        });
      },
    },
  },
});

export default Model;
