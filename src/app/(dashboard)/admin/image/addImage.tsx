"use server";

import { prisma } from "../../../../../lib/prisma";

interface CarData {
  id: string;
  url: string;
}

export default async function addCar(data: CarData) {
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
