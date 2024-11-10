"use client";

/* eslint-disable */

import { IconArrowUpRight } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";
import Link from "next/link";
import Select from "react-select";

const options = [
  { value: "City", label: "City" },
  { value: "Airport", label: "Airport" },
  { value: "Hotel", label: "Hotel" },
];

export default function SubmitForm({ className }: { className?: string }) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      location: "",
    },
  });

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const [, setDays] = useState(0);

  const handleDateChange = (newValue: any) => {
    setValue(newValue);
    const date1 = new Date(newValue.startDate);
    const date2 = new Date(newValue.endDate);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  };

  const onSubmit = () => {
    // console.log(data, value, days)
  };

  const styles = {
    clearIndicator: (style: any) => ({
      ...style,
      color: "#dde8ee",
    }),
    dropdownIndicator: (style: any) => ({
      ...style,
      color: "#dde8ee",
    }),
    indicatorSeparator: (style: any) => ({
      ...style,
      backgroundColor: "#dde8ee",
    }),
    placeholder: (style: any) => ({
      ...style,
      color: "#dde8ee",
    }),
    singleValue: (style: any) => ({
      ...style,
      color: "#dde8ee",
    }),
    container: (style: any) => ({
      ...style,
      color: "red",
    }),
    control: (style: any) => ({
      ...style,
      backgroundColor: "#0c1418",
      color: "red",
      padding: "2px",
      borderRadius: "6px",
      border: "1px solid #dde8ee",
    }),
    menuList: (style: any) => {
      return {
        ...style,
        backgroundColor: "#0c1418",
        color: "#dde8ee",
        borderRadius: "6px",
      };
    },
    option: (style: any) => {
      return {
        ...style,
        backgroundColor: "#0c1418",
        color: "#dde8ee",
      };
    },
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <span>
        <label htmlFor="location">Pick Up location</label>

        <div className="mb-4 mt-1 text-text dark:text-darktext">
          <Controller
            name="location"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Select
                options={options}
                onChange={(val) => {
                  onChange(val?.value);
                }}
                isClearable
                styles={styles}
              />
            )}
          />
        </div>
      </span>

      <span>
        <label
          htmlFor="calendar"
          className="block text-sm font-medium leading-6 text-text dark:text-darktext"
        >
          Pick Up and Drop Off Date
        </label>
        <div className="mb-4 mt-1">
          <Datepicker
            value={value}
            inputName="calendar"
            startWeekOn="mon"
            primaryColor="orange"
            onChange={handleDateChange}
            displayFormat={"DD/MM/YYYY"}
            separator={"-"}
            showFooter={true}
            inputClassName="bg-background text-text dark:bg-darkbg dark:text-darktext w-full cursor-pointer rounded-md border border-darktext p-2"
            placeholder="Select a date"
            useRange={false}
            minDate={new Date(Date.now())}
          />
        </div>
      </span>
      <Link
        passHref
        href={"/cars"}
        className="flex items-center justify-center rounded-md bg-primary-button py-2 pl-3 text-center font-semibold text-background shadow-sm shadow-primary-button duration-500 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-primary-button focus:outline-none focus:ring-4 dark:text-darkbg md:pl-6"
      >
        <button type="submit" className="flex items-center justify-center">
          <h1>Reserve now</h1>
          <IconArrowUpRight
            className="mx-2"
            size={20}
            aria-label="arrow up right"
          />
        </button>
      </Link>
    </form>
  );
}
