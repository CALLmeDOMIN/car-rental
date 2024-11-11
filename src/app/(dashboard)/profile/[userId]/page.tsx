import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import CarTile from "@/components/CarTile";
import { prisma } from "@/../lib/prisma";

export default async function Page() {
  const user = await currentUser();

  if (!user) throw new Error("User not found");

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: user.id,
    },
  });

  const bookmarkIds = bookmarks.map((bookmark) => bookmark.carId);

  const cars = await prisma.car.findMany({
    where: {
      id: { in: bookmarkIds },
    },
    select: {
      id: true,
      name: true,
      brand: true,
      imageUrl: true,
    },
  });

  return (
    <>
      <div className="text-center text-7xl">Hello, {user?.firstName}</div>

      <div className="mx-auto max-w-md p-4 pt-0 md:mt-5 md:max-w-3xl md:pt-4 lg:max-w-4xl xl:max-w-7xl">
        <h1 className="border-b border-darktext pb-4 pl-4 text-4xl">
          Your Bookmarks
        </h1>
        <div className="mx-auto flex items-center justify-center">
          {cars.length ? (
            <div className="grid gap-4 p-4 pt-0 md:grid-cols-2 md:pt-4 2xl:grid-cols-3">
              {cars.map((car) => (
                <Link
                  passHref
                  href={"/cars/" + car.id}
                  key={car.id}
                  className="max-h-[287px] transform rounded-2xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl"
                >
                  <CarTile
                    key={car.id}
                    name={car.name}
                    brand={car.brand}
                    carId={car.id}
                    imageUrl={car.imageUrl}
                    displayColors={false}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <h1 className="text-2xl">None</h1>
          )}
        </div>
      </div>
    </>
  );
}
