'use server'

import { prisma } from '../../../../../lib/prisma'

export default async function addCar(data: any) {
    'use server'
    const newCar = await prisma.car.update({
        where: {
            id: parseInt(data.id),
        },
        data: {
            imageUrl: data.url,
        },
    })
}
