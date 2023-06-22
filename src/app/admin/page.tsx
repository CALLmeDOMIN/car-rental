import Error from "../components/errorSite";
import { prisma } from "../../../lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
// import Form from "./form";

export default async function Page() {
    const cars = await prisma.car.findMany();

    async function deleteRecord(data: any) {
        "use server";
        const dcar = await prisma.car.delete({
            where: {
                id: parseInt(data.get("toDelete")),
            },
        });

        revalidatePath("/admin");
    }

    const user = await currentUser();

    if (user?.id !== process.env.NEXT_PUBLIC_ADMIN_ID || !user)
        return <Error code={401} />;
    if (!cars) return <div>Loading...</div>;

    return (
        <main className="mx-auto max-w-7xl">
            <div className="flex justify-center">
                <h1 className="text-7xl text-text">Hello {user?.firstName}!</h1>
            </div>
            {/* <Form /> */}
            <div className="grid place-items-center">
                <div className="">
                    {/*    // <div className="border p-1 px-2 font-semibold">id</div>
                    <div className="border p-1 px-2 font-semibold">
                        name brand
                    </div>
                    <div className="border p-1 px-2 font-semibold">
                        transmission
                    </div>
                    <div className="border p-1 px-2 font-semibold">year</div>
                    <div className="border p-1 px-2 font-semibold">price</div>
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
                    <div className="border p-1 px-2 font-semibold">delete</div> */}
                    <form
                        action={deleteRecord}
                        className="grid grid-cols-12 text-center"
                    >
                        {cars.map((car) => (
                            <>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.id}
                                </div>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.name + " "}
                                    {car.brand}
                                </div>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.transmission}
                                </div>
                                <div className="border p-1 px-2 font-semibold">
                                    {car.year}
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
                                <button name="toDelete" value={car.id}>
                                    -
                                </button>
                            </>
                        ))}
                    </form>
                </div>
            </div>
        </main>
    );
}
