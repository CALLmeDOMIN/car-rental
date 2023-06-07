"use client";

import {
    IconArrowBigLeft,
    IconArrowBigRight,
    IconLuggage,
    IconManualGearbox,
    IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

interface Car {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    transmission: string;
    passengers: number;
    capacity: number;
}

type Params = {
    cars: Car[];
};

export default function MobileCarousel(params: Params) {
    const [currId, setCurrId] = useState(0);

    return (
        <div className="shadow-xls flex w-screen flex-col justify-center bg-white">
            <h1 className="w-screen text-center text-3xl font-semibold text-red-700 shadow-xl">
                Hot offers
            </h1>
            <div className="flex items-center justify-evenly">
                <IconArrowBigLeft
                    className="w-10 rounded-xl border border-red-700 text-red-700"
                    onClick={() => {
                        if (currId > 0) setCurrId(currId - 1);
                    }}
                />
                <div>
                    <div className="m-4 flex rounded-xl bg-white p-4 shadow-xl">
                        <Image
                            src={params.cars[currId].imageUrl}
                            width="150"
                            height="10"
                            alt="car-image"
                            className="aspect-video rounded-xl object-cover shadow-xl"
                        ></Image>
                        <div className="flex flex-col pl-4">
                            <h3 className="text-center">
                                <span className="text-red-700">$</span>
                                {params.cars[currId].price}
                            </h3>
                            <div className="flex items-center justify-evenly">
                                <IconManualGearbox
                                    size="16"
                                    className="text-red-700"
                                />
                                <h3>{params.cars[currId].transmission[0]}</h3>
                            </div>
                            <div className="flex items-center justify-evenly">
                                <IconUser size="16" className="text-red-700" />
                                <h3>{params.cars[currId].passengers}</h3>
                            </div>
                            <div className="flex items-center justify-evenly">
                                <IconLuggage
                                    size="16"
                                    className="text-red-700"
                                />
                                <h3>{params.cars[currId].capacity}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <IconArrowBigRight
                    className="w-10 rounded-xl border border-red-700 text-red-700"
                    onClick={() => {
                        if (currId < params.cars.length - 1)
                            setCurrId(currId + 1);
                    }}
                />
            </div>
        </div>
    );
}
