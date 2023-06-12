import Image from "next/image";
import Link from "next/link";
import { IconSquareChevronRight } from "@tabler/icons-react";
import { PrismaClient } from "@prisma/client";
import Gallery from "./components/carouselcmp";
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
            <div className="relative mt-4 w-screen bg-white p-8">
                <div className="absolute top-[10%] flex w-full flex-col items-center">
                    <h2 className="mr-8 text-5xl font-bold">
                        Welcome to car-rental
                    </h2>
                    <p className="mr-8">
                        {" "}
                        We offer professional car rental in our range of high
                        end vehicles
                    </p>
                </div>
                <Link
                    href="/cars"
                    className="absolute bottom-[10%] flex w-full justify-center"
                >
                    <button
                        type="button"
                        className="mb-2 mr-2 flex rounded-lg bg-black py-2.5 pl-5 pr-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                    >
                        Car catalog
                        <IconSquareChevronRight className="ml-2" />
                    </button>
                </Link>
                <div className="absolute bottom-[11.5%] right-[5%] flex flex-col space-y-4 rounded-xl bg-white p-4">
                    <h3>header</h3>
                    <input
                        className="border"
                        type="text"
                        name="adress1"
                        id="adress1"
                    />
                    <input
                        className="border"
                        type="text"
                        name="adress2"
                        id="adress2"
                    />
                    <input
                        className="border"
                        type="text"
                        name="adress2"
                        id="adress2"
                    />
                    <input
                        className="border"
                        type="text"
                        name="date1"
                        id="date1"
                    />
                    <input
                        className="border"
                        type="text"
                        name="date2"
                        id="date2"
                    />
                    <button className="border">button</button>
                </div>
                <Image
                    src={"/bg.jpg"}
                    alt="landing page background image"
                    className="max-h-[500px] rounded-xl object-cover object-center"
                    width="1920"
                    height="1080"
                />
            </div>

            <div className="flex h-[60vh] flex-col justify-evenly md:h-auto">
                <div className="mt-5 flex justify-center">
                    <div className="mx-auto w-screen max-w-2xl rounded-md  px-2 lg:mx-8">
                        <p className="text-center text-lg leading-8 text-black">
                            Here, we understand the importance of reliable
                            transportation when it comes to exploring new
                            destinations or simply getting around town. Whether
                            you&apos;re a seasoned traveler or a local in need
                            of a temporary set of wheels, we&apos;ve got you
                            covered.
                        </p>
                    </div>
                </div>
                <div className="flex justify-center p-4"></div>
            </div>
            <MobileCarousel cars={cars} />
            {/* <Gallery cars={cars} /> */}
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
