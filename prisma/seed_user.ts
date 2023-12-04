import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  const data = await prisma.admin.findFirst({
    where: {
      OR: [
        {
          name: "Admin",
        },
        {
          name: "Ariel",
        },
      ],
    },
  });
  if (data) return console.info("Seeding already done");
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const password = bcrypt.hashSync("test123", salt);

  const result = await prisma.admin.createMany({
    data: [
      {
        name: "Admin",
        phone: "08111",
        email: "farmbyte1@mail.com",
        password: password,
        role: "ADMIN"
      },
      {
        name: "Ariel",
        phone: "08112",
        email: "farmbyte2@mail.com",
        password: password,
        role: "USER"
      },
    ],
  });
  console.info("Seeding Success: ", result);
};

main();
