import { PrismaClient } from "@prisma/client";
import {
    IconBusinessplan,
    IconLuggage,
    IconManualGearbox,
    IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "./search";

const prisma = new PrismaClient();

interface Car {
    id: number;
    name: string;
    brand: string;
    transmission: string;
    year: number;
    price: number;
    distance: number;
    passengers: number;
    capacity: number;
}

type searchParamstype = {
    search?: string;
    page?: string;
};

export default async function Page({
    searchParams,
}: {
    searchParams: { search: string; page: string };
}) {
    let search = searchParams.search ?? "";
    let page = parseInt(searchParams.page ?? "1");
    let limit = 10;
    let offset = (page - 1) * limit;

    let result = await prisma.car.findMany({
        where: {
            OR: [
                { name: { contains: search } },
                { brand: { contains: search } },
            ],
        },
        skip: offset,
        take: limit,
    });

    let cars = result.length ? result : [];
    let total = await prisma.car.count({
        where: {
            OR: [
                { name: { contains: search } },
                { brand: { contains: search } },
            ],
        },
    });

    let totalPages = Math.ceil(total / limit);
    let hasNextPage = page < totalPages;
    let hasPreviousPage = page > 1;

    const gridh1Style = "font-semibold flex items-center gap-2";

    return (
        <div>
            <div className="mt-5 flex flex-col items-center justify-between">
                <div className="min-w-[45ch]">
                    <Search />
                </div>
                <main className="h-screen w-screen bg-white">
                    <div className="m-auto max-w-7xl">
                        <div className="m-auto grid max-w-2xl gap-4 p-4 md:grid-cols-2 xl:max-w-7xl xl:grid-cols-3">
                            {cars.map((car) => (
                                <Link href={"/car/" + car.id} key={car.id}>
                                    <div className="m-auto flex max-w-[300px] flex-col justify-between rounded-xl pb-1 pl-4 pr-4 pt-4 text-black shadow-lg transition duration-200 ease-in-out hover:cursor-pointer hover:shadow-2xl">
                                        <div className="m-auto flex max-w-xl gap-2 rounded-xl">
                                            <div className="w-2/3">
                                                <div className="flex flex-col">
                                                    <Image
                                                        src={
                                                            "/" +
                                                            car.id.toString() +
                                                            ".jpg"
                                                        }
                                                        width="200"
                                                        height="100"
                                                        alt="car image"
                                                        className="aspect-video rounded-xl object-cover shadow-xl "
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h1 className={gridh1Style}>
                                                    <IconBusinessplan
                                                        size={15}
                                                        className="text-red-600"
                                                    />{" "}
                                                    ${car.price}
                                                </h1>
                                                <h1 className={gridh1Style}>
                                                    <IconManualGearbox
                                                        size={17}
                                                        className="pl-[2px] text-red-600"
                                                    />{" "}
                                                    {car.transmission[0]}
                                                </h1>
                                                <h1 className={gridh1Style}>
                                                    <IconUser
                                                        size={15}
                                                        className="text-red-600"
                                                    />{" "}
                                                    {car.passengers}
                                                </h1>
                                                <h1 className={gridh1Style}>
                                                    <IconLuggage
                                                        size={15}
                                                        className="text-red-600"
                                                    />{" "}
                                                    {car.capacity}
                                                </h1>
                                            </div>
                                        </div>
                                        <p className="mb-1 mt-1 font-bold">
                                            <span className="text-red-600">
                                                {car.brand}
                                            </span>{" "}
                                            | {car.name}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
