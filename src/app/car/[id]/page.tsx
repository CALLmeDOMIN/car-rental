import Image from "next/image";
import Error404 from "@/app/components/error404";
import {
    IconBookmarkPlus,
    IconBrandToyota,
    IconEngine,
    IconGasStation,
    IconHammer,
    IconHorseToy,
    IconInnerShadowRight,
    IconManualGearbox,
} from "@tabler/icons-react";
import { getCertainCars } from "@/app/api/prisma";
import { IconBrandSpeedtest } from "@tabler/icons-react";
import { IconPlaystationCircle } from "@tabler/icons-react";
import Slideshow, { Photo } from "@/app/components/slideshow";

type Params = {
    id: number;
};

export default async function Page({ params }: { params: Params }) {
    const car = (await getCertainCars({ id: Number(params.id) }))[0];

    if (!car) return <Error404 text="car" />;

    const photos: Photo[] = [];
    for (let i = 0; i < 6; ++i)
        photos.push({ id: i.toString(), imageUrl: car.imageUrl });

    return (
        <main className="mt-4 flex justify-center bg-gray-50">
            {/* main grid */}
            <div className="grid max-w-7xl grid-cols-3 gap-6 rounded-xl p-4">
                <div className="row-span-6 h-screen rounded-xl   bg-white shadow-xl">
                    123
                </div>
                <div className="col-span-2 row-span-1 grid grid-cols-2 gap-4">
                    <div className="flex max-w-md flex-col rounded-2xl bg-white p-4 pt-0 shadow-md">
                        <div className="flex items-center gap-2 p-2">
                            <div className="mr-2 aspect-square">
                                <IconBrandToyota
                                    className="h-12 w-auto"
                                    aria-label="brand-logo"
                                />
                            </div>
                            <div className="flex grow flex-col">
                                <h1 className="text-xl font-semibold">
                                    {car.brand}
                                </h1>
                                <h1 className="font-semibold text-gray-600">
                                    {car.name}
                                </h1>
                            </div>
                            <div className="aspect-square">
                                <IconBookmarkPlus aria-label="bookmark" />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 grid-rows-1">
                            <Image
                                src={car.imageUrl}
                                width={1920}
                                height={1080}
                                alt="car image"
                                className="col-span-3 aspect-video h-auto max-w-[280px] grow rounded-3xl object-cover object-center shadow-2xl"
                            />
                            <div className="flex flex-col items-end justify-end gap-1 pr-2 text-white">
                                <div
                                    aria-label="color 1"
                                    className="aspect-square w-6 rounded-full border bg-white text-black shadow-2xl"
                                ></div>
                                <div
                                    aria-label="color 2"
                                    className="aspect-square w-6 rounded-full bg-emerald-600 shadow-2xl"
                                ></div>
                                <div
                                    aria-label="color 3"
                                    className="aspect-square w-6 rounded-full bg-sky-500 shadow-2xl"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl bg-white p-2 shadow-md">
                        123
                    </div>
                </div>
                <div className="col-span-2 row-span-1  my-4">
                    <h1 className="py-5 text-3xl font-bold">
                        Vehicle Information
                    </h1>
                    <p className="font-semibold text-gray-500">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Reiciendis reprehenderit labore eos repudiandae
                        rerum commodi, eligendi culpa iusto facere laborum
                        fugiat sunt consequuntur at libero quidem obcaecati ad
                        saepe nihil?
                    </p>
                </div>
                <div className="col-span-2 row-span-1 grid grid-cols-4 grid-rows-1  gap-4">
                    <div className="flex transform flex-col items-center rounded-xl bg-white p-2 shadow-lg shadow-amber-700/30 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
                        <div className="aspect-square rounded-full bg-amber-600/20 p-2 text-amber-700 shadow-md shadow-amber-700/30">
                            <IconEngine
                                aria-label="engine"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="font-bold uppercase">number unit</p>
                        <h1 className="text-sm font-bold uppercase  text-gray-500">
                            engine capacity
                        </h1>
                    </div>
                    <div className="flex transform flex-col items-center rounded-xl bg-white p-2 shadow-lg shadow-rose-700/30 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
                        <div className="aspect-square rounded-full bg-rose-600/20 p-2 text-rose-700 shadow-md shadow-rose-700/30">
                            <IconHorseToy
                                aria-label="horse"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="font-bold uppercase">number unit</p>
                        <h1 className="text-sm font-bold uppercase  text-gray-500">
                            horsepower
                        </h1>
                    </div>
                    <div className="flex transform flex-col items-center rounded-xl bg-white p-2 shadow-lg shadow-indigo-700/30 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
                        <div className="aspect-square rounded-full bg-indigo-600/20 p-2 text-indigo-700 shadow-md shadow-indigo-700/30">
                            <IconBrandSpeedtest
                                aria-label="speedometer"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="font-bold uppercase">number unit</p>
                        <h1 className="text-sm font-bold uppercase text-gray-500">
                            top speed
                        </h1>
                    </div>
                    <div className="flex transform flex-col items-center rounded-xl bg-white p-2 shadow-lg shadow-emerald-700/30 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
                        <div className="aspect-square rounded-full bg-emerald-600/20 p-2 text-emerald-700 shadow-md shadow-emerald-700/30">
                            <IconManualGearbox
                                aria-label="gearbox"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="font-bold uppercase">number unit</p>
                        <h1 className="text-sm font-bold uppercase text-gray-500">
                            transmission
                        </h1>
                    </div>
                </div>
                <div className="col-span-2 row-span-1 grid grid-cols-2 gap-4">
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
                                <h1 className="grow">New Grip Tires</h1>
                                <h1 className="font-semibold text-green-400"></h1>
                            </li>
                            <li className="flex gap-1">
                                <IconGasStation
                                    aria-label="fuel"
                                    className="text-rose-700"
                                />
                                <h1 className="grow">
                                    Average Fuel Consumption
                                </h1>
                                <h1 className="font-semibold text-green-400">
                                    8 km/l
                                </h1>
                            </li>
                            <li className="flex gap-1">
                                <IconInnerShadowRight
                                    aria-label="fuel"
                                    className="text-rose-700"
                                />
                                <h1 className="grow">New Ceramic Breaks</h1>
                                <h1 className="font-semibold text-green-400"></h1>
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
                                <h1 className="grow">
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
                                <h1 className="grow">
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
                                <h1 className="grow">
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
