"use client";

import { useState, ReactNode } from "react";

type Location = { name: string; isSelected: boolean; icon: ReactNode };

export default function Dropdown({
    locations,
    label,
}: {
    locations: Location[];
    label: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    let openStyle = isOpen
        ? "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        : "hidden";

    return (
        <div className="flex flex-col">
            <label
                id="listbox-label"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="relative mt-1">
                <button
                    type="button"
                    className="relative w-full cursor-default rounded-md bg-white py-1.5 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="flex items-center">
                        {locations.map(
                            (location, id) =>
                                location.isSelected && (
                                    <div key={id} className="flex items-center">
                                        <span className="px-2">
                                            {location.icon}
                                        </span>
                                        <span className="block truncate">
                                            {location.name}
                                        </span>
                                    </div>
                                )
                        )}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </button>
                <ul
                    className={openStyle}
                    tabIndex={-1}
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-option-3"
                >
                    {locations.map((location, id) => (
                        <li
                            className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                            id={`listbox-option-${id}`}
                            key={id}
                            role="option"
                            aria-selected="true"
                            onClick={() => {
                                locations.forEach(
                                    (location) => (location.isSelected = false)
                                );
                                location.isSelected = !location.isSelected;
                                setIsOpen(false);
                            }}
                        >
                            <div className="flex items-center">
                                {location.icon}
                                <span className="ml-3 block truncate font-normal">
                                    {location.name}
                                </span>
                            </div>

                            {location.isSelected && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
