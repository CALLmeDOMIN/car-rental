"use client";

import { useUser } from "@clerk/nextjs";

type Params = {
    id: number;
};

export default function Page({ params }: { params: Params }) {
    const { user } = useUser();

    console.log(user);

    return <div>Hello, user</div>;
}
