import {
    IconEngine,
    IconGasStation,
    IconHammer,
    IconHorseToy,
    IconInnerShadowRight,
    IconManualGearbox,
} from '@tabler/icons-react'
import { IconBrandSpeedtest } from '@tabler/icons-react'
import { IconPlaystationCircle } from '@tabler/icons-react'
import Slideshow, { Photo } from '@/components/slideshow'
import { CarTile } from '@/components/carTile'
import { prisma } from '@/../lib/prisma'
import DetailForm from './detailForm'
import { auth } from '@clerk/nextjs'
import { Bookmark } from '../page'
interface PageProps {
    params: {
        carId: string
    }
}

const Page = async ({ params }: PageProps) => {
    const { userId } = auth()

    let bookmarks: Bookmark[] = []

    if (userId) {
        bookmarks = (await prisma.bookmark.findMany({
            where: { userId: userId },
        })) as Bookmark[]
    }

    const car = await prisma.car.findUnique({
        where: {
            id: Number(params.carId),
        },
        select: {
            id: true,
            name: true,
            brand: true,
            price: true,
            engineCapacity: true,
            horsepower: true,
            topSpeed: true,
            transmission: true,
            description: true,
            imageUrl: true,
        },
    })

    if (!car) throw new Error('Car not found')

    const photos: Photo[] = []

    for (let i = 0; i < 6; ++i)
        photos.push({ id: i.toString(), imageUrl: car.imageUrl })

    return (
        <main className="mt-4 flex justify-center bg-background dark:bg-darkbg">
            {/* main grid */}
            <div className="grid max-w-7xl gap-6 rounded-xl p-4 md:grid-cols-3">
                <div className="col-span-2 row-span-6 w-full md:col-span-1">
                    <DetailForm
                        price={car.price}
                        className="col-span-1 flex flex-col rounded-xl bg-background p-4 text-text shadow-xl dark:bg-darkbg dark:text-darktext"
                    />
                </div>
                <div className="col-span-2 row-span-1 flex flex-col gap-8 md:flex-row">
                    <CarTile
                        imageUrl={car.imageUrl}
                        brand={car.brand}
                        name={car.name}
                        className="mx-auto gap-1 md:mx-0 md:justify-normal"
                        isBookmarked={
                            bookmarks.filter(
                                (bookmark) => bookmark.carId === car.id
                            ).length > 0
                                ? bookmarks.filter(
                                      (bookmark) => bookmark.carId === car.id
                                  )[0].id
                                : null
                        }
                        carId={car.id}
                    />
                    <div className="mx-auto ml-2 rounded-2xl bg-background p-2 px-4 shadow-md dark:bg-darkbg md:mx-0">
                        <h1 className="pb-2 text-3xl font-bold text-text dark:text-darktext">
                            Owner Info
                        </h1>
                        <p className="font-semibold text-gray-500">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Temporibus aut animi veritatis vero in qui.
                        </p>
                    </div>
                </div>
                <div className="col-span-2 row-span-1 my-4 px-2">
                    <h1 className="py-5 text-3xl font-bold text-text dark:text-darktext">
                        Vehicle Information
                    </h1>
                    <p className="font-semibold text-gray-500">
                        {car.description}
                    </p>
                </div>
                <div className="col-span-2 row-span-1 grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4  md:grid-rows-1">
                    <div className="flex transform flex-col items-center rounded-xl bg-background p-2 shadow-lg shadow-amber-700/30 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 dark:bg-darkbg">
                        <div className="aspect-square rounded-full bg-amber-600/20 p-2 text-amber-700 shadow-sm shadow-amber-700">
                            <IconEngine
                                aria-label="engine"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="font-bold uppercase text-text dark:text-darktext">
                            {car.engineCapacity.toString()[
                                car.engineCapacity.toString().length - 2
                            ] !== '.'
                                ? car.engineCapacity + '.0l'
                                : car.engineCapacity + 'l'}
                        </p>
                        <h1 className="text-sm font-bold uppercase  text-gray-500">
                            engine capacity
                        </h1>
                    </div>
                    <div className="flex transform flex-col items-center rounded-xl bg-background p-2 shadow-lg shadow-rose-700/30 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 dark:bg-darkbg">
                        <div className="aspect-square rounded-full bg-rose-600/20 p-2 text-rose-700 shadow-sm shadow-rose-700">
                            <IconHorseToy
                                aria-label="horse"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="font-bold uppercase text-text dark:text-darktext">
                            {car.horsepower}
                        </p>
                        <h1 className="text-sm font-bold uppercase  text-gray-500">
                            horsepower
                        </h1>
                    </div>
                    <div className="flex transform flex-col items-center rounded-xl bg-background p-2 shadow-lg shadow-primary-button/30 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 dark:bg-darkbg">
                        <div className="aspect-square rounded-full bg-primary-button/20 p-2 text-primary-button shadow-sm shadow-primary-button">
                            <IconBrandSpeedtest
                                aria-label="speedometer"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="font-bold text-text dark:text-darktext">
                            {car.topSpeed} km/h
                        </p>
                        <h1 className="text-sm font-bold uppercase text-gray-500">
                            top speed
                        </h1>
                    </div>
                    <div className="flex transform flex-col items-center rounded-xl bg-background p-2 shadow-lg shadow-emerald-700/30 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 dark:bg-darkbg">
                        <div className="aspect-square rounded-full bg-emerald-600/20 p-2 text-emerald-700 shadow-sm shadow-emerald-700">
                            <IconManualGearbox
                                aria-label="gearbox"
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="font-bold uppercase text-text dark:text-darktext">
                            {car.transmission}
                        </p>
                        <h1 className="text-sm font-bold uppercase text-gray-500">
                            transmission
                        </h1>
                    </div>
                </div>
                <div className="col-span-2 row-span-1 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-background p-3 py-1.5 shadow-md dark:bg-darkbg">
                        <h1 className="border-b border-text pb-3 pt-5 text-2xl font-bold capitalize text-text dark:text-darktext">
                            vehicle condition
                        </h1>
                        <ul className="space-y-2 p-2 pb-5">
                            <li className="flex gap-1">
                                <IconPlaystationCircle
                                    aria-label="circle"
                                    className="text-rose-700"
                                />
                                <h1 className="grow font-semibold text-text dark:text-darktext">
                                    New Grip Tires
                                </h1>
                                <h1 className="font-semibold text-green-400"></h1>
                            </li>
                            <li className="flex gap-1">
                                <IconGasStation
                                    aria-label="fuel"
                                    className="text-rose-700"
                                />
                                <h1 className="grow font-semibold text-text dark:text-darktext">
                                    Average Fuel Consumption
                                </h1>
                                <h1 className="font-semibold text-green-400">
                                    8 km/l
                                </h1>
                            </li>
                            <li className="flex gap-1">
                                <IconInnerShadowRight
                                    aria-label="fuel"
                                    className="text-rose-700"
                                />
                                <h1 className="grow font-semibold text-text dark:text-darktext">
                                    New Ceramic Breaks
                                </h1>
                                <h1 className="font-semibold text-green-400"></h1>
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-xl bg-background p-3 py-1.5 shadow-md dark:bg-darkbg">
                        <h1 className="border-b border-text pb-3 pt-5 text-2xl font-bold capitalize text-text dark:text-darktext">
                            Recent maintenance
                        </h1>
                        <ul className="space-y-2 p-2 pb-5">
                            <li className="flex gap-1">
                                <IconHammer
                                    aria-label="hammer"
                                    className="text-emerald-700"
                                />
                                <h1 className="grow font-semibold text-text dark:text-darktext">
                                    Lorem ipsum dolor sit amet.
                                </h1>
                                <h1 className="font-semibold text-gray-400">
                                    2 days ago
                                </h1>
                            </li>
                            <li className="flex gap-1">
                                <IconHammer
                                    aria-label="hammer"
                                    className="text-emerald-700"
                                />
                                <h1 className="grow font-semibold text-text dark:text-darktext">
                                    Lorem ipsum dolor sit amet.
                                </h1>
                                <h1 className="font-semibold text-gray-400">
                                    1 day ago
                                </h1>
                            </li>
                            <li className="flex gap-1">
                                <IconHammer
                                    aria-label="hammer"
                                    className="text-emerald-700"
                                />
                                <h1 className="grow font-semibold text-text dark:text-darktext">
                                    Lorem ipsum dolor sit amet.
                                </h1>
                                <h1 className="font-semibold text-gray-400">
                                    a week ago
                                </h1>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-2 row-span-1 rounded-xl bg-background p-3 py-1.5 shadow-md dark:bg-darkbg">
                    <h1 className="border-b border-text pb-3 pt-5 text-2xl font-bold capitalize text-text dark:text-darktext">
                        Images
                    </h1>
                    <div className="pt-3">
                        <Slideshow photos={photos} />
                    </div>
                </div>
            </div>
            {/* end of main grid */}
        </main>
    )
}

export default Page
