"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../../../../lib/prisma";
import { NewCar } from "./form";

export default async function addCar(data: NewCar) {
  "use server";
  await prisma.car.create({
    data: {
      brand: data.brand,
      name: data.name,
      transmission: data.transmission,
      price: parseFloat(data.price),
      distance: parseInt(data.distance),
      passengers: parseInt(data.passengers),
      capacity: parseInt(data.capacity),
      engineCapacity: parseFloat(data.engineCapacity),
      horsepower: parseInt(data.horsepower),
      topSpeed: parseInt(data.topSpeed),
      description: data.description,
    },
  });

  revalidatePath("/admin");
}
