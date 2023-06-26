import type { Car } from '../../cars/page'
import { prisma } from '../../../../lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import Form from './form/form'
import Img from './image/Img'
import Upload from './upload'
import Error from '../../../components/errorSite'

export default async function Page() {
    const cars = (await prisma.car.findMany()) as Car[]

    async function handleRecord(data: any) {
        'use server'
        let newCar = {}

        if (data.get('toDelete'))
            newCar = await prisma.car.delete({
                where: {
                    id: parseInt(data.get('toDelete')),
                },
            })

        revalidatePath('/admin')
    }

    const user = await currentUser()

    if (user?.id !== process.env.NEXT_PUBLIC_ADMIN_ID || !user)
        return <Error code={401} />
    if (!cars) return <div>Loading...</div>

    return (
        <main className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-7xl text-text">Hello {user?.firstName}!</h1>
                <div className="flex flex-col gap-2 md:flex-row">
                    <Form />
                    <Upload />
                </div>
                <div className="flex">
                    <form
                        action={handleRecord}
                        className="grid grid-cols-12 text-center"
                    >
                        <div className="border p-1 px-2 font-semibold">
                            brand name
                        </div>
                        <div className="border p-1 px-2 font-semibold">
                            transmission
                        </div>
                        <div className="border p-1 px-2 font-semibold">
                            price
                        </div>
                        <div className="border p-1 px-2 font-semibold">
                            distance
                        </div>
                        <div className="border p-1 px-2 font-semibold">
                            passengers
                        </div>
                        <div className="border p-1 px-2 font-semibold">
                            capacity
                        </div>
                        <div className="border p-1 px-2 font-semibold">
                            engine capacity
                        </div>
                        <div className="border p-1 px-2 font-semibold">
                            horsepower
                        </div>
                        <div className="border p-1 px-2 font-semibold">
                            top speed
                        </div>
                        <div className="border p-1 px-2 font-semibold">
                            delete
                        </div>
                        <div className="border p-1 px-2 font-semibold">
                            change picture
                        </div>
                        <div className="border p-1 px-2 font-semibold">
                            edit
                        </div>
                        {cars.map((car) => (
                            <>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.brand + ' '}
                                    {car.name}
                                </div>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.transmission}
                                </div>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.price}
                                </div>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.distance}
                                </div>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.passengers}
                                </div>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.capacity}
                                </div>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.engineCapacity}
                                </div>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.horsepower}
                                </div>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.topSpeed}
                                </div>
                                <button
                                    name="toDelete"
                                    value={car.id}
                                    className="border border-red-600 font-semibold text-red-600"
                                >
                                    -
                                </button>
                                <Img id={car.id} />
                                <button
                                    type="button"
                                    name="edit"
                                    value={car.id}
                                    className="border border-blue-600 font-semibold text-blue-600"
                                >
                                    edit
                                </button>
                            </>
                        ))}
                    </form>
                </div>
            </div>
        </main>
    )
}
