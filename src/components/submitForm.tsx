"use client";

import { IconBuildingSkyscraper } from "@tabler/icons-react";
import { IconHotelService } from "@tabler/icons-react";
import { IconMapPins, IconPlaneDeparture } from "@tabler/icons-react";
import { Icon24Hours } from "@tabler/icons-react";
import { Calendar } from "./calendar";
import { useRef } from "react";
import { Dropdown } from "./dropdown";
import { IconArrowUpRight } from "@tabler/icons-react";

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
        <h3 className="block text-sm font-medium text-text dark:text-darktext">
          Rental Days
        </h3>
        <div
          className="relative flex items-center justify-around"
          aria-label="rental days input"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
            <span className="text-text dark:text-darktext sm:text-sm">
              <Icon24Hours size="18" aria-label="24h" />
            </span>
          </div>
          <input
            type="text"
            name="time"
            id="rental-days-input"
            inputMode="numeric"
            className="focus:ring-primary-button mr-2 bg-background dark:bg-darkbg block w-full rounded-md border-0 py-1.5 pl-8 pr-3 text-text dark:placeholder:text-darktext ring-1 ring-inset ring-gray-300 placeholder:text-text dark:text-darktext focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="0"
            pattern="[0-9]*"
            aria-label="rental days input"
            ref={rentDaysRef}
          />
          <h3 className="block text-sm font-medium text-text dark:text-darktext">
            Days
          </h3>
        </div>
      </span>

      <span className="flex flex-col">
        <h3 className="block text-sm font-medium leading-6 text-text dark:text-darktext">
          Pick Up Date
        </h3>

        <Calendar ref={dateRef} />
      </span>

      <button
        type="submit"
        className="flex transform items-center justify-center rounded-md bg-primary-button py-2 pl-3 text-center font-semibold text-background dark:text-darkbg shadow-sm shadow-primary-button duration-500 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-primary-button focus:outline-none focus:ring-4 md:pl-6"
      >
        <h1>Reserve now</h1>
        <IconArrowUpRight
          className="mx-2"
          size={20}
          aria-label="arrow up right"
        />
      </button>
    </form>
  );
}
