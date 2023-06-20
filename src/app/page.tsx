import Image from "next/image";
import Link from "next/link";
import {
    IconAlertSmall,
    IconArrowNarrowRight,
    IconCopyright,
} from "@tabler/icons-react";
import Slideshow from "./components/slideshow";
import { IconArrowUpRight } from "@tabler/icons-react";
import SubmitForm from "./components/submitForm";
import { getAllCars, getCertainCars } from "./api/prisma";
import {
    cities,
    expolore,
    intercity,
    socials,
    terms,
    whyChooseUs,
} from "./assets";

export default async function Home() {
    const cars = await getAllCars();
    const hotOffer = (await getCertainCars({ id: 6 }))[0];

    if (!cars) {
        return <div>Loading...</div>;
    }

    const photos = cars.map((car) => ({
        id: car.id.toString(),
        imageUrl: car.imageUrl,
        people: car.passengers,
        bags: car.capacity,
        name: car.brand + " " + car.name,
    }));

    return (
        <>
            {/* landing pricture and form */}
            <section>
                <div className="relative mt-4 p-8">
                    <div className="absolute top-[8%] mt-4 w-auto pl-4 md:mt-0 lg:left-1/2 lg:-translate-x-1/2">
                        <h2 className="text-2xl font-bold text-text md:pl-0 md:text-4xl lg:text-5xl">
                            Welcome to car-rental
                        </h2>
                        <p className="max-w-[280px] text-sm text-text sm:max-w-xs md:text-base lg:flex lg:max-w-none lg:justify-center">
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
                            className="flex items-center justify-center rounded-md bg-white py-2 pl-6 text-center text-sm font-semibold text-black shadow-sm hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-4"
                        >
                            Car catalog
                            <IconArrowUpRight
                                className="mx-2 mr-4"
                                size={16}
                                aria-label="arrow up right"
                            />
                        </button>
                    </Link>
                    <SubmitForm className="absolute bottom-[8%] right-[5%] hidden flex-col space-y-4 rounded-xl bg-background p-4 md:flex" />
                    <Image
                        src={"/hero.jpg"}
                        alt="landing page background image"
                        className="min-h-[30vh] rounded-xl object-cover object-center shadow-xl lg:max-h-[80vh]"
                        width={1920}
                        height={1080}
                    />
                </div>

                {/* MOBILE VERSION */}
                <SubmitForm className="mx-4 flex flex-col space-y-4 rounded-xl bg-background p-4 shadow-md md:hidden" />
                {/* end of mobile version */}
            </section>
            {/* end of landing first screen */}

            {/* Our services section */}
            <section className="mb-20 mt-20">
                <div className="grid gap-5 px-8 md:grid-cols-2 md:gap-10 md:px-36 lg:grid-rows-2 xl:grid-cols-3">
                    <div className="flex flex-col items-center leading-6 md:block">
                        <h2 className="py-12 text-4xl font-bold md:text-3xl lg:text-5xl 2xl:text-6xl">
                            Our{" "}
                            <span className="text-primaryButton">Services</span>
                        </h2>
                        <p className="pb-3 pl-1 font-semibold text-gray-700 md:max-w-[32ch] md:pb-8 md:text-sm lg:text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. <br />
                            Quisquam, voluptatum.
                        </p>
                    </div>
                    <div className="relative flex items-end justify-center md:row-span-2">
                        <Image
                            src={"/wedding.jpg"}
                            width={1920}
                            height={1080}
                            alt="img1"
                            className="h-auto max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl
                            md:max-h-[600px]"
                        />
                        <button className="absolute bottom-[2%] left-[3%] rounded-md bg-white px-6 py-1.5 shadow-sm">
                            Wedding events
                        </button>
                    </div>
                    <div className="relative flex items-end">
                        <Image
                            src={"/intercity.jpg"}
                            width={1920}
                            height={1080}
                            alt="img2"
                            className="h-auto max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                        />
                        <button className="absolute bottom-[5%] left-[3%] rounded-md bg-white px-6 py-1.5 shadow-sm">
                            Intercity trips
                        </button>
                    </div>
                    <div className="relative flex items-end">
                        <Image
                            src={"/airport.jpg"}
                            width={1920}
                            height={1080}
                            alt="img3"
                            className="h-auto max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105
                            hover:shadow-2xl"
                        />
                        <button className="absolute bottom-[5%] left-[3%] rounded-md bg-white px-6 py-1.5 shadow-sm">
                            Airport transfers
                        </button>
                    </div>
                    <div className="relative flex items-end">
                        <Image
                            src={"/buisness.jpg"}
                            width={1920}
                            height={1080}
                            alt="img4"
                            className="h-auto max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105
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
                <div className="mt-4 p-2 md:p-8 ">
                    <div className="flex flex-col md:p-10">
                        <div className="mx-6 flex flex-col items-center justify-center gap-10 md:mx-0 md:flex-row">
                            <h1 className="text-5xl font-bold leading-6 md:py-12 md:text-4xl xl:text-7xl">
                                Our
                                <span className="text-primaryButton">
                                    {" "}
                                    Fleet
                                </span>
                            </h1>
                            <p className="max-w-[32ch] font-semibold text-gray-700 md:py-12 lg:max-w-[64ch]">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ut, natus! Lorem ipsum, dolor
                                sit amet consectetur adipisicing elit. Rem
                                veritatis nostrum sequi quisquam amet ipsa.
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <Slideshow photos={photos} />
                            <span className="flex justify-center pt-4">
                                <Link href={"/cars"}>
                                    <button className="flex transform items-center rounded-md bg-primaryButton py-1.5 pl-6 text-text shadow-md shadow-primaryButton duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primaryButton">
                                        <h3> Show more </h3>
                                        <IconArrowUpRight
                                            size={16}
                                            className="mx-2 mr-4"
                                            aria-label="arrow up right"
                                        />
                                    </button>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* end of fleet section */}

            {/* why choose us section */}
            <section className="mb-40 mt-20">
                <div className="md:p8 mt-4 p-2">
                    <div className="flex flex-col items-center justify-center gap-10 pb-6 pt-12 md:flex-row md:py-12">
                        <h1 className="text-4xl font-bold leading-6 md:text-5xl xl:text-7xl">
                            Why
                            <span className="text-primaryButton">
                                {" "}
                                Choose Us
                            </span>
                        </h1>
                        <p className="max-w-[32ch] font-semibold text-gray-600 lg:max-w-[48ch]">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Unde, aliquam placeat inventore laborum sint
                            corrupti.
                        </p>
                    </div>
                </div>
                <div className="my-10 flex justify-center">
                    <div className="grid gap-10 md:grid-cols-2 md:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1">
                        {whyChooseUs.map((el, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="flex aspect-square transform items-center justify-center rounded-xl text-text shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
                                    {el.icon}
                                </div>
                                <h1 className="pt-6 text-lg font-semibold text-primaryButton">
                                    {el.title}
                                </h1>
                                <p className="max-w-[24ch] pt-2 text-sm font-semibold text-gray-700">
                                    {el.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* end of why choose us */}

            {/* hot offer section */}
            <section className="my-20 flex justify-center">
                <div className="m-2 max-w-5xl sm:m-4">
                    <div className="flex flex-col items-center justify-center gap-2 pb-3 pt-12 md:flex-row md:justify-center md:gap-10 md:py-12 md:pb-6">
                        <h1 className="text-4xl font-bold leading-6 md:text-5xl xl:text-7xl">
                            <span className="text-primaryButton"> Todays </span>
                            Offer
                        </h1>
                        <p className="max-w-[32ch] font-semibold text-gray-600 lg:max-w-[48ch]">
                            15% off
                        </p>
                    </div>
                    <div className="grid grid-cols-4 grid-rows-4 rounded-3xl border p-2 shadow-xl sm:p-4">
                        <div className="col-span-2 flex items-center justify-center">
                            <h1 className="font-semibold leading-6 sm:text-xl md:text-3xl lg:text-5xl">
                                {hotOffer.brand + " "}
                                <span className="text-primary">
                                    {hotOffer.name}
                                </span>
                            </h1>
                        </div>
                        <div className="col-span-2 row-span-3">
                            <Image
                                src={hotOffer.imageUrl}
                                width={1920}
                                height={1080}
                                className="aspect-video h-auto w-auto rounded-3xl object-cover object-center shadow-md"
                                alt="hot offer car image"
                            />
                        </div>
                        <div className="col-span-2 row-span-2 flex items-center text-xs capitalize sm:text-lg md:col-span-1 md:items-stretch md:text-sm lg:text-base">
                            <ul className="flex flex-col justify-center md:justify-around">
                                <li className="flex items-center text-text">
                                    <IconAlertSmall
                                        aria-label="pointer"
                                        className="text-accent"
                                    />
                                    fast sports and drift car
                                </li>
                                <li className="flex items-center text-text">
                                    <IconAlertSmall
                                        aria-label="pointer"
                                        className="text-accent"
                                    />
                                    {hotOffer.transmission} transmission
                                </li>
                                <li className="flex items-center text-text">
                                    <IconAlertSmall
                                        aria-label="pointer"
                                        className="text-accent"
                                    />
                                    preparation for track usage
                                </li>
                                <li className="hidden items-center text-text lg:flex ">
                                    <IconAlertSmall
                                        aria-label="pointer"
                                        className="text-accent"
                                    />
                                    preparation for track usage
                                </li>
                            </ul>
                        </div>
                        <div className="row-span-2 mr-2 hidden capitalize md:flex md:text-sm lg:text-base">
                            <ul className="flex flex-col justify-around">
                                <li className="flex items-center text-text">
                                    <IconAlertSmall
                                        aria-label="pointer"
                                        className="text-accent"
                                    />
                                    New tires on the car
                                </li>
                                <li className="flex items-center text-text">
                                    <IconAlertSmall
                                        aria-label="pointer"
                                        className="text-accent"
                                    />
                                    Discount on additional tires
                                </li>
                                <li className="flex items-center">
                                    <IconAlertSmall aria-label="pointer" />
                                    good sound system
                                </li>
                                <li className="hidden items-center text-text lg:flex">
                                    <IconAlertSmall
                                        aria-label="pointer"
                                        className="text-accent"
                                    />
                                    good sound system
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-2 flex items-center justify-center">
                            <Link href={`/car/${hotOffer.id}`} className="m-1">
                                <button
                                    type="button"
                                    className="flex transform items-center justify-center rounded-md bg-secondaryButton py-2 pl-3 text-center text-sm font-semibold text-text shadow-sm shadow-secondaryButton duration-500 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-secondaryButton focus:outline-none focus:ring-4 md:pl-6"
                                >
                                    Reserve now
                                    <IconArrowUpRight
                                        className="mx-2 md:mr-4"
                                        size={16}
                                        aria-label="arrow up right"
                                    />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* end of hot offer section */}

            {/* footer */}
            <footer>
                <div className="m-2 grid gap-3 rounded-3xl bg-accent p-6 pt-10 md:m-8 md:p-8 lg:grid-cols-5 lg:grid-rows-6 lg:gap-0 ">
                    <Link
                        href="/"
                        className="col-span-2 hidden items-center justify-start pl-4 lg:flex"
                    >
                        <Image
                            className="h-auto w-auto"
                            src={"/logo1.png"}
                            alt="logo"
                            width={32}
                            height={32}
                            aria-label="logo"
                        />
                    </Link>
                    <h1 className="hidden items-center justify-start font-semibold text-white lg:flex">
                        Top cities
                    </h1>
                    <h1 className="hidden items-center justify-start font-semibold text-white lg:flex">
                        Explore
                    </h1>
                    <h1 className="hidden items-center justify-start font-semibold text-white lg:flex">
                        Intercity Rides
                    </h1>
                    <div className="col-span-2 row-span-3 hidden flex-col justify-center space-y-4 p-4 lg:flex">
                        <h1 className="text-white">Subscribe to newsletter</h1>
                        {/* <form action=""> */}
                        <div className="relative w-3/5">
                            <input
                                type="text"
                                className="w-full cursor-default rounded-md border-none bg-transparent py-1.5 pl-4 pr-10 text-left text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                placeholder="Email"
                            />
                            <button className="absolute bottom-0 right-0 p-1.5 pr-2 text-white">
                                <IconArrowNarrowRight
                                    size={24}
                                    aria-label="arrow right"
                                />
                            </button>
                        </div>
                        {/* </form> */}
                    </div>
                    <div className="row-span-3 hidden flex-col items-start space-y-2 text-sm lg:flex">
                        {cities.map((el, index) => (
                            <div key={index} className="text-gray-300">
                                <h1>{el}</h1>
                            </div>
                        ))}
                    </div>
                    <div className="row-span-3 hidden flex-col items-start space-y-2 text-sm lg:flex">
                        {expolore.map((el, index) => (
                            <div key={index} className="text-gray-300">
                                <h1>{el}</h1>
                            </div>
                        ))}
                    </div>
                    <div className="row-span-3 hidden flex-col items-start space-y-2 text-sm lg:flex">
                        {intercity.map((el, index) => (
                            <div key={index} className="text-gray-300">
                                <h1>{el}</h1>
                            </div>
                        ))}
                    </div>
                    <span className="hidden lg:block"></span>
                    <span className="hidden lg:block"></span>
                    <span className="hidden lg:block"></span>
                    <span className="hidden lg:block"></span>
                    <span className="hidden lg:block"></span>
                    <div className="hidden items-end gap-1 pl-4 text-white lg:flex">
                        <span className="flex items-center">
                            <IconCopyright size={14} aria-label="copyright" />
                            <h3 className="text-sm">2023 Car-rental</h3>
                        </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center gap-6 text-xs font-semibold text-white md:text-sm lg:col-span-3 lg:items-end">
                        {terms.map((el, index) => (
                            <Link key={index} href={"/"}>
                                <h1>{el}</h1>
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-end gap-1 text-white lg:hidden">
                        <span className="flex items-center">
                            <IconCopyright size={14} aria-label="copyright" />
                            <h3 className="text-xs md:text-sm">
                                2023 Car-rental
                            </h3>
                        </span>
                    </div>
                    <div className="flex items-end justify-center gap-2 text-white lg:justify-normal">
                        {socials.map((el) => (
                            <Link
                                key={el.key}
                                href={"/"}
                                className="transform duration-500 ease-in-out hover:-translate-y-1"
                            >
                                {el.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </footer>
        </>
    );
}
