import {
    IconBusinessplan,
    IconLuggage,
    IconManualGearbox,
    IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "./search";
import { Filter } from "./filter";
import { getCars } from "../api/prisma";
import { CarTile } from "../components/carTile";

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

    const cars = await getCars({ search, transmission, capacity, passengers });

    const total = cars.length;
    let totalPages = Math.ceil(total / limit);
    let hasNextPage = page < totalPages;
    let hasPreviousPage = page > 1;

    return (
        <>
            <div className="mt-4 flex w-screen items-center justify-center">
                <Search />
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className="lg:flex lg:w-1/4 lg:p-4">
                    <Filter />
                </div>
                <div className="mx-auto flex w-screen justify-center md:mt-5 lg:w-3/4">
                    <div className="grid max-w-md gap-4 p-4 pt-0 md:max-w-3xl md:grid-cols-2 md:pt-4 lg:max-w-4xl xl:max-w-7xl 2xl:grid-cols-3">
                        {cars.map((car) => (
                            <Link
                                href={"/car/" + car.id}
                                key={car.id}
                                className="grid transform grid-cols-1 rounded-2xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl"
                            >
                                <CarTile
                                    imageUrl={car.imageUrl}
                                    brand={car.brand}
                                    name={car.name}
                                />
                                <div className="flex gap-4 rounded-b-2xl border-t p-2 pl-4">
                                    <h1 className="flex items-center gap-1 text-lg font-semibold text-gray-600">
                                        <IconUser
                                            size={16}
                                            aria-label="person"
                                        />
                                        {car.passengers}
                                    </h1>
                                    <h1 className="flex items-center gap-1 text-lg font-semibold text-gray-600">
                                        <IconManualGearbox
                                            size={16}
                                            aria-label="gearbox"
                                        />
                                        {car.transmission}
                                    </h1>
                                    <h1 className="flex grow items-center gap-1 text-lg font-semibold text-gray-600">
                                        <IconLuggage
                                            size={16}
                                            aria-label="luggage"
                                        />
                                        {car.capacity}
                                    </h1>
                                    <div className="flex items-end">
                                        <h1 className="font-mono text-2xl font-bold text-indigo-950">
                                            ${car.price}
                                        </h1>
                                        <h1 className="text-lg font-semibold text-gray-600">
                                            /day
                                        </h1>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
