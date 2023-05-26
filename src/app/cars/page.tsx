import { PrismaClient } from "@prisma/client";
import {
    IconBusinessplan,
    IconLuggage,
    IconManualGearbox,
    IconUser,
} from "@tabler/icons-react";
import Image from "next/image";

const prisma = new PrismaClient();

type Car = {
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
};

export default async function Page() {
    const data = (await prisma.car.findMany()) as Car[];

    const gridh1Style = "font-bold flex items-center justify-between gap-2";
    return (
        <main className="h-screen w-screen bg-white">
            <div className="max-w-7xl rounded-xl bg-white shadow-lg">
                <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
                    {data.map((car) => (
                        <div
                            key={car.id}
                            className="m-auto flex max-w-xl rounded-xl p-4 text-black shadow-lg"
                        >
                            <div className="w-2/3">
                                <div className="flex flex-col">
                                    <Image
                                        src={"/" + car.id.toString() + ".jpg"}
                                        width={200}
                                        height={10}
                                        alt="car image"
                                        className="aspect-video rounded-xl object-cover shadow-xl"
                                    />
                                    <p>
                                        {car.name} {car.brand}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className={gridh1Style}>
                                    <IconBusinessplan /> ${car.price}
                                </h1>
                                <h1 className={gridh1Style}>
                                    <IconManualGearbox /> {car.transmission}
                                </h1>
                                <h1 className={gridh1Style}>
                                    <IconUser /> {car.passengers}
                                </h1>
                                <h1 className={gridh1Style}>
                                    <IconLuggage /> {car.capacity}
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
