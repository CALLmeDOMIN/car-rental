import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Error404 from "@/app/components/error404";
import {
    IconBusinessplan,
    IconCalendarUp,
    IconLuggage,
    IconManualGearbox,
    IconRoad,
    IconUser,
} from "@tabler/icons-react";

const prisma = new PrismaClient();

type Params = {
    id: number;
};

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
    imageUrl: string;
}

export default async function Page({ params }: { params: Params }) {
    const idN = Number(params.id);
    const data = (await prisma.car.findUnique({
        where: { id: idN },
    })) as Car | null;

    if (!data) return <Error404 text="car" />;

    const gridStyle =
        "rounded-xl p-4 shadow-lg transition duration-200 ease-in-out hover:cursor-pointer hover:shadow-2xl";
    const gridh1Style = "text-xl font-bold pl-1";
    const gridpStyle = "text-sm font-bold pl-4";

    return (
        <main>
            <div className="mx-auto flex max-w-7xl justify-center gap-2 p-4 pb-0 pt-8 md:justify-normal">
                <h1 className="font-bold md:text-5xl">{data.name}</h1>
                <h1 className="font-bold md:text-5xl">{data.brand}</h1>
            </div>
            <div className="mx-auto max-w-7xl p-4 md:rounded-xl md:shadow-xl">
                <div className="flex flex-col items-center justify-evenly space-y-6 md:flex-row">
                    <div className="block rounded-xl p-2 shadow-xl md:hidden">
                        <Image
                            src={data.imageUrl}
                            width="400"
                            height="200"
                            alt="car image"
                            className="aspect-video rounded-xl object-cover shadow-xl"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                        <div className={gridStyle}>
                            <IconBusinessplan
                                className="text-red-600"
                                aria-label="price"
                            />
                            <h1 className={gridh1Style}> Price </h1>
                            <p className={gridpStyle}> ${data.price} </p>
                        </div>
                        <div className={gridStyle}>
                            <IconCalendarUp
                                className="text-red-600"
                                aria-label="date"
                            />
                            <h1 className={gridh1Style}> Production </h1>
                            <p className={gridpStyle}> {data.year} </p>
                        </div>
                        <div className={gridStyle}>
                            <IconManualGearbox
                                className="text-red-600"
                                aria-label="transmission"
                            />
                            <h1 className={gridh1Style}> Transmission </h1>
                            <p className={gridpStyle}> {data.transmission} </p>
                        </div>
                        <div className={gridStyle}>
                            <IconRoad
                                className="text-red-600"
                                aria-label="distance"
                            />
                            <h1 className={gridh1Style}>Distance</h1>
                            <p className={gridpStyle}>
                                {data.distance > 0
                                    ? data.distance.toString() + " km"
                                    : "none"}
                            </p>
                        </div>
                        <div className={gridStyle}>
                            <IconUser
                                className="text-red-600"
                                aria-label="people"
                            />
                            <h1 className={gridh1Style}>Passengers</h1>
                            <p className={gridpStyle}> {data.passengers} </p>
                        </div>
                        <div className={gridStyle}>
                            <IconLuggage
                                className="text-red-600"
                                aria-label="bags"
                            />
                            <h1 className={gridh1Style}>Capacity</h1>
                            <p className={gridpStyle}>
                                {data.capacity.toString() + " bags"}
                            </p>
                        </div>
                    </div>
                    <div className="hidden rounded-xl p-2 shadow-xl md:block">
                        <Image
                            src={data.imageUrl}
                            width="400"
                            height="200"
                            alt="carimg"
                            className="aspect-video rounded-xl object-cover shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
