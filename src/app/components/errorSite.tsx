import Link from "next/link";

const errorCodes: { [key: number]: { title: string; description: string } } = {
    404: {
        title: "Page not found",
        description: "Sorry, we couldn't find the page you're looking for.",
    },
    401: {
        title: "Unauthorized",
        description: "Sorry, you aren't authorized to access this page.",
    },
    500: {
        title: "Internal Server Error",
        description: "Sorry, something went wrong.",
    },
};

export default function Error({
    code,
    className,
}: {
    code: number;
    className?: string;
}) {
    return (
        <main
            className={
                "grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 " +
                className
            }
        >
            <div className="text-center">
                <p className="text-base font-semibold text-red-600">{code}</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    {errorCodes[code].title}
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    {errorCodes[code].description}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href={"/"}
                        className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"
                    >
                        Go back to home
                    </Link>
                    <Link
                        href={"/"}
                        className="text-sm font-semibold text-gray-900"
                    >
                        Contact Support <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
