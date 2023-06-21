"use client";

import { useUser } from "@clerk/nextjs";

export default function Page() {
    const { user } = useUser();

    if (user?.id !== process.env.NEXT_PUBLIC_ADMIN_ID)
        return <div>Unauthorized</div>;

    return <div>{user?.fullName}</div>;
}
