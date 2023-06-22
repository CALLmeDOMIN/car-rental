import {
    IconBookmarkPlus,
    IconEngine,
    IconGasStation,
    IconHammer,
    IconHorseToy,
    IconInnerShadowRight,
    IconManualGearbox,
} from "@tabler/icons-react";
import { IconBrandSpeedtest } from "@tabler/icons-react";
import { IconPlaystationCircle } from "@tabler/icons-react";
import Slideshow, { Photo } from "@/app/components/slideshow";
import { CarTile } from "@/app/components/carTile";
import { prisma } from "@/../lib/prisma";
import Error from "@/app/components/errorSite";

type Params = {
    id: number;
};

export default async function Page({ params }: { params: Params }) {
    const car = await prisma.car.findUnique({
        where: {
            id: Number(params.id),
        },
        select: {
            id: true,
            name: true,
            brand: true,
            engineCapacity: true,
            horsepower: true,
            topSpeed: true,
            transmission: true,
            description: true,
            imageUrl: true,
        },
    });

    if (!car) return <Error code={404} />;

    const photos: Photo[] = [];
    for (let i = 0; i < 6; ++i)
        photos.push({ id: i.toString(), imageUrl: car.imageUrl });

    return (
        <main className="mt-4 flex justify-center bg-gray-50">
            {/* main grid */}
            <div className="grid max-w-7xl gap-6 rounded-xl p-4 md:grid-cols-3">
                <div className="row-span-6 hidden h-screen rounded-xl bg-white shadow-xl md:block">
                    TODO
                </div>
                <div className="col-span-2 row-span-1 flex flex-col gap-8 md:flex-row">
                    <CarTile
                        imageUrl={car.imageUrl}
                        brand={car.brand}
                        name={car.name}
                        className="mx-auto gap-1 md:mx-0 md:justify-normal"
                    />
                    <div className="mx-auto ml-2 rounded-2xl bg-white p-2 px-4 shadow-md md:mx-0">
                        <h1 className="pb-2 text-3xl font-bold">Owner Info</h1>
                        <p className="font-semibold text-gray-500">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Temporibus aut animi veritatis vero in qui.
                        </p>
                    </div>
                </div>
                <div className="col-span-2 row-span-1 my-4 px-2">
                    <h1 className="py-5 text-3xl font-bold">
                        Vehicle Information
                    </h1>
                    <p className="font-semibold text-gray-500">
                        {car.description}
                    </p>
                </div>
                <div className="col-span-2 row-span-1 grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4  md:grid-rows-1">
                    <div className="flex transform flex-col items-center rounded-xl bg-white p-2 shadow-lg shadow-amber-700/30 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
                        <div className="aspect-square rounded-full bg-amber-600/20 p-2 text-amber-700 shadow-sm shadow-amber-700">
                            <IconEngine
                                aria-label="engine"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="font-bold uppercase">
                            {car.engineCapacity.toString()[
                                car.engineCapacity.toString().length - 2
                            ] !== "."
                                ? car.engineCapacity + ".0l"
                                : car.engineCapacity + "l"}
                        </p>
                        <h1 className="text-sm font-bold uppercase  text-gray-500">
                            engine capacity
                        </h1>
                    </div>
                    <div className="flex transform flex-col items-center rounded-xl bg-white p-2 shadow-lg shadow-rose-700/30 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
                        <div className="aspect-square rounded-full bg-rose-600/20 p-2 text-rose-700 shadow-sm shadow-rose-700">
                            <IconHorseToy
                                aria-label="horse"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="font-bold uppercase">{car.horsepower}</p>
                        <h1 className="text-sm font-bold uppercase  text-gray-500">
                            horsepower
                        </h1>
                    </div>
                    <div className="flex transform flex-col items-center rounded-xl bg-white p-2 shadow-lg shadow-indigo-700/30 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
                        <div className="aspect-square rounded-full bg-indigo-600/20 p-2 text-indigo-700 shadow-sm shadow-indigo-700">
                            <IconBrandSpeedtest
                                aria-label="speedometer"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="font-bold ">{car.topSpeed} km/h</p>
                        <h1 className="text-sm font-bold uppercase text-gray-500">
                            top speed
                        </h1>
                    </div>
                    <div className="flex transform flex-col items-center rounded-xl bg-white p-2 shadow-lg shadow-emerald-700/30 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
                        <div className="aspect-square rounded-full bg-emerald-600/20 p-2 text-emerald-700 shadow-sm shadow-emerald-700">
                            <IconManualGearbox
                                aria-label="gearbox"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="font-bold uppercase">
                            {car.transmission}
                        </p>
                        <h1 className="text-sm font-bold uppercase text-gray-500">
                            transmission
                        </h1>
                    </div>
                </div>
                <div className="col-span-2 row-span-1 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-white p-3 py-1.5 shadow-md">
                        <h1 className="border-b pb-3 pt-5 text-2xl font-bold capitalize">
                            vehicle condition
                        </h1>
                        <ul className="space-y-2 p-2 pb-5">
                            <li className="flex gap-1">
                                <IconPlaystationCircle
                                    aria-label="circle"
                                    className="text-rose-700"
                                />
                                <h1 className="grow font-semibold text-gray-800">
                                    New Grip Tires
                                </h1>
                                <h1 className="text-green-400 font-semibold"></h1>
                            </li>
                            <li className="flex gap-1">
                                <IconGasStation
                                    aria-label="fuel"
                                    className="text-rose-700"
                                />
                                <h1 className="grow font-semibold text-gray-800">
                                    Average Fuel Consumption
                                </h1>
                                <h1 className="text-green-400 font-semibold">
                                    8 km/l
                                </h1>
                            </li>
                            <li className="flex gap-1">
                                <IconInnerShadowRight
                                    aria-label="fuel"
                                    className="text-rose-700"
                                />
                                <h1 className="grow font-semibold text-gray-800">
                                    New Ceramic Breaks
                                </h1>
                                <h1 className="text-green-400 font-semibold"></h1>
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-xl bg-white p-3 py-1.5 shadow-md">
                        <h1 className="border-b pb-3 pt-5 text-2xl font-bold capitalize">
                            Recent maintenance
                        </h1>
                        <ul className="space-y-2 p-2 pb-5">
                            <li className="flex gap-1">
                                <IconHammer
                                    aria-label="hammer"
                                    className="text-emerald-700"
                                />
                                <h1 className="grow font-semibold text-gray-800">
                                    Lorem ipsum dolor sit amet.
                                </h1>
                                <h1 className="font-semibold text-gray-400">
                                    2 days ago
                                </h1>
                            </li>
                            <li className="flex gap-1">
                                <IconHammer
                                    aria-label="hammer"
                                    className="text-emerald-700"
                                />
                                <h1 className="grow font-semibold text-gray-800">
                                    Lorem ipsum dolor sit amet.
                                </h1>
                                <h1 className="font-semibold text-gray-400">
                                    1 day ago
                                </h1>
                            </li>
                            <li className="flex gap-1">
                                <IconHammer
                                    aria-label="hammer"
                                    className="text-emerald-700"
                                />
                                <h1 className="grow font-semibold text-gray-800">
                                    Lorem ipsum dolor sit amet.
                                </h1>
                                <h1 className="font-semibold text-gray-400">
                                    a week ago
                                </h1>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-2 row-span-1 rounded-xl bg-white  shadow-xl">
                    <h1 className="border-b pb-3 pl-5 pt-3 text-2xl font-bold capitalize">
                        Images
                    </h1>
                    <div className="pt-3">
                        <Slideshow photos={photos} />
                    </div>
                </div>
            </div>
            {/* end of main grid */}
        </main>
    );
}
