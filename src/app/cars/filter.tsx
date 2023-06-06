"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition, useState } from "react";
// import { IconPlus, IconMinus } from "@tabler/icons-react";

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
            { value: "manual", label: "Manual", checked: false },
            { value: "automatic", label: "Automatic", checked: false },
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

export default function Filter() {
    // let [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // let [open, setOpen] = useState(false);

    let { replace } = useRouter();
    let pathname = usePathname();

    let [isPending, startTransition] = useTransition();

    let handleFilterChange = (
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

    return (
        <div className="m-4 hidden w-full flex-col md:flex xl:justify-center">
            <h1 className="border-b border-gray-500 p-4 pl-0 text-xl">
                Filters
            </h1>
            {filters.map((filter) => (
                <div
                    key={filter.id}
                    className="border-b border-gray-200 py-6"
                    // onClick={() => setOpen(!open)}
                >
                    <div className="flex">
                        <h3 className="-my-3 flow-root font-medium text-gray-900">
                            {filter.label}
                        </h3>
                        {/* {open ? (
                            <IconMinus
                                className="-my-[0.65rem] ml-auto h-5 w-5"
                                aria-hidden="true"
                            />
                        ) : (
                            <IconPlus
                                className="-my-[0.65rem] ml-auto h-5 w-5"
                                aria-hidden="true"
                            />
                        )} */}
                    </div>
                    {/* {open ? ( */}
                    <div className="space-y-4 pt-6">
                        {filter.options.map((option, optionId) => (
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
                                            filter.label
                                        );
                                    }}
                                />
                                <label className="ml-3 text-sm text-gray-600">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                    {/* ) : null} */}
                </div>
            ))}
        </div>
    );
}
