"use client";

/* eslint-disable */

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";
import Select from "react-select";
import { Button } from "@/components/Button";

const options = [
  { value: "City", label: "City" },
  { value: "Airport", label: "Airport" },
  { value: "Hotel", label: "Hotel" },
];

type DetailFormProps = {
  className?: string;
  price: number;
};

export default function DetailForm({ className, price }: DetailFormProps) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      location: "",
    },
  });

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const [days, setDays] = useState(0);

  const handleDateChange = (newValue: any) => {
    setValue(newValue);
    const date1 = new Date(newValue.startDate);
    const date2 = new Date(newValue.endDate);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  };

  const onSubmit = (data: any) => {
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
      padding: "4px",
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
      <label htmlFor="calendar">Pick Up and Drop Off date</label>
      <div className="mb-4 p-2">
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

      <label htmlFor="location">Pick Up location</label>

      <div className="mb-4 p-2 text-text dark:text-darktext">
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

      <div className="mb-4">
        <h1>Payment Info</h1>
        <div className="m-2 flex justify-between rounded-md border border-darktext bg-transparent p-2 text-text dark:text-darktext">
          <p>Rent per day</p>
          <p>${price}</p>
        </div>
        <div className="m-2 flex justify-between rounded-md border border-darktext bg-transparent p-2 text-text dark:text-darktext">
          <p>
            Total for {days} {days !== 1 ? "days" : "day"}
          </p>
          <p>${price * days}</p>
        </div>
      </div>

      <Button>Submit</Button>
    </form>
  );
}
