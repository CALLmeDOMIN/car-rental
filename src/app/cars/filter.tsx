"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { IconFilter } from "@tabler/icons-react";
import Link from "next/link";
import { IconFilterX } from "@tabler/icons-react";

let filters = [
    {
        id: "capacity",
        label: "Capacity",
        options: [
            {
                value: "1",
                label: "1",
                checked: false,
            },
            {
                value: "2",
                label: "2",
                checked: false,
            },
            // {
            //     value: "3",
            //     label: "3",
            //     checked: false,
            // },
            {
                value: "4",
                label: "4",
                checked: false,
            },
        ],
    },
    {
        id: "transmission",
        label: "Transmission",
        options: [
            { value: "Manual", label: "Manual", checked: false },
            { value: "Automatic", label: "Automatic", checked: false },
        ],
    },
    {
        id: "passengers",
        label: "Passengers",
        options: [
            { value: "2", label: "2", checked: false },
            { value: "4", label: "4", checked: false },
        ],
    },
];

const filterSearchParams = (str: string) => {
    let capacity: number[] = [];
    let transmission: string[] = [];
    let passengers: number[] = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === "C") {
            capacity.push(Number(str[i + 1]));
        } else if (str[i] === "T") {
            if (str[i + 1] === "A") transmission.push("Automatic");
            else transmission.push("Manual");
        } else if (str[i] === "P") {
            passengers.push(Number(str[i + 1]));
        }
    }

    return { t: transmission, c: capacity, p: passengers };
};

export default function Filter() {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const [open0, setOpen0] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const { replace } = useRouter();
    const pathname = usePathname();

    const [isPending, startTransition] = useTransition();

    const handleFilterChange = (
        term: string,
        isChecked: boolean,
        label: string
    ) => {
        let params = new URLSearchParams(location.search);

        if (isChecked) {
            let filter = params.getAll("filter").join("");
            params.set("filter", filter + label[0] + term);
        } else {
            let filter = params.getAll("filter").join("");
            let newFilter = filter?.replace(label[0] + term, "");
            params.set("filter", newFilter ?? "");
            if (!params.getAll("filter").join("")) {
                params.delete("filter");
            }
        }
        params.delete("page");

        startTransition(() => {
            replace(`${pathname}?${params.toString()}`);
        });
    };

    useEffect(() => {
        let params = new URLSearchParams(location.search);
        let filter = params.getAll("filter").join("");
        let { t, c, p } = filterSearchParams(filter);
        console.log(t, c, p);
        filters[0].options.forEach((option) => {
            c.includes(Number(option.value))
                ? (option.checked = true)
                : (option.checked = false);
        });
        filters[1].options.forEach((option) => {
            t.includes(option.value)
                ? (option.checked = true)
                : (option.checked = false);
        });
        filters[2].options.forEach((option) => {
            p.includes(Number(option.value))
                ? (option.checked = true)
                : (option.checked = false);
        });
    }, []);

    const openStyles = `${
        mobileFilterOpen
            ? "translate-x-0 ease-out duration-300 backdrop-blur-sm bg-black bg-opacity-50"
            : "translate-x-full ease-in duration-300"
    } fixed inset-0 z-40 flex`;

    const closeNav = { onClick: () => setMobileFilterOpen(false) };

    return (
        <>
            <button onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
                <IconFilter className="block md:hidden" aria-label="filter" />
            </button>
            <div className="m-4 hidden w-full flex-col md:flex xl:justify-center">
                <h1 className="border-b border-gray-500 p-4 pl-0 text-xl">
                    Filters
                </h1>
                <div
                    key={filters[0].id}
                    className="border-b border-gray-200 py-6"
                >
                    <span onClick={() => setOpen0(!open0)}>
                        <div className="flex w-full">
                            <h3 className="-my-3 flow-root font-medium text-gray-900">
                                {filters[0].label}
                            </h3>
                            {open0 ? (
                                <IconMinus
                                    className="-my-[0.65rem] ml-auto h-5 w-5"
                                    aria-hidden="true"
                                />
                            ) : (
                                <IconPlus
                                    className="-my-[0.65rem] ml-auto h-5 w-5"
                                    aria-hidden="true"
                                />
                            )}
                        </div>
                    </span>
                    {open0 ? (
                        <div className="space-y-4 pt-6">
                            {filters[0].options.map((option, optionId) => (
                                <div
                                    key={option.value}
                                    className="flex items-center"
                                >
                                    <input
                                        id={
                                            option.value.toString() +
                                            optionId.toString()
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        type="checkbox"
                                        checked={option.checked}
                                        onChange={() => {
                                            option.checked = !option.checked;
                                            handleFilterChange(
                                                option.value,
                                                option.checked,
                                                filters[0].label
                                            );
                                        }}
                                    />
                                    <label className="ml-3 text-sm text-gray-600">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div
                    key={filters[1].id}
                    className="border-b border-gray-200 py-6"
                >
                    <div className="flex" onClick={() => setOpen1(!open1)}>
                        <h3 className="-my-3 flow-root font-medium text-gray-900">
                            {filters[1].label}
                        </h3>
                        {open1 ? (
                            <IconMinus
                                className="-my-[0.65rem] ml-auto h-5 w-5"
                                aria-hidden="true"
                            />
                        ) : (
                            <IconPlus
                                className="-my-[0.65rem] ml-auto h-5 w-5"
                                aria-hidden="true"
                            />
                        )}
                    </div>
                    {open1 ? (
                        <div className="space-y-4 pt-6">
                            {filters[1].options.map((option, optionId) => (
                                <div
                                    key={option.value}
                                    className="flex items-center"
                                >
                                    <input
                                        id={
                                            option.value.toString() +
                                            optionId.toString()
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        type="checkbox"
                                        checked={option.checked}
                                        onChange={() => {
                                            option.checked = !option.checked;
                                            handleFilterChange(
                                                option.value,
                                                option.checked,
                                                filters[1].label
                                            );
                                        }}
                                    />
                                    <label className="ml-3 text-sm text-gray-600">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div
                    key={filters[2].id}
                    className="border-b border-gray-200 py-6"
                >
                    <div className="flex" onClick={() => setOpen2(!open2)}>
                        <h3 className="-my-3 flow-root font-medium text-gray-900">
                            {filters[2].label}
                        </h3>
                        {open2 ? (
                            <IconMinus
                                className="-my-[0.65rem] ml-auto h-5 w-5"
                                aria-hidden="true"
                            />
                        ) : (
                            <IconPlus
                                className="-my-[0.65rem] ml-auto h-5 w-5"
                                aria-hidden="true"
                            />
                        )}
                    </div>
                    {open2 ? (
                        <div className="space-y-4 pt-6">
                            {filters[2].options.map((option, optionId) => (
                                <div
                                    key={option.value}
                                    className="flex items-center"
                                >
                                    <input
                                        id={
                                            option.value.toString() +
                                            optionId.toString()
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        type="checkbox"
                                        checked={option.checked}
                                        onChange={() => {
                                            option.checked = !option.checked;
                                            handleFilterChange(
                                                option.value,
                                                option.checked,
                                                filters[2].label
                                            );
                                        }}
                                    />
                                    <label className="ml-3 text-sm text-gray-600">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>

            {/* mobile */}

            <div
                className={openStyles}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile menu"
            >
                <div className="fixed inset-0 z-10" {...closeNav}></div>
                <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5"></Link>
                        <button
                            onClick={() =>
                                setMobileFilterOpen(!mobileFilterOpen)
                            }
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-black"
                            tabIndex={0}
                        >
                            <span className="sr-only">Close menu</span>
                            <IconFilterX aria-label="filter close" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10 ">
                            <div className="space-y-2 py-6">
                                <div
                                    key={filters[0].id}
                                    className="border-b border-gray-200 py-6"
                                >
                                    <span onClick={() => setOpen0(!open0)}>
                                        <div className="flex w-full">
                                            <h3 className="-my-3 flow-root font-medium text-gray-900">
                                                {filters[0].label}
                                            </h3>
                                            {open0 ? (
                                                <IconMinus
                                                    className="-my-[0.65rem] ml-auto h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <IconPlus
                                                    className="-my-[0.65rem] ml-auto h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </div>
                                    </span>
                                    {open0 ? (
                                        <div className="space-y-4 pt-6">
                                            {filters[0].options.map(
                                                (option, optionId) => (
                                                    <div
                                                        key={option.value}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            id={
                                                                option.value.toString() +
                                                                optionId.toString()
                                                            }
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            type="checkbox"
                                                            checked={
                                                                option.checked
                                                            }
                                                            onChange={() => {
                                                                option.checked =
                                                                    !option.checked;
                                                                handleFilterChange(
                                                                    option.value,
                                                                    option.checked,
                                                                    filters[0]
                                                                        .label
                                                                );
                                                            }}
                                                        />
                                                        <label className="ml-3 text-sm text-gray-600">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                                <div
                                    key={filters[1].id}
                                    className="border-b border-gray-200 py-6"
                                >
                                    <div
                                        className="flex"
                                        onClick={() => setOpen1(!open1)}
                                    >
                                        <h3 className="-my-3 flow-root font-medium text-gray-900">
                                            {filters[1].label}
                                        </h3>
                                        {open1 ? (
                                            <IconMinus
                                                className="-my-[0.65rem] ml-auto h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <IconPlus
                                                className="-my-[0.65rem] ml-auto h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </div>
                                    {open1 ? (
                                        <div className="space-y-4 pt-6">
                                            {filters[1].options.map(
                                                (option, optionId) => (
                                                    <div
                                                        key={option.value}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            id={
                                                                option.value.toString() +
                                                                optionId.toString()
                                                            }
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            type="checkbox"
                                                            checked={
                                                                option.checked
                                                            }
                                                            onChange={() => {
                                                                option.checked =
                                                                    !option.checked;
                                                                handleFilterChange(
                                                                    option.value,
                                                                    option.checked,
                                                                    filters[1]
                                                                        .label
                                                                );
                                                            }}
                                                        />
                                                        <label className="ml-3 text-sm text-gray-600">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                                <div
                                    key={filters[2].id}
                                    className="border-b border-gray-200 py-6"
                                >
                                    <div
                                        className="flex"
                                        onClick={() => setOpen2(!open2)}
                                    >
                                        <h3 className="-my-3 flow-root font-medium text-gray-900">
                                            {filters[2].label}
                                        </h3>
                                        {open2 ? (
                                            <IconMinus
                                                className="-my-[0.65rem] ml-auto h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <IconPlus
                                                className="-my-[0.65rem] ml-auto h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </div>
                                    {open2 ? (
                                        <div className="space-y-4 pt-6">
                                            {filters[2].options.map(
                                                (option, optionId) => (
                                                    <div
                                                        key={option.value}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            id={
                                                                option.value.toString() +
                                                                optionId.toString()
                                                            }
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            type="checkbox"
                                                            checked={
                                                                option.checked
                                                            }
                                                            onChange={() => {
                                                                option.checked =
                                                                    !option.checked;
                                                                handleFilterChange(
                                                                    option.value,
                                                                    option.checked,
                                                                    filters[2]
                                                                        .label
                                                                );
                                                            }}
                                                        />
                                                        <label className="ml-3 text-sm text-gray-600">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
