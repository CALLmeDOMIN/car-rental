"use client";

import React, { forwardRef, useState } from "react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { IconCalendar } from "@tabler/icons-react";

export const Calendar = forwardRef<HTMLHeadingElement, {}>(function Calendar(
    props,
    ref
) {
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
                type="button"
                className="cursor-pointer rounded-md border p-2 shadow-sm hover:bg-gray-50 hover:shadow-md"
                onClick={() => setIsOpen(false)}
                aria-label="button"
            >
                Close
            </button>
        </span>
    );

    const openStyle = isOpen
        ? "absolute top-[95%] right-1/2 translate-x-1/2 z-10 rounded-md bg-background text-text p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        : "hidden";
    return (
        <>
            <div
                className="relative w-full cursor-default rounded-md bg-background py-1.5 text-left text-text shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-button-500 sm:text-sm sm:leading-6"
                aria-expanded="true"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center">
                    <span className="px-2">
                        <IconCalendar size="18" aria-label="date" />
                    </span>
                    <h1 ref={ref} className="block truncate">
                        {choice}
                    </h1>
                </span>
            </div>
            <DayPicker
                weekStartsOn={1}
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
});
