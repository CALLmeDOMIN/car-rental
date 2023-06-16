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
import { getCars } from "../api/prisma";

const filterSearchParams = (str: string) => {
    let capacity: number[] = [];
    let transmission: string[] = [];
    let passengers: number[] = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === "C") {
            capacity.push(Number(str[i + 1]));
        } else if (str[i] === "T") {
            if (str[i + 1] === "A") transmission.push("Automatic");
            else transmission.push("Manual");
        } else if (str[i] === "P") {
            passengers.push(Number(str[i + 1]));
        }
    }

    return { t: transmission, c: capacity, p: passengers };
};

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

    let {
        t: transmission,
        c: capacity,
        p: passengers,
    } = filterSearchParams(filter);

    if (!transmission.length) transmission = ["Automatic", "Manual"];
    if (!capacity.length) capacity = [1, 2, 4];
    if (!passengers.length) passengers = [2, 4];

    let cars = await getCars({ search, transmission, capacity, passengers });

    // let cars = result.length ? result : [];
    // let total = await prisma.car.count({
    //     where: {
    //         OR: [
    //             { name: { contains: search } },
    //             { brand: { contains: search } },
    //         ],
    //     },
    // });

    // let totalPages = Math.ceil(total / limit);
    // let hasNextPage = page < totalPages;
    // let hasPreviousPage = page > 1;

    const gridh1Style = "font-semibold flex items-center gap-2";
    return (
        <>
            <div className="mt-4 flex w-screen items-center justify-center">
                <Search />
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="flex justify-end pr-6 pt-4 md:flex md:w-1/4 md:justify-center md:p-4">
                    <Filter />
                </div>
                <div className="mx-auto flex w-full flex-col md:mt-5 md:w-3/4">
                    <main>
                        <div className="max-w-7xl">
                            <div className="m-auto grid max-w-2xl gap-4 p-4 pt-0 md:grid-cols-2 md:pt-4 xl:max-w-7xl xl:grid-cols-3">
                                {cars.map((car) => (
                                    <Link
                                        href={"/car/" + car.id}
                                        key={car.id}
                                        className="m-auto flex max-w-[300px] flex-col justify-between rounded-xl pb-1 pl-4 pr-4 pt-4 text-black shadow-lg transition duration-200 ease-in-out hover:cursor-pointer hover:shadow-2xl"
                                    >
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
                                                        aria-label="price"
                                                    />
                                                    ${car.price}
                                                </h1>
                                                <h1 className={gridh1Style}>
                                                    <IconManualGearbox
                                                        size={17}
                                                        className="pl-[2px] text-red-600"
                                                        aria-label="transmission"
                                                    />
                                                    {car.transmission[0]}
                                                </h1>
                                                <h1 className={gridh1Style}>
                                                    <IconUser
                                                        size={15}
                                                        className="text-red-600"
                                                        aria-label="passengers"
                                                    />
                                                    {car.passengers}
                                                </h1>
                                                <h1 className={gridh1Style}>
                                                    <IconLuggage
                                                        size={15}
                                                        className="text-red-600"
                                                        aria-label="bags"
                                                    />
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
