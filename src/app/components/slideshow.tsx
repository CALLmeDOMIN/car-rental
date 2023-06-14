"use client";

// import { getImage } from "@/api/clientFetch";
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
// import useMeasure from "react-use-measure";

function SlideshowElement({
    index,
    current,
    children,
}: {
    index: number;
    current: number;
    children: React.ReactNode;
    className?: string;
}) {
    const getPercentage = () => ({
        x: 100 * (index - current) + "%",
        y: "5%",
    });
    const [springs, api] = useSpring(getPercentage);

    useEffect(() => {
        api.start({ to: getPercentage() });
    }, [index, current]);

    return (
        <animated.div className={"absolute left-0"} style={springs}>
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

    return (
        <div className="relative">
            <div className="relative min-h-[300px] overflow-x-hidden px-2 md:mx-5 md:h-full md:min-h-[400px] lg:mx-10">
                <span className="">
                    {photos.map((photo, index) => (
                        <SlideshowElement
                            key={photo.id}
                            index={index}
                            current={currentIndex}
                        >
                            <Link href={`/car/${photo.id}`}>
                                <div className="mx-2 flex max-w-[250px] transform flex-col space-y-2 rounded-xl p-2 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 md:mx-auto md:ml-5 md:max-w-none xl:ml-5 2xl:ml-10">
                                    <Image
                                        src={photo.imageUrl}
                                        alt="image"
                                        width={400}
                                        height={200}
                                        className={
                                            "aspect-video rounded-3xl object-cover object-center"
                                        }
                                    />
                                    <h1 className="text-xl font-bold">
                                        {photo.name}
                                    </h1>
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
                                            <h1 className="text-white">
                                                {photo.bags}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SlideshowElement>
                    ))}{" "}
                </span>
            </div>
            <button
                className="absolute bottom-3 left-1/2 md:bottom-[50%] md:left-full"
                onClick={() => {
                    if (currentIndex > photos.length - 2) setCurrentIndex(0);
                    else setCurrentIndex(currentIndex + 1);
                }}
            >
                <IconCircleChevronRight />
            </button>
            <button
                className={
                    currentIndex
                        ? "absolute bottom-3 right-1/2 cursor-pointer md:bottom-[50%] md:left-0"
                        : "absolute bottom-3 right-1/2 cursor-default text-gray-500 md:bottom-[50%] md:left-0"
                }
                onClick={() => {
                    if (currentIndex) setCurrentIndex(currentIndex - 1);
                }}
            >
                <IconCircleChevronLeft />
            </button>
        </div>
    );
}
