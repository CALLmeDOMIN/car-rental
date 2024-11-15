import {
  IconFlame,
  IconCopyright,
  IconArrowUpRight,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import Slideshow from "@/components/Slideshow";
import SubmitForm from "@/components/SubmitForm";
import NewsForm from "@/components/NewsForm";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/Button";
import { socials, terms, whyChooseUs } from "@/utils/data";
import { type Cars, type Car } from "@/utils/types";
import { prisma } from "@/../lib/prisma";

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
      engineCapacity: true,
    },
  })) as Cars;

  const hotOffer = cars[1];

  if (!cars) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const photos = cars.map((car: Car) => ({
    id: car.id.toString(),
    imageUrl: car.imageUrl,
    people: car.passengers,
    bags: car.capacity,
    name: car.brand + " " + car.name,
  }));

  return (
    <>
      <section className="p-8">
        <div className="relative mt-4 min-h-[80vh]">
          <div className="absolute top-[8%] z-10 mt-4 flex w-full flex-col items-center justify-center md:mt-0 lg:left-1/2 lg:-translate-x-1/2">
            <h2 className="text-2xl font-bold text-text dark:text-darkbg md:text-4xl lg:text-5xl">
              Welcome to car-rental
            </h2>
            <p className="flex max-w-[280px] justify-center text-center text-sm text-text dark:text-darkbg sm:max-w-xs md:text-left md:text-base lg:max-w-none">
              We offer professional car rental in our range of high end vehicles
            </p>
          </div>
          <Link
            passHref
            href="/cars"
            className="absolute bottom-5 z-10 ml-4 md:bottom-[8%] lg:left-1/2 lg:-translate-x-1/2"
          >
            <Button variant="secondary" className="pr-0">
              Car catalog
              <IconArrowUpRight
                className="ml-1 mr-4"
                size={16}
                aria-label="arrow up right"
              />
            </Button>
          </Link>
          <SubmitForm className="absolute bottom-[8%] right-[5%] z-10 hidden flex-col space-y-4 rounded-xl bg-background p-4 dark:bg-darkbg md:flex" />
          <Image
            src={"/hero.jpg"}
            alt="landing page background image"
            className="rounded-xl object-cover object-center shadow-xl lg:max-h-[80vh]"
            fill
            sizes="90vw"
            loading="eager"
            quality={100}
          />
        </div>
        <SubmitForm className="mx-4 mt-4 flex flex-col space-y-4 rounded-xl border border-text bg-background p-4 dark:bg-darkbg md:hidden" />
      </section>

      <section className="mb-20 mt-20">
        <div className="grid gap-5 px-8 md:grid-cols-2 md:gap-10 md:px-36 lg:grid-rows-2 xl:grid-cols-3">
          <div className="flex flex-col items-center leading-6 md:block">
            <h2 className="py-12 text-4xl font-bold text-text dark:text-darktext md:text-3xl lg:text-5xl 2xl:text-6xl">
              Our Services
            </h2>
            <p className="pb-3 pl-1 font-semibold text-gray-500 md:max-w-[32ch] md:pb-8 md:text-sm lg:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
              Quisquam, voluptatum.
            </p>
          </div>
          <div className="relative row-span-2 flex min-h-[280px] items-end justify-center">
            <Image
              src={"/wedding.jpg"}
              fill
              sizes="(max-width: 768px) 100vw,(max-width: 1280px) 50vw, 33vw"
              alt="img1"
              className="h-auto max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl md:max-h-[600px]"
            />
            <div className="absolute bottom-[2%] left-[3%] rounded-md bg-background px-6 py-1.5 text-text shadow-sm dark:bg-darkbg dark:text-darktext">
              Wedding events
            </div>
          </div>
          <div className="relative flex min-h-[280px] items-end">
            <Image
              src={"/intercity.jpg"}
              fill
              sizes="(max-width: 768px) 100vw,(max-width: 1280px) 50vw, 33vw"
              alt="img2"
              className="h-full max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
            />
            <div className="absolute bottom-[5%] left-[3%] rounded-md bg-background px-6 py-1.5 text-text shadow-sm dark:bg-darkbg dark:text-darktext">
              Intercity trips
            </div>
          </div>
          <div className="relative flex min-h-[280px] items-end">
            <Image
              fill
              sizes="(max-width: 768px) 100vw,(max-width: 1280px) 50vw, 33vw"
              src={"/airport.jpg"}
              alt="img3"
              className="max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
            />
            <div className="absolute bottom-[5%] left-[3%] rounded-md bg-background px-6 py-1.5 text-text shadow-sm dark:bg-darkbg dark:text-darktext">
              Airport transfers
            </div>
          </div>
          <div className="relative flex min-h-[280px] items-end">
            <Image
              src={"/business.jpg"}
              fill
              sizes="(max-width: 768px) 100vw,(max-width: 1280px) 50vw, 33vw"
              alt="img4"
              className="h-auto max-h-[280px] transform rounded-xl object-cover object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
            />
            <div className="absolute bottom-[5%] left-[3%] rounded-md bg-background px-6 py-1.5 text-text shadow-sm dark:bg-darkbg dark:text-darktext">
              Business meetings
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-4 p-2 md:p-8">
          <div className="flex flex-col md:p-10">
            <div className="mx-6 flex flex-col items-center justify-center gap-10 md:mx-0 md:flex-row">
              <h1 className="text-5xl font-bold leading-6 text-text dark:text-darktext md:py-12 md:text-4xl xl:text-7xl">
                Our Fleet
              </h1>
              <p className="max-w-[64ch] font-semibold text-gray-500 md:max-w-[32ch] md:py-12 lg:max-w-[64ch]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
                natus! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Rem veritatis nostrum sequi quisquam amet ipsa.
              </p>
            </div>
            <div className="flex flex-col">
              <Slideshow photos={photos} />
              <span className="flex justify-center pt-4">
                <Link passHref href={"/cars"}>
                  <Button className="pr-0">
                    Show more
                    <IconArrowUpRight
                      size={16}
                      className="ml-1 mr-4"
                      aria-label="arrow up right"
                    />
                  </Button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-40 mt-20">
        <div className="md:p8 mt-4 p-2">
          <div className="flex flex-col items-center justify-center gap-10 pb-6 pt-12 md:flex-row md:py-12">
            <h1 className="text-4xl font-bold leading-6 text-text dark:text-darktext md:text-5xl xl:text-7xl">
              Why Choose Us
            </h1>
            <p className="max-w-[64ch] px-6 font-semibold text-gray-500 md:max-w-[32ch] lg:max-w-[48ch]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde,
              aliquam placeat inventore laborum sint corrupti.
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
                {hotOffer.brand + " "}
                <span className="text-primaryButton">{hotOffer.name}</span>
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
                  reliable {hotOffer.engineCapacity}l engine
                </li>
                <li className="hidden items-center text-text dark:text-darktext lg:flex">
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
                  No distance limit
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
              <Link passHref href={`/car/${hotOffer.id}`} className="m-1">
                <Button className="pr-0">
                  Reserve now
                  <IconArrowUpRight
                    className="ml-1 mr-4"
                    size={16}
                    aria-label="arrow up right"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="m-2 mb-0 grid grid-cols-2 gap-3 rounded-t-3xl bg-accent p-6 pt-10 md:m-8 md:mb-0 md:p-8 lg:grid-cols-3 lg:gap-0">
          <div className="col-span-2 hidden flex-col justify-center space-y-4 p-4 lg:flex">
            <NewsForm className="relative w-3/5" />
          </div>
          <Link
            passHref
            href="/"
            className="hidden items-center justify-center lg:flex"
            ease-in-out
            duration-300
            aria-label="logo"
          >
            <Image
              className="h-auto w-auto rounded-full bg-transparent"
              src={"/logo1.png"}
              alt="logo"
              width={32}
              height={32}
              aria-label="logo"
            />
          </Link>
          <div className="hidden items-end gap-1 pl-4 text-background dark:text-darkbg lg:flex">
            <span className="flex items-center text-background dark:text-darkbg">
              <IconCopyright size={14} aria-label="copyright" />
              <h1 className="text-sm">{new Date().getFullYear()} Car-rental</h1>
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-center gap-6 text-xs font-semibold text-background dark:text-darkbg md:col-span-1 md:text-sm lg:items-end">
            {terms.map((el, index) => (
              <Link
                key={index}
                href={"/"}
                passHref
                className="duration-300 ease-in-out hover:-translate-y-1"
              >
                <h1>{el}</h1>
              </Link>
            ))}
          </div>
          <div className="flex items-end gap-1 text-background dark:text-darkbg md:hidden">
            <span className="flex items-center text-background dark:text-darkbg">
              <IconCopyright size={14} aria-label="copyright" />
              <h1 className="text-sm">{new Date().getFullYear()} Car-rental</h1>
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Link
              href={"/cars"}
              className="hidden items-center justify-start font-semibold text-background duration-300 ease-in-out hover:-translate-y-1 dark:text-darkbg lg:flex"
              aria-label="cars site"
            >
              Cars
            </Link>
            <Link
              href={"/contact"}
              className="hidden items-center justify-start font-semibold text-background duration-300 ease-in-out hover:-translate-y-1 dark:text-darkbg lg:flex"
              aria-label="contact us site"
            >
              Contact Us
            </Link>
            <div className="flex items-end justify-center gap-2 text-background dark:text-darkbg lg:justify-normal">
              {socials.map((el) => (
                <Link
                  key={el.key}
                  href={"/"}
                  className="transform duration-500 ease-in-out hover:-translate-y-1"
                  aria-label="social"
                >
                  {el.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
