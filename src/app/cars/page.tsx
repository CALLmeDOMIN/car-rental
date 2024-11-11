import { IconLuggage, IconManualGearbox, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { Search } from "./Search";
import { Filter } from "./Filter";
import CarTile from "@/components/CarTile";
import { prisma } from "@/../../lib/prisma";
import { type Bookmarks, type Cars } from "@/utils/types";

type Params = {
  search: string;
  // page: string;
  capacity: string;
  transmission: string;
  passengers: string;
  startPrice: string;
  endPrice: string;
};

const filterBySearch = (cars: Cars, search: string) => {
  return cars.filter((car) => {
    const name = car.brand.toLowerCase() + " " + car.name.toLowerCase();
    return name.toLowerCase().includes(search.toLowerCase());
  });
};

export default async function Page({ searchParams }: { searchParams: Params }) {
  const { userId } = auth();

  let bookmarks: Bookmarks = [];

  if (userId) {
    bookmarks = await prisma.bookmark.findMany({
      where: { userId: userId },
    });
  }

  const search = searchParams.search ?? "";
  const capacity = searchParams.capacity?.split(",").map(Number) ?? [1, 2, 4];
  const transmission = searchParams.transmission?.split(",") ?? [
    "Automatic",
    "Manual",
  ];
  const passengers = searchParams.passengers?.split(",").map(Number) ?? [
    2, 4, 5,
  ];
  const startPrice = Number(searchParams.startPrice) ?? 0;
  const endPrice = Number(searchParams.endPrice) ?? 999999;

  // let page = parseInt(searchParams.page ?? "1");
  // let limit = 10;
  // let offset = (page - 1) * limit;

  const cars = (await prisma.car.findMany({
    where: {
      ...(passengers.length > 0 && { passengers: { in: passengers } }),
      ...(capacity.length > 0 && { capacity: { in: capacity } }),
      ...(transmission.length > 0 && { transmission: { in: transmission } }),
      ...(startPrice &&
        endPrice && {
          price: { gte: startPrice, lte: endPrice },
        }),
    },
    select: {
      id: true,
      name: true,
      brand: true,
      imageUrl: true,
      passengers: true,
      transmission: true,
      capacity: true,
      price: true,
    },
  })) as Cars;

  const filteredCars = filterBySearch(cars, search);

  // const total = cars.length;
  // let totalPages = Math.ceil(total / limit);
  // let hasNextPage = page < totalPages;
  // let hasPreviousPage = page > 1;

  return (
    <>
      <div className="mt-4 flex items-center justify-center">
        <Search />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:flex lg:w-1/4 lg:p-4">
          <Filter />
        </div>
        <div className="mx-auto flex justify-center md:mt-5 lg:w-3/4">
          <div className="grid max-w-md gap-4 p-4 pt-0 md:max-w-3xl md:grid-cols-2 md:pt-4 lg:max-w-4xl xl:max-w-7xl 2xl:grid-cols-3">
            {filteredCars.length === 0 ? (
              <NoCarsFound />
            ) : (
              filteredCars.map((car) => (
                <Link
                  passHref
                  href={"/cars/" + car.id}
                  key={car.id}
                  className="max-h-[287px] transform overflow-x-hidden rounded-2xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl"
                >
                  <CarTile
                    imageUrl={car.imageUrl}
                    brand={car.brand}
                    name={car.name}
                    isBookmarked={
                      bookmarks.filter((bookmark) => bookmark.carId === car.id)
                        .length > 0
                        ? bookmarks.filter(
                            (bookmark) => bookmark.carId === car.id,
                          )[0].id
                        : null
                    }
                    carId={car.id}
                    displayBookmark={false}
                  />
                  <div className="flex gap-4 rounded-b-2xl p-2 pl-4">
                    <h1 className="flex items-center gap-1 text-lg font-semibold text-gray-500">
                      <IconUser size={16} aria-label="person" />
                      {car.passengers}
                    </h1>
                    <h1 className="flex items-center gap-1 text-lg font-semibold text-gray-500">
                      <IconManualGearbox size={16} aria-label="gearbox" />
                      {car.transmission}
                    </h1>
                    <h1 className="flex grow items-center gap-1 text-lg font-semibold text-gray-500">
                      <IconLuggage size={16} aria-label="luggage" />
                      {car.capacity}
                    </h1>
                    <div className="flex items-end">
                      <h1 className="font-mono text-2xl font-bold text-accent">
                        ${car.price}
                      </h1>
                      <h1 className="text-lg font-semibold text-gray-600">
                        /day
                      </h1>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const NoCarsFound = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-600">No cars found</h1>
    </div>
  );
};
