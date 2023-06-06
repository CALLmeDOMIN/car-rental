import Image from "next/image";
import Link from "next/link";
import { IconSquareChevronRight } from "@tabler/icons-react";
import { PrismaClient } from "@prisma/client";
import MobileCarousel from "./components/mobileCarousel";

const prisma = new PrismaClient();

export default async function Home() {
    const tilesArr = [
        ["Trust", "and Reliability"],
        ["Competitive", "Prices"],
        ["Convenient", "Booking"],
        ["Flexibility", "and Customization"],
    ];

    const cars = await prisma.car.findMany();

    if (!cars) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="mt-4 w-full bg-white">
                <div className="relative isolate overflow-hidden py-24 sm:py-32">
                    <Image
                        src={"/bg.jpg"}
                        alt=""
                        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
                        width={1920}
                        height={1080}
                    />
                    <div
                        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                        aria-hidden="true"
                    >
                        <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-30"></div>
                    </div>
                    <div
                        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                        aria-hidden="true"
                    >
                        <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-30"></div>
                    </div>
                    <div className="flex">
                        <div className="rounded-r-md bg-neutral-900/[45%]">
                            <h2 className="p-2 pr-4 text-3xl font-bold tracking-tight text-white sm:text-6xl">
                                Welcome to car-rental
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-center">
                <div className="mx-auto w-screen max-w-2xl rounded-md  px-2 lg:mx-8">
                    <p className="text-center text-lg leading-8 text-black">
                        Here, we understand the importance of reliable
                        transportation when it comes to exploring new
                        destinations or simply getting around town. Whether
                        you&apos;re a seasoned traveler or a local in need of a
                        temporary set of wheels, we&apos;ve got you covered.
                    </p>
                </div>
            </div>
            <div className="flex justify-center p-4">
                <Link href="/cars">
                    <button
                        type="button"
                        className="mb-2 mr-2 flex rounded-lg border-2 border-red-700 py-2.5 pl-5 pr-3 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                    >
                        Rent a car
                        <IconSquareChevronRight className="ml-2" />
                    </button>
                </Link>
            </div>
            <MobileCarousel cars={cars} />
        </>
    );
    {
        /* 
                
                   <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none lg:px-8">
                        <div className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                            {tilesArr.map((tile) => (
                                <div className="flex flex-col-reverse bg-neutral-900/95 md:rounded-md md:p-4">
                                    <div className="px-6 text-base leading-7 text-gray-300">
                                        {tile[1]}
                                    </div>
                                    <div className="px-6 text-2xl font-bold leading-9 tracking-tight text-white">
                                        {tile[0]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */
    }
}
1;
