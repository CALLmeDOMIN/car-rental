"use client";

import { IconArrowBigLeft, IconArrowBigRight } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

type Car = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
};

type Params = {
    cars: Car[];
};

export default function MobileCarousel(params: Params) {
    const [currId, setCurrId] = useState(0);
    console.log(currId, params.cars.length);
    return (
        <div className="flex w-screen flex-col justify-center bg-red-700">
            <h1 className="w-screen text-3xl text-white">Hot offers</h1>
            <div className="flex">
                <IconArrowBigLeft
                    className="w-1/6 bg-white"
                    onClick={() => {
                        if (currId > 0) setCurrId(currId - 1);
                    }}
                />
                <div className="mx-auto w-4/6 bg-blue-600">
                    <div className="bg-white">
                        <Image
                            src={params.cars[currId].imageUrl}
                            width="100"
                            height="50"
                            alt="car-image"
                        ></Image>
                    </div>
                </div>
                <IconArrowBigRight
                    className="w-1/6 bg-white"
                    onClick={() => {
                        if (currId < params.cars.length - 1)
                            setCurrId(currId + 1);
                    }}
                />
            </div>
        </div>
    );
}
