"use client";

import { IconRefresh } from "@tabler/icons-react";
import Link from "next/link";
import { FunctionComponent, useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error: FunctionComponent<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary-button">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-text dark:text-darktext sm:text-5xl">
            {error.message}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-500">
            Sorry, something went wrong.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              passHref
              href={"/"}
              className="focus-visible:primary-button rounded-md bg-primary-button px-3.5 py-2.5 text-sm font-semibold text-background shadow-sm shadow-primary-button duration-300 ease-in-out hover:shadow-md hover:shadow-primary-button focus-visible:outline focus-visible:outline-2 dark:text-darkbg"
            >
              <span aria-hidden="true">&larr;</span> Go back to home
            </Link>
            <button
              className="flex items-center justify-between gap-1 rounded-md bg-secondary-button p-2 px-4 text-text shadow-sm shadow-secondary-button duration-300 ease-in-out hover:shadow-md hover:shadow-secondary-button dark:text-darkbg"
              onClick={() => reset}
            >
              Try again{" "}
              <IconRefresh className="mt-1" aria-label="refresh" size={16} />
            </button>
            <Link
              passHref
              href={"/contact"}
              className="text-sm font-semibold text-accent hover:underline"
            >
              Contact Support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Error;
