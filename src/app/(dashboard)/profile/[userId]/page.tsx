'use client'

import { useUser } from '@clerk/nextjs'

type Params = {
    id: number
}

export default function Page({ params }: { params: Params }) {
    const { user } = useUser()

    if (!user) return <div>Not logged in</div>

    return <div>Hello, {user?.fullName}</div>
}
