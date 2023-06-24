import Link from 'next/link'
import React from 'react'

const errorCodes: { [key: number]: { title: string; description: string } } = {
    404: {
        title: 'Page not found',
        description: "Sorry, we couldn't find the page you're looking for.",
    },
    401: {
        title: 'Unauthorized',
        description: "Sorry, you aren't authorized to access this page.",
    },
    500: {
        title: 'Internal Server Error',
        description: 'Sorry, something went wrong.',
    },
}

export default function Error({
    code,
    className,
}: {
    code: number
    className?: string
}) {
    return (
        <main
            className={
                'grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 ' +
                className
            }
        >
            <div className="text-center">
                <p className="text-base font-semibold text-primary-button">
                    {code}
                </p>
                <h1 className=" mt-4 text-3xl font-bold tracking-tight text-text dark:text-darktext sm:text-5xl">
                    {errorCodes[code].title}
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-500">
                    {errorCodes[code].description}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href={'/'}
                        className="focus-visible:primary-button rounded-md bg-primary-button px-3.5 py-2.5 text-sm font-semibold text-text shadow-sm shadow-primary-button hover:shadow-md hover:shadow-primary-button focus-visible:outline focus-visible:outline-2 dark:text-darktext"
                    >
                        Go back to home
                    </Link>
                    <Link
                        passHref
                        href={'/'}
                        className="text-sm font-semibold text-accent hover:underline"
                    >
                        Contact Support <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>
        </main>
    )
}
