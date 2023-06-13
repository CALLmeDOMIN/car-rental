"use client";

// import { getImage } from "@/api/clientFetch";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import { useEffect, useState } from "react";
// import useMeasure from "react-use-measure";

function SlideshowElement({
    index,
    current,
    children,
    className,
}: {
    index: number;
    current: number;
    children: React.ReactNode;
    className?: string;
}) {
    const getPercentage = () => ({ x: 50 * (index - current * 3) + "%" });
    const [springs, api] = useSpring(getPercentage);

    useEffect(() => {
        api.start({ to: getPercentage() });
    }, [index, current]);

    return (
        <animated.div className={className} style={springs}>
            {children}
        </animated.div>
    );
}

type Photo = {
    id: string;
    imageUrl: string;
};

export default function Slideshow({ photos }: { photos: Photo[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const clump = (val: number) => {
        if (val < 0) return 0;
        if (val > photos.length - 3) return 0;
        return val;
    };

    return (
        <div className="relative h-full xl:pl-20">
            <div className="flex h-full items-center gap-2 overflow-hidden">
                {photos.map((photo, index) => (
                    <SlideshowElement
                        key={photo.id}
                        index={index}
                        current={clump(currentIndex)}
                    >
                        <Image
                            src={photo.imageUrl}
                            alt="image"
                            width={400}
                            height={200}
                            className="aspect-video max-w-sm transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105
                            hover:shadow-2xl"
                        />
                    </SlideshowElement>
                ))}{" "}
            </div>

            <button
                className="absolute right-0"
                onClick={() => {
                    if (currentIndex > photos.length - 3) setCurrentIndex(1);
                    else setCurrentIndex(currentIndex + 1);
                }}
            >
                Next
            </button>

            <button
                className={
                    currentIndex ? "absolute left-0" : "absolute text-gray-500"
                }
                onClick={() => {
                    if (currentIndex) setCurrentIndex(currentIndex - 1);
                }}
            >
                prev
            </button>
        </div>
    );
}
