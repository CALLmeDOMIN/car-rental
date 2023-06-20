"use client";

import { IconBuildingSkyscraper } from "@tabler/icons-react";
import { IconHotelService } from "@tabler/icons-react";
import { IconMapPins, IconPlaneDeparture } from "@tabler/icons-react";
import { Icon24Hours } from "@tabler/icons-react";
import { Calendar } from "./calendar";
import { useRef } from "react";
import { Dropdown } from "./dropdown";

const locations = [
    {
        name: "Address",
        isSelected: true,
        icon: <IconMapPins size="18" aria-label="map" />,
    },
    {
        name: "Airport",
        isSelected: false,
        icon: <IconPlaneDeparture size="18" aria-label="plane" />,
    },
    {
        name: "City",
        isSelected: false,
        icon: <IconBuildingSkyscraper size="18" aria-label="building" />,
    },
    {
        name: "Hotel",
        isSelected: false,
        icon: <IconHotelService size="18" aria-label="hotel" />,
    },
];

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
            <Dropdown
                label="Pick Up Location"
                locations={locations}
                ref={pickUpRef}
            />
            <Dropdown
                label="Drop Off Location"
                locations={locations}
                ref={dropOffRef}
            />

            <span className="flex flex-col sm:leading-6">
                <h3 className="block text-sm font-medium text-text">
                    Rental Days
                </h3>
                <div
                    className="relative flex items-center justify-around"
                    aria-label="rental days input"
                >
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
                        <span className="text-gray-500 sm:text-sm">
                            <Icon24Hours size="18" aria-label="24h" />
                        </span>
                    </div>
                    <input
                        type="text"
                        name="time"
                        id="rental-days-input"
                        inputMode="numeric"
                        className="focus:ring-indigo-600 mr-2 block w-full rounded-md border-0 py-1.5 pl-8 pr-3 text-text ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                        placeholder="0"
                        pattern="[0-9]*"
                        aria-label="rental days input"
                        ref={rentDaysRef}
                    />
                    <h3 className="block text-sm font-medium text-text">
                        Days
                    </h3>
                </div>
            </span>

            <span className="flex flex-col">
                <h3 className="block text-sm font-medium leading-6 text-text">
                    Pick Up Date
                </h3>

                <Calendar ref={dateRef} />
            </span>

            <button
                type="submit"
                className="transform cursor-pointer rounded-md bg-primaryButton px-6 py-1.5 shadow-md shadow-primaryButton/30 duration-300 ease-in-out hover:shadow-xl hover:shadow-primaryButton/30"
            >
                Reserve now
            </button>
        </form>
    );
}
