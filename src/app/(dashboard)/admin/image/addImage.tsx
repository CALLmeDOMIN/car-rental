"use server";

import { prisma } from "@/../lib/prisma";

export default async function addCar(data: { id: string; url: string }) {
  "use server";
  await prisma.car.update({
    where: {
      id: parseInt(data.id),
    },
    data: {
      imageUrl: data.url,
    },
  });
}
