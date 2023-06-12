import Image from "next/image";
import Link from "next/link";
import { IconSquareChevronRight } from "@tabler/icons-react";
import { PrismaClient } from "@prisma/client";
import Cokolwiek from "./components/cokolwiek";
import Calendar from "./components/calendar";

// const prisma = new PrismaClient();

export default async function Home() {
    // const cars = await prisma.car.findMany();
    // if (!cars) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            <div className="relative mt-4 w-screen bg-white p-8">
                <div className="absolute top-[8%] mt-4 w-auto pl-4 md:mt-0 lg:left-1/2 lg:-translate-x-1/2">
                    <h2 className="pl-4 text-2xl font-bold md:pl-0 md:text-5xl">
                        Welcome to car-rental
                    </h2>
                    <p className="md:max-w-auto max-w-xs pl-4 text-sm md:text-base">
                        {" "}
                        We offer professional car rental in our range of high
                        end vehicles
                    </p>
                </div>
                <Link
                    href="/cars"
                    className="absolute bottom-[15%] ml-4 md:bottom-[8%] lg:left-1/2 lg:-translate-x-1/2"
                >
                    <button
                        type="button"
                        className="flex items-center rounded-md bg-white py-2.5 pl-5 pr-3 text-center text-sm font-medium text-black shadow-sm hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-4"
                    >
                        Car catalog
                        <IconSquareChevronRight className="ml-2" />
                    </button>
                </Link>
                <div className="absolute bottom-[8%] right-[5%] hidden flex-col space-y-4 rounded-xl bg-white p-4 md:flex">
                    <Cokolwiek label="Pick Up Location" />
                    <Cokolwiek label="Drop Off Location" />
                    <span className="flex flex-col">
                        <h3 className="block text-sm font-medium leading-6 text-gray-900">
                            Rental Days
                        </h3>
                        <span className="flex items-center justify-around">
                            <input
                                type="number"
                                name="time"
                                id="time"
                                inputMode="numeric"
                                className="mr-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="0"
                                pattern="[0-9]+"
                            />
                            <h3 className="block text-sm font-medium leading-6 text-gray-900">
                                Days
                            </h3>
                        </span>
                    </span>

                    <Calendar />
                    <Link href={"/"} className="w-auto cursor-default">
                        <button className="cursor-pointer rounded-md border p-2 shadow-md hover:bg-gray-50 hover:shadow-xl">
                            Reserve now
                        </button>
                    </Link>
                </div>
                <Image
                    src={"/bg.jpg"}
                    alt="landing page background image"
                    className="max-h-[500px] rounded-xl object-cover object-center"
                    width="1920"
                    height="1080"
                />
            </div>

            {/* MOBILE VERSION */}
            <div className="mx-4 flex flex-col space-y-4 rounded-xl bg-white p-4 shadow-md md:hidden">
                <Cokolwiek label="Pick Up Location" />
                <Cokolwiek label="Drop Off Location" />
                <span className="flex flex-col">
                    <h3 className="block text-sm font-medium leading-6 text-gray-900">
                        Rental Days
                    </h3>
                    <span className="flex items-center justify-around">
                        <input
                            type="number"
                            name="time"
                            id="time"
                            inputMode="numeric"
                            className="mr-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="0"
                            pattern="[0-9]+"
                        />
                        <h3 className="block text-sm font-medium leading-6 text-gray-900">
                            Days
                        </h3>
                    </span>
                </span>

                <Calendar />
                <Link href={"/"} className="w-auto cursor-default">
                    <button className="cursor-pointer rounded-md border p-2 shadow-md hover:bg-gray-50 hover:shadow-xl">
                        Reserve now
                    </button>
                </Link>
            </div>
            {/* end of mobile version */}

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
            {/* <MobileCarousel cars={cars} /> */}
        </>
    );
}
1;
