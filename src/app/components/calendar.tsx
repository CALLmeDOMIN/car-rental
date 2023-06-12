"use client";

import React, { useState } from "react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { IconCalendar, IconColorPicker } from "@tabler/icons-react";

export default function Example() {
    const today = new Date();
    const [selected, setSelected] = useState<Date | undefined>(today);
    const [isOpen, setIsOpen] = useState(false);

    const choice = selected ? (
        <p>You selected {format(selected, "PPP")}.</p>
    ) : (
        <p>Please pick a day.</p>
    );

    const footer = (
        <span className="flex justify-center">
            <button
                className="rounded-md border p-2 shadow-sm hover:bg-gray-50 hover:shadow-md "
                onClick={() => setIsOpen(false)}
            >
                Close
            </button>
        </span>
    );

    const openStyle = isOpen
        ? "absolute z-10 w-full overflow-auto rounded-md bg-white p-4 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        : "hidden";
    return (
        <>
            <button
                type="button"
                className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center">
                    <IconCalendar />
                    <span className="ml-3 block truncate">{choice}</span>
                </span>
            </button>
            <DayPicker
                mode="single"
                required
                selected={selected}
                onSelect={setSelected}
                showOutsideDays
                className={openStyle}
                footer={footer}
            />
        </>
    );
}
