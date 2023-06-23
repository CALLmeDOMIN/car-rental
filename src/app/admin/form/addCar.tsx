"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";

export default async function addCar(data: any) {
    "use server";
    const newCar = await prisma.car.create({
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
        },
    });

    revalidatePath("/admin");
}
