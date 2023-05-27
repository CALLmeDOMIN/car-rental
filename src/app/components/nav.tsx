"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
    const [open, setOpen] = useState(false);

    const openStyles = `${
        open
            ? "translate-x-0 ease-out duration-300 backdrop-blur-sm bg-black bg-opacity-50"
            : "translate-x-full ease-in duration-300"
    } fixed inset-0 z-40 flex`;

    const closeNav = { onClick: () => setOpen(false) };

    return (
        <header className="bg-white shadow-xl">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 bg-red-600  p-1.5">
                        <span className="sr-only">Your Company</span>
                        <Image
                            className="h-8 w-auto"
                            src={"/logo1.png"}
                            alt="123"
                            width="32"
                            height="32"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        onClick={() => setOpen(true)}
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-red-600"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Link
                        href="/cars"
                        className="text-sm font-semibold leading-6 text-black"
                    >
                        Cars
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-semibold leading-6 text-black"
                    >
                        Contact Us
                    </Link>
                </div>
            </nav>
            <div
                className={openStyles}
                role="dialog"
                aria-modal="true"
                {...closeNav}
            >
                <div className="fixed inset-0 z-10"></div>
                <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <Image
                                className="h-8 w-auto"
                                src={"/logo1.png"}
                                alt="123"
                                width="32"
                                height="32"
                            />
                        </Link>
                        <button
                            onClick={() => setOpen(!open)}
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-red-600"
                        >
                            <span className="sr-only">Close menu</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10 ">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/cars"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    {...closeNav}
                                >
                                    Cars
                                </Link>
                                <Link
                                    href="/contact"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    {...closeNav}
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
