import { IconBookmarkPlus } from "@tabler/icons-react";
import Image from "next/image";
import { logos } from "../public/assets";

export const CarTile = ({
    imageUrl,
    brand,
    name,
    className,
}: {
    imageUrl: string;
    brand: string;
    name: string;
    className?: string;
}) => {
    return (
        <div className={"flex flex-col p-4 pt-0 " + className}>
            <div className="flex items-center gap-2 p-2">
                <div className="mr-2 flex aspect-square items-center">
                    {/* {logos[brand.toLowerCase()]} */}
                </div>
                <div className="flex grow flex-col">
                    <h1 className="text-xl font-semibold text-text">{brand}</h1>
                    <h1 className="font-semibold text-gray-500">{name}</h1>
                </div>
                <div className="aspect-square text-text">
                    <IconBookmarkPlus aria-label="bookmark" />
                </div>
            </div>
            <div className="flex gap-3">
                <div className="relative min-h-[150px] min-w-[280px] grow">
                    <Image
                        src={imageUrl}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px): 50vw, 33vw"
                        alt="car image"
                        className="aspect-video rounded-3xl object-cover object-center shadow-lg"
                    />
                </div>
                <div className="flex flex-col items-end justify-end gap-1">
                    <div className="aspect-square h-6 rounded-full border bg-white shadow-md"></div>
                    <div className="bg-indigo-950 aspect-square h-6 rounded-full shadow-md"></div>
                    <div className="bg-yellow-400 aspect-square h-6 rounded-full shadow-md"></div>
                </div>
            </div>
        </div>
    );
};
