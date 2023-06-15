"use client";

import { Icon24Hours } from "@tabler/icons-react";
import { Calendar } from "./calendar";
import { useRef } from "react";
import { Dropdown } from "./dropdown";

export default function SubmitForm({ className }: { className?: string }) {
    const rentDaysRef = useRef<HTMLInputElement>(null!);
    const pickUpRef = useRef<HTMLDivElement>(null!);
    const dropOffRef = useRef<HTMLDivElement>(null!);
    const dateRef = useRef<HTMLHeadingElement>(null!);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
            pickUp: pickUpRef.current.textContent,
            dropOff: dropOffRef.current.textContent,
            rentDays: rentDaysRef.current.value,
            dateRef: dateRef.current.textContent,
        });
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            <Dropdown label="Pick Up Location" ref={pickUpRef} />
            <Dropdown label="Drop Off Location" ref={dropOffRef} />

            <span className="flex flex-col sm:leading-6">
                <h3 className="block text-sm font-medium text-gray-900">
                    Rental Days
                </h3>
                <span
                    className="relative flex items-center justify-around"
                    aria-label="rental days input"
                    id="rental-days-input"
                >
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
                        <span className="text-gray-500 sm:text-sm">
                            <Icon24Hours size="18" aria-label="24h" />
                        </span>
                    </div>
                    <input
                        type="text"
                        name="time"
                        id="time"
                        inputMode="numeric"
                        className="mr-2 block w-full rounded-md border-0 py-1.5 pl-8 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0"
                        pattern="[0-9]*"
                        aria-labelledby="rental-days-input"
                        aria-label="rental days input"
                        ref={rentDaysRef}
                    />
                    <h3 className="block text-sm font-medium text-gray-900">
                        Days
                    </h3>
                </span>
            </span>

            <span className="flex flex-col">
                <h3 className="block text-sm font-medium leading-6 text-gray-900">
                    Pick Up Date
                </h3>

                <Calendar ref={dateRef} />
            </span>

            <button
                type="submit"
                className="transform cursor-pointer rounded-md border px-6 py-1.5 shadow-md duration-300 ease-in-out hover:bg-gray-50 hover:shadow-xl"
            >
                Reserve now
            </button>
        </form>
    );
}
