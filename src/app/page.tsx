import Image from 'next/image'
import Link from 'next/link'
import { IconFlame, IconCopyright } from '@tabler/icons-react'
import { IconArrowUpRight } from '@tabler/icons-react'
import Slideshow, { Photo } from '../components/slideshow'
import SubmitForm from '../components/submitForm'
import {
    cities,
    expolore,
    intercity,
    socials,
    terms,
    whyChooseUs,
} from '../../public/assets'
import { prisma } from '../../lib/prisma'
import Alert from '../components/alert'
import { Car } from './cars/page'

export default async function Home() {
    const cars = (await prisma.car.findMany({
        select: {
            id: true,
            brand: true,
            name: true,
            transmission: true,
            capacity: true,
            passengers: true,
            imageUrl: true,
        },
    })) as Car[]

    const hotOffer = cars[1]

    if (!cars) {
        return <div>Loading...</div>
    }

    const photos = cars.map((car: Car) => ({
        id: car.id.toString(),
        imageUrl: car.imageUrl,
        people: car.passengers,
        bags: car.capacity,
        name: car.brand + ' ' + car.name,
    }))

    return (
        <>
            {/* landing picture and form */}
            <section className="p-8">
                <div className="relative mt-4 min-h-[80vh]">
                    <div className="absolute top-[8%] z-10 mt-4 flex w-full flex-col items-center justify-center md:mt-0 lg:left-1/2 lg:-translate-x-1/2">
                        <h2 className="text-2xl font-bold text-text dark:text-darkbg md:text-4xl lg:text-5xl">
                            Welcome to car-rental
                        </h2>
                        <p className="flex max-w-[280px] justify-center text-center text-sm text-text dark:text-darkbg sm:max-w-xs md:text-left md:text-base lg:max-w-none">
                            We offer professional car rental in our range of
                            high end vehicles
                        </p>
                    </div>
                    <Link
                        passHref
                        href="/cars"
                        className="absolute bottom-5 z-10 ml-4 md:bottom-[8%] lg:left-1/2 lg:-translate-x-1/2"
                    >
                        <button
                            type="button"
                            className="flex items-center justify-center rounded-md bg-background py-2 pl-6 text-center text-sm font-semibold text-text shadow-sm hover:shadow-xl focus:outline-none focus:ring-4 dark:bg-darkbg dark:text-darktext"
                        >
                            Car catalog
                            <IconArrowUpRight
                                className="mx-2 mr-4"
                                size={16}
                                aria-label="arrow up right"
                            />
                        </button>
                    </Link>
                    <SubmitForm className="absolute bottom-[8%] right-[5%] z-10 hidden flex-col space-y-4 rounded-xl bg-background p-4 dark:bg-darkbg md:flex" />
                    <Image
                        src={'/hero.jpg'}
                        alt="landing page background image"
                        className="rounded-xl object-cover object-center shadow-xl lg:max-h-[80vh]"
                        fill
                        sizes="90vw"
                    />
                </div>

                {/* MOBILE VERSION */}
                <SubmitForm className="mx-4 mt-4 flex flex-col space-y-4 rounded-xl border border-text bg-background p-4 dark:bg-darkbg md:hidden" />
                {/* end of mobile version */}
            </section>
            {/* end of landing first screen */}

            {/* Our services section */}
            <section className="mb-20 mt-20">
                <div className="grid gap-5 px-8 md:grid-cols-2 md:gap-10 md:px-36 lg:grid-rows-2 xl:grid-cols-3">
                    <div className="flex flex-col items-center leading-6 md:block">
                        <h2 className="py-12 text-4xl font-bold text-text dark:text-darktext md:text-3xl lg:text-5xl 2xl:text-6xl">
                            Our Services
                        </h2>
                        <p className="pb-3 pl-1 font-semibold text-gray-500 md:max-w-[32ch] md:pb-8 md:text-sm lg:text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. <br />
                            Quisquam, voluptatum.
                        </p>
                    </div>
                    <div className="relative flex min-h-[280px] items-end justify-center md:row-span-2">
                        <Image
                            src={'/wedding.jpg'}
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1280px) 50vw, 33vw"
                            alt="img1"
                            className="h-auto max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl
                            md:max-h-[600px]"
                        />
                        <button className="absolute bottom-[2%] left-[3%] rounded-md bg-background px-6 py-1.5 text-text shadow-sm dark:bg-darkbg dark:text-darktext">
                            Wedding events
                        </button>
                    </div>
                    <div className="relative flex min-h-[280px] items-end">
                        <Image
                            src={'/intercity.jpg'}
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1280px) 50vw, 33vw"
                            alt="img2"
                            className="h-full max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                        />
                        <button className="absolute bottom-[5%] left-[3%] rounded-md bg-background px-6 py-1.5 text-text shadow-sm dark:bg-darkbg dark:text-darktext">
                            Intercity trips
                        </button>
                    </div>
                    <div className="relative flex min-h-[280px] items-end">
                        <Image
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1280px) 50vw, 33vw"
                            src={'/airport.jpg'}
                            alt="img3"
                            className="max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105
                            hover:shadow-2xl"
                        />
                        <button className="absolute bottom-[5%] left-[3%] rounded-md bg-background px-6 py-1.5 text-text shadow-sm dark:bg-darkbg dark:text-darktext">
                            Airport transfers
                        </button>
                    </div>
                    <div className="relative flex min-h-[280px] items-end">
                        <Image
                            src={'/buisness.jpg'}
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1280px) 50vw, 33vw"
                            alt="img4"
                            className="h-auto max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105
                            hover:shadow-2xl"
                        />
                        <button className="absolute bottom-[5%] left-[3%] rounded-md bg-background px-6 py-1.5 text-text shadow-sm dark:bg-darkbg dark:text-darktext">
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
                            <h1 className="text-5xl font-bold leading-6 text-text dark:text-darktext md:py-12 md:text-4xl xl:text-7xl">
                                Our Fleet
                            </h1>
                            <p className="max-w-[64ch] font-semibold text-gray-500 md:max-w-[32ch] md:py-12 lg:max-w-[64ch]">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ut, natus! Lorem ipsum, dolor
                                sit amet consectetur adipisicing elit. Rem
                                veritatis nostrum sequi quisquam amet ipsa.
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <Slideshow photos={photos} />
                            <span className="flex justify-center pt-4">
                                <Link passHref href={'/cars'}>
                                    <button className="flex transform items-center rounded-md bg-primary-button py-1.5 pl-6 text-background shadow-sm shadow-primary-button duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-button dark:text-darkbg md:shadow-md">
                                        <h1 className="font-semibold">
                                            Show more
                                        </h1>
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
                        <h1 className="text-4xl font-bold leading-6 text-text dark:text-darktext md:text-5xl xl:text-7xl">
                            Why Choose Us
                        </h1>
                        <p className="max-w-[64ch] px-6 font-semibold text-gray-500 md:max-w-[32ch] lg:max-w-[48ch]">
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
                                <div className="flex aspect-square transform items-center justify-center rounded-xl bg-secondary-button text-accent shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 dark:text-darkbg">
                                    {el.icon}
                                </div>
                                <h1 className="pt-6 text-lg font-semibold text-text dark:text-darktext">
                                    {el.title}
                                </h1>
                                <p className="max-w-[24ch] pt-2 text-sm font-semibold text-gray-500">
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
                        <h1 className="text-4xl font-bold leading-6 text-text dark:text-darktext md:text-5xl xl:text-7xl">
                            Todays Offer
                        </h1>
                        <p className="max-w-[32ch] font-semibold text-gray-500 lg:max-w-[48ch]">
                            15% off
                        </p>
                    </div>
                    <div className="grid grid-cols-4 grid-rows-4 rounded-3xl border p-2 shadow-xl sm:p-4">
                        <div className="col-span-2 flex items-center justify-center">
                            <h1 className="font-semibold leading-6 text-text dark:text-darktext sm:text-xl md:text-3xl lg:text-5xl">
                                {hotOffer.brand + ' '}
                                <span className="text-primaryButton">
                                    {hotOffer.name}
                                </span>
                            </h1>
                        </div>
                        <div className="relative col-span-2 row-span-3 flex min-h-[280px]">
                            <Image
                                src={hotOffer.imageUrl}
                                fill
                                sizes="50vw"
                                className="rounded-3xl object-cover object-center shadow-md"
                                alt="hot offer car image"
                            />
                        </div>
                        <div className="col-span-2 row-span-2 flex items-center text-xs capitalize sm:text-lg md:col-span-1 md:items-stretch md:text-sm lg:text-base">
                            <ul className="flex flex-col justify-center pr-4 md:justify-around md:pr-0">
                                <li className="flex items-center text-text dark:text-darktext">
                                    <IconFlame
                                        size={32}
                                        aria-label="pointer"
                                        className="text-primary-button"
                                    />
                                    fast sports and drift car
                                </li>
                                <li className="flex items-center text-text dark:text-darktext">
                                    <IconFlame
                                        size={32}
                                        aria-label="pointer"
                                        className="text-primary-button"
                                    />
                                    {hotOffer.transmission} transmission
                                </li>
                                <li className="flex items-center text-text dark:text-darktext">
                                    <IconFlame
                                        size={32}
                                        aria-label="pointer"
                                        className="text-primary-button"
                                    />
                                    preparation for track usage
                                </li>
                                <li className="hidden items-center text-text dark:text-darktext lg:flex ">
                                    <IconFlame
                                        size={32}
                                        aria-label="pointer"
                                        className="text-primary-button"
                                    />
                                    preparation for track usage
                                </li>
                            </ul>
                        </div>
                        <div className="row-span-2 mr-2 hidden capitalize md:flex md:text-sm lg:text-base">
                            <ul className="flex flex-col justify-around">
                                <li className="flex items-center text-text dark:text-darktext">
                                    <IconFlame
                                        size={32}
                                        aria-label="pointer"
                                        className="text-primary-button"
                                    />
                                    New tires on the car
                                </li>
                                <li className="flex items-center text-text dark:text-darktext">
                                    <IconFlame
                                        size={32}
                                        aria-label="pointer"
                                        className="text-primary-button"
                                    />
                                    Discount on additional tires
                                </li>
                                <li className="flex items-center text-text dark:text-darktext">
                                    <IconFlame
                                        size={32}
                                        aria-label="pointer"
                                        className="text-primary-button"
                                    />
                                    good sound system
                                </li>
                                <li className="hidden items-center text-text dark:text-darktext lg:flex">
                                    <IconFlame
                                        size={32}
                                        aria-label="pointer"
                                        className="text-primary-button"
                                    />
                                    good sound system
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-2 flex items-center justify-center">
                            <Link
                                passHref
                                href={`/car/${hotOffer.id}`}
                                className="m-1"
                            >
                                <button
                                    type="button"
                                    className="flex transform items-center justify-center rounded-md bg-primary-button py-2 pl-3 text-center text-sm font-semibold text-background shadow-sm shadow-primary-button duration-500 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-primary-button focus:outline-none focus:ring-4 dark:text-darkbg md:pl-6"
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
                <div className="m-2 mb-0 grid gap-3 rounded-3xl bg-accent p-6 pt-10 md:m-8 md:mb-0 md:p-8 lg:grid-cols-5 lg:grid-rows-6 lg:gap-0 ">
                    <Link
                        passHref
                        href="/"
                        className="col-span-2 hidden items-center justify-start pl-4 lg:flex"
                    >
                        <Image
                            className="h-auto w-auto rounded-full bg-transparent"
                            src={'/logo1.png'}
                            alt="logo"
                            width={32}
                            height={32}
                            aria-label="logo"
                        />
                    </Link>
                    <h1 className="hidden items-center justify-start font-semibold text-background dark:text-darkbg lg:flex">
                        Top cities
                    </h1>
                    <h1 className="hidden items-center justify-start font-semibold text-background dark:text-darkbg lg:flex">
                        Explore
                    </h1>
                    <h1 className="hidden items-center justify-start font-semibold text-background dark:text-darkbg lg:flex">
                        Intercity Rides
                    </h1>
                    <div className="col-span-2 row-span-3 hidden flex-col justify-center space-y-4 p-4 lg:flex">
                        {/* <form action=''> */}
                        <div className="relative w-3/5">
                            <label
                                htmlFor="newsletter"
                                className="text-background dark:text-darkbg"
                            >
                                Subscribe to newsletter
                            </label>
                            <input
                                type="text"
                                name="newsletter"
                                id="newsletter"
                                className="focus:ring-primary-button-500 w-full cursor-default rounded-md border-none bg-background py-1.5 pl-4 pr-10 text-left text-text shadow-sm ring-1 ring-inset ring-background placeholder:text-text/20  focus:outline-none focus:ring-2 dark:bg-darkbg dark:text-darktext dark:ring-transparent dark:placeholder:text-darktext sm:text-sm sm:leading-6"
                                placeholder="placeholder@email.com"
                            />
                            <Alert />
                        </div>
                        {/* </form> */}
                    </div>
                    <div className="row-span-3 hidden flex-col items-start space-y-2 text-sm lg:flex">
                        {cities.map((el, index) => (
                            <div
                                key={index}
                                className="text-background dark:text-darkbg"
                            >
                                <h1>{el}</h1>
                            </div>
                        ))}
                    </div>
                    <div className="row-span-3 hidden flex-col items-start space-y-2 text-sm lg:flex">
                        {expolore.map((el, index) => (
                            <div
                                key={index}
                                className="text-background dark:text-darkbg"
                            >
                                <h1>{el}</h1>
                            </div>
                        ))}
                    </div>
                    <div className="row-span-3 hidden flex-col items-start space-y-2 text-sm lg:flex">
                        {intercity.map((el, index) => (
                            <div
                                key={index}
                                className="text-background dark:text-darkbg"
                            >
                                <h1>{el}</h1>
                            </div>
                        ))}
                    </div>
                    <span className="hidden lg:block"></span>
                    <span className="hidden lg:block"></span>
                    <span className="hidden lg:block"></span>
                    <span className="hidden lg:block"></span>
                    <span className="hidden lg:block"></span>
                    <div className="hidden items-end gap-1 pl-4 text-background dark:text-darkbg lg:flex">
                        <span className="flex items-center text-background dark:text-darkbg">
                            <IconCopyright size={14} aria-label="copyright" />
                            <h1 className="text-sm ">2023 Car-rental</h1>
                        </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center gap-6 text-xs font-semibold text-background dark:text-darkbg md:text-sm lg:col-span-3 lg:items-end">
                        {terms.map((el, index) => (
                            <Link key={index} href={'/'} passHref>
                                <h1>{el}</h1>
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-end gap-1 text-background dark:text-darkbg lg:hidden">
                        <span className="flex items-center">
                            <IconCopyright size={14} aria-label="copyright" />
                            <h3 className="text-xs md:text-sm">
                                2023 Car-rental
                            </h3>
                        </span>
                    </div>
                    <div className="flex items-end justify-center gap-2 text-background dark:text-darkbg lg:justify-normal">
                        {socials.map((el) => (
                            <Link
                                key={el.key}
                                href={'/'}
                                className="transform duration-500 ease-in-out hover:-translate-y-1"
                            >
                                {el.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </footer>
        </>
    )
}
