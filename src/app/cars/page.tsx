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
import Filter from "./filter";

const prisma = new PrismaClient();

export default async function Page({
    searchParams,
}: {
    searchParams: { search: string; page: string; filter: string };
}) {
    let search = searchParams.search ?? "";
    let page = parseInt(searchParams.page ?? "1");
    let filter = searchParams.filter ?? "";
    let limit = 10;
    let offset = (page - 1) * limit;

    let capacity: number[] = [];
    let transmission: string[] = [];
    let passengers: number[] = [];

    for (let i = 0; i < filter.length; i++) {
        if (filter[i] === "C") {
            capacity.push(Number(filter[i + 1]));
        }
        if (filter[i] === "T") {
            transmission.push(filter[i + 1].toUpperCase());
        }
        if (filter[i] === "P") {
            passengers.push(Number(filter[i + 1]));
        }
    }

    if (!capacity.length) capacity = [1, 2, 3, 4];
    if (!transmission.length) transmission = ["A", "M"];
    if (!passengers.length) passengers = [2, 4];

    let result = await prisma.car.findMany({
        where: {
            OR: [
                { name: { contains: search } },
                { brand: { contains: search } },
            ],
            capacity: { in: capacity },
            // transmission: { in: transmission },
            // passengers: { in: passengers },
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
        <>
            <div className="mt-4 flex w-screen items-center justify-center">
                <Search />
            </div>
            <div className="flex">
                <div className="hidden justify-center p-4 md:flex md:w-1/4">
                    <Filter />
                </div>
                <div className="m-auto mt-5 flex w-full flex-col md:w-3/4">
                    <main>
                        <div className="max-w-7xl">
                            <div className="m-auto grid max-w-2xl gap-4 p-4 md:grid-cols-2 xl:max-w-7xl xl:grid-cols-3">
                                {cars.map((car) => (
                                    <Link href={"/car/" + car.id} key={car.id}>
                                        <div className="m-auto flex max-w-[300px] flex-col justify-between rounded-xl pb-1 pl-4 pr-4 pt-4 text-black shadow-lg transition duration-200 ease-in-out hover:cursor-pointer hover:shadow-2xl">
                                            <div className="m-auto flex max-w-xl gap-2 rounded-xl">
                                                <div className="w-2/3">
                                                    <div className="flex flex-col">
                                                        <Image
                                                            src={car.imageUrl}
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
        </>
    );
}
