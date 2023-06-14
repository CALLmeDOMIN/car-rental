"use client";

import { animated, useSpring } from "@react-spring/web";
import {
    IconCircleChevronLeft,
    IconCircleChevronRight,
    IconLuggage,
    IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function SlideshowElement({
    current,
    children,
    className,
}: {
    current: number;
    children: React.ReactNode;
    className?: string;
}) {
    const getPercentage = () => ({
        x: -100 * current + "%",
    });
    const [springs, api] = useSpring(getPercentage);

    useEffect(() => {
        api.start({ to: getPercentage() });
    }, [current]);

    return (
        <animated.div className={className} style={springs}>
            {children}
        </animated.div>
    );
}

type Photo = {
    id: string;
    imageUrl: string;
    people: number;
    bags: number;
    name: string;
};

export default function Slideshow({ photos }: { photos: Photo[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const clamp = (index: number) => {
        if (index < 0) return 0;
        if (index >= photos.length - cols) return photos.length - cols;
        return index;
    };

    const [cols, setCols] = useState(1);
    const updateCols = () => {
        if (window.innerWidth < 768) setCols(1);
        else if (window.innerWidth < 1024) setCols(2);
        else if (window.innerWidth < 1280) setCols(3);
        else setCols(4);
    };
    useEffect(() => {
        updateCols();
        window?.addEventListener("resize", updateCols);
        return () => window?.removeEventListener("resize", updateCols);
    }, []);

    return (
        <div
            className="relative overflow-hidden pb-12 [--cols:1] md:[--cols:2] lg:[--cols:3] xl:[--cols:4]"
            style={
                {
                    "--total": photos.length,
                } as React.CSSProperties
            }
        >
            <div className="flex">
                {photos.map((photo) => (
                    <SlideshowElement
                        key={photo.id}
                        current={currentIndex}
                        className="h-full w-[calc(100%_/_var(--cols))] shrink-0"
                    >
                        <Link
                            href={`/car/${photo.id}`}
                            className="flex transform flex-col gap-2 rounded-xl p-5 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105"
                        >
                            <Image
                                src={photo.imageUrl}
                                alt="image"
                                width={1920}
                                height={1080}
                                className={
                                    "aspect-video h-auto w-auto rounded-3xl object-cover object-center"
                                }
                            />
                            <h1 className="text-xl font-bold">{photo.name}</h1>
                            <div className="flex justify-start gap-2">
                                <div className="flex items-center gap-1 rounded-md bg-black p-1 px-1 pr-2">
                                    <IconUser
                                        className="text-white"
                                        size={20}
                                    />
                                    <h1 className="text-white">
                                        {photo.people}
                                    </h1>
                                </div>
                                <div className="flex items-center gap-1 rounded-md bg-black p-1 px-1 pr-2">
                                    <IconLuggage
                                        className="text-white"
                                        size={20}
                                    />
                                    <h1 className="text-white">{photo.bags}</h1>
                                </div>
                            </div>
                        </Link>
                    </SlideshowElement>
                ))}
            </div>
            <button
                className={
                    "absolute bottom-0 right-1/2 z-50 " +
                    (currentIndex
                        ? "cursor-pointer"
                        : "cursor-default text-gray-500")
                }
                onClick={() => setCurrentIndex(clamp(currentIndex - 1))}
            >
                <IconCircleChevronLeft />
            </button>
            <button
                className={
                    "absolute bottom-0 left-1/2 z-50 " +
                    (currentIndex != photos.length - cols
                        ? "cursor-pointer"
                        : "cursor-default text-gray-500")
                }
                onClick={() => setCurrentIndex(clamp(currentIndex + 1))}
            >
                <IconCircleChevronRight />
            </button>
        </div>
    );
}
