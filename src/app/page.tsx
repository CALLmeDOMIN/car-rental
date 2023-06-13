import Image from "next/image";
import Link from "next/link";
import { Icon24Hours, IconSquareChevronRight } from "@tabler/icons-react";
import { PrismaClient } from "@prisma/client";
import DropMW from "./components/dropMW";
import Calendar from "./components/calendar";
import Slideshow from "./components/slideshow";

const prisma = new PrismaClient();

export default async function Home() {
    const cars = await prisma.car.findMany();
    if (!cars) {
        return <div>Loading...</div>;
    }

    const photos = cars.map((car) => ({
        id: car.id.toString(),
        imageUrl: car.imageUrl,
    }));

    return (
        <>
            {/* landing pricture and form */}
            <section>
                <div className="relative mt-4 w-screen bg-white p-8">
                    <div className="absolute top-[8%] mt-4 w-auto pl-4 md:mt-0 lg:left-1/2 lg:-translate-x-1/2">
                        <h2 className="text-2xl font-bold md:pl-0 md:text-4xl lg:text-5xl">
                            Welcome to car-rental
                        </h2>
                        <p className="max-w-[280px] text-sm sm:max-w-xs md:text-base lg:flex lg:max-w-none lg:justify-center">
                            {" "}
                            We offer professional car rental in our range of
                            high end vehicles
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
                        <DropMW label="Pick Up Location" />
                        <DropMW label="Drop Off Location" />

                        <span className="flex flex-col sm:leading-6">
                            <h3 className="block text-sm font-medium text-gray-900">
                                Rental Days
                            </h3>
                            <span className="relative flex items-center justify-around">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
                                    <span className="text-gray-500 sm:text-sm">
                                        <Icon24Hours size="18" />
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    name="time"
                                    id="time"
                                    inputMode="numeric"
                                    className="mr-2 block w-full rounded-md border-0 py-1.5 pl-8 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="0"
                                    pattern="[0-9]+"
                                />
                                <h3 className="block text-sm font-medium text-gray-900">
                                    Days
                                </h3>
                            </span>
                        </span>

                        <span className="flex flex-col">
                            <h3 className="block text-sm font-medium leading-6 text-gray-900">
                                Pick Up Date
                            </h3>

                            <Calendar />
                        </span>

                        <Link href={"/"} className="w-auto cursor-default">
                            <button className="cursor-pointer rounded-md border px-6 py-1.5 shadow-md hover:bg-gray-50 hover:shadow-xl">
                                Reserve now
                            </button>
                        </Link>
                    </div>
                    <Image
                        src={"/bg.jpg"}
                        alt="landing page background image"
                        className="max-h-[80vh] min-h-[30vh] rounded-xl object-cover object-center shadow-xl"
                        width="1920"
                        height="1080"
                    />
                </div>

                {/* MOBILE VERSION */}
                <div className="mx-4 flex flex-col space-y-4 rounded-xl bg-white p-4 shadow-md md:hidden">
                    <DropMW label="Pick Up Location" />
                    <DropMW label="Drop Off Location" />

                    <span className="flex flex-col sm:leading-6">
                        <h3 className="block text-sm font-medium text-gray-900">
                            Rental Days
                        </h3>
                        <span className="relative flex items-center justify-around">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
                                <span className="text-gray-500 sm:text-sm">
                                    <Icon24Hours size="18" />
                                </span>
                            </div>
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

                    <span className="flex flex-col">
                        <h3 className="block text-sm font-medium leading-6 text-gray-900">
                            Pick Up Date
                        </h3>

                        <Calendar />
                    </span>

                    <Link href={"/"} className="w-auto cursor-default">
                        <button className="cursor-pointer rounded-md border p-2 shadow-md hover:bg-gray-50 hover:shadow-xl">
                            Reserve now
                        </button>
                    </Link>
                </div>
                {/* end of mobile version */}
            </section>
            {/* end of landing first screen */}

            {/* Our services section */}
            <section className="mb-20 mt-20">
                <div className="grid gap-5 px-8 md:grid-cols-2 md:gap-10 md:px-36 lg:grid-rows-2 xl:grid-cols-3">
                    <div className="flex flex-col items-center leading-6 md:block">
                        <h2 className="py-12 text-4xl font-bold md:text-3xl lg:text-5xl 2xl:text-6xl">
                            Our services
                        </h2>
                        <p className=" pb-3 pl-1 md:max-w-[32ch] md:pb-8 md:text-sm lg:text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam, voluptatum.
                        </p>
                    </div>
                    <div className="relative flex items-end md:row-span-2 ">
                        <Image
                            src={"/2.jpg"}
                            width={500}
                            height={749}
                            alt="img1"
                            className="max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl
                            md:max-h-[600px]"
                        />
                        <button className="absolute bottom-[2%] left-[3%] rounded-md bg-white px-6 py-1.5 shadow-sm">
                            Wedding events
                        </button>
                    </div>
                    <div className="relative flex items-end">
                        <Image
                            src={"/3.jpg"}
                            width={1232}
                            height={821}
                            alt="img2"
                            className="max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                        />
                        <button className="absolute bottom-[5%] left-[3%] rounded-md bg-white px-6 py-1.5 shadow-sm">
                            Intercity trips
                        </button>
                    </div>
                    <div className="relative flex items-end">
                        <Image
                            src={"/4.jpg"}
                            width={1024}
                            height={453}
                            alt="img3"
                            className="max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105
                            hover:shadow-2xl"
                        />
                        <button className="absolute bottom-[5%] left-[3%] rounded-md bg-white px-6 py-1.5 shadow-sm">
                            Airport transfers
                        </button>
                    </div>
                    <div className="relative flex items-end">
                        <Image
                            src={"/6.jpg"}
                            width={612}
                            height={408}
                            alt="img4"
                            className="max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105
                            hover:shadow-2xl"
                        />
                        <button className="absolute bottom-[5%] left-[3%] rounded-md bg-white px-6 py-1.5 shadow-sm">
                            Buisness meetings
                        </button>
                    </div>
                </div>
            </section>
            {/* end of our servicers section */}

            {/* our fleet section */}
            <section>
                <div className="mt-4 h-screen w-screen p-8 ">
                    <div className="w-full rounded-xl bg-white p-10 shadow-xl">
                        <div className="grid grid-cols-3 grid-rows-3 gap-10">
                            <div className="col-span-3 flex flex-col justify-center">
                                <h1 className="p-12 text-7xl leading-6">
                                    Our Fleet
                                </h1>
                                <p className="max-w-[64ch] pb-6">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ut, natus! Lorem ipsum,
                                    dolor sit amet consectetur adipisicing elit.
                                    Rem veritatis nostrum sequi quisquam amet
                                    ipsa.
                                </p>
                            </div>
                            <div className="col-span-3 row-span-2">
                                {" "}
                                <Slideshow photos={photos} />{" "}
                            </div>
                            {/* <div className="col-span-2 flex items-center justify-center">
                                <button className=" bg-red-400">1321321</button>
                            </div>
                            <div className="flex justify-center gap-2">
                                <button className="bg-red-100">prev</button>
                                <button className="bg-red-100">next</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
1;
