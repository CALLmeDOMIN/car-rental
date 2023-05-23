import { PrismaClient } from "@prisma/client";
import Image from "next/image";

const prisma = new PrismaClient();

type Params = {
    id: number;
};

export default async function Page({ params }: { params: Params }) {
    const id = Number(params.id);
    const data = await prisma.car.findUnique({ where: { id } });
    const imageSrc = "/" + data?.id + ".jpg";

    return (
        <div>
            Car {id}:{/* {print out data wrapped in h1's} */}
            <h1>{data?.name}</h1>
            <h1>{data?.brand}</h1>
            <h1>${data?.price}</h1>
            <h1>{data?.year}</h1>
            <Image src={imageSrc} width={200} height={100} alt="carimg" />
        </div>
    );
}
