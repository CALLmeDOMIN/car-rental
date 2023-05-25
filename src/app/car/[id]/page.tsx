import { PrismaClient } from "@prisma/client";
import Image from "next/image";
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

export default async function Page({ params }: { params: Params }) {
    const id = Number(params.id);
    const data = await prisma.car.findUnique({ where: { id } });
    const imageSrc = "/" + data?.id + ".jpg";

    const gridStyle = "rounded-xl text-black p-4 shadow-lg";
    const gridh1Style = "text-xl font-bold pl-1";
    const gridpStyle = "text-sm font-bold pl-4";

    return (
        <main>
            <div className="m-auto mt-20 flex max-w-7xl flex-row items-end space-x-4">
                <h1 className="text-5xl font-bold">{data?.name}</h1>
                <h1 className="text-5xl font-bold">{data?.brand}</h1>
            </div>
            <div className="m-auto h-screen max-w-7xl rounded-xl bg-white p-4">
                <div className="flex h-2/3 max-h-80 items-center justify-evenly">
                    <div className="grid grid-cols-3 gap-4">
                        <div className={gridStyle}>
                            <IconBusinessplan />
                            <h1 className={gridh1Style}> Price </h1>
                            <p className={gridpStyle}> ${data?.price} </p>
                        </div>
                        <div className={gridStyle}>
                            <IconCalendarUp />
                            <h1 className={gridh1Style}> Production year </h1>
                            <p className={gridpStyle}> {data?.year} </p>
                        </div>
                        <div className={gridStyle}>
                            <IconManualGearbox />
                            <h1 className={gridh1Style}> Transmission </h1>
                            <p className={gridpStyle}> Automatic </p>
                        </div>
                        <div className={gridStyle}>
                            <h1 className={gridh1Style}>
                                <IconRoad />
                                Distance limit
                            </h1>
                            <p className={gridpStyle}> none </p>
                        </div>
                        <div className={gridStyle}>
                            <IconUser />
                            <h1 className={gridh1Style}>Passengers</h1>
                            <p className={gridpStyle}> 4 </p>
                        </div>
                        <div className={gridStyle}>
                            <IconLuggage />
                            <h1 className={gridh1Style}>Capacity</h1>
                            <p className={gridpStyle}> 4 bags </p>
                        </div>
                    </div>
                    <div className="p-2 shadow-xl rounded-xl">
                        <Image
                            src={imageSrc}
                            width={400}
                            height={200}
                            alt="carimg"
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
