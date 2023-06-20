import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Car = {
    id?: number;
    name?: string;
    brand?: string;
    transmission?: string;
    year?: number;
    price?: number;
    distance?: number;
    passengers?: number;
    capacity?: number;
    imageUrl?: string;
};

export async function getCars({
    search,
    transmission,
    capacity,
    passengers,
    startPrice,
    endPrice,
}: {
    search?: string;
    transmission?: string[];
    capacity?: number[];
    passengers?: number[];
    startPrice?: number;
    endPrice?: number;
}) {
    return await prisma.car.findMany({
        where: {
            ...(search &&
                ({ name: { contains: search } } || {
                    brand: { contains: search },
                })),

            ...(passengers && { passengers: { in: passengers } }),
            ...(transmission && {
                transmission: { in: transmission },
            }),
            ...(capacity && { capacity: { in: capacity } }),
            ...(startPrice && { price: { gte: startPrice } }),
            ...(endPrice && { price: { lte: endPrice } }),
        },
    });
}

export const getAllCars = async () => {
    return await prisma.car.findMany();
};

export const getCertainCars = async ({
    id,
    name,
    brand,
    transmission,
    year,
    price,
    distance,
    passengers,
    capacity,
    imageUrl,
}: Car) => {
    return await prisma.car.findMany({
        where: {
            ...(id && { id: { equals: id } }),
            ...(name && { name: { equals: name } }),
            ...(brand && { brand: { equals: brand } }),
            ...(transmission && { transmission: { equals: transmission } }),
            ...(year && { year: { equals: year } }),
            ...(price && { price: { equals: price } }),
            ...(distance && { distance: { equals: distance } }),
            ...(passengers && { passengers: { equals: passengers } }),
            ...(capacity && { capacity: { equals: capacity } }),
            ...(imageUrl && { imageUrl: { equals: imageUrl } }),
        },
    });
};
