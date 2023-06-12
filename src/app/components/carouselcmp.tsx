"use client";
import Image from "next/image";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

// @ts-ignore
const handleDragStart = (e) => e.preventDefault();

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

export default function Gallery(params: Params) {
    console.log(params);
    const items: any[] = params.cars.map((car) => {
        <Image
            key={car.id}
            src={car.imageUrl}
            onDragStart={handleDragStart}
            role="presentation"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            alt="car-img"
        />;
    });
    console.log(items);
    items.push(
        <Image
            key={params.cars[0].id}
            src={params.cars[0].imageUrl}
            onDragStart={handleDragStart}
            role="presentation"
            // className="h-full w-full object-cover"
            width="1000"
            height="600"
            alt="car-img"
        />
    );
    return (
        <>
            <AliceCarousel mouseTracking items={items} />
        </>
    );
}
