"use client";

import React, { useRef, useState } from "react";
import addCar from "./addCar";

export type NewCar = {
  brand: string;
  name: string;
  transmission: string;
  price: string;
  distance: string;
  passengers: string;
  capacity: string;
  engineCapacity: string;
  horsepower: string;
  topSpeed: string;
  description: string;
};

const initialCarState: NewCar = {
  brand: "",
  name: "",
  transmission: "",
  price: "",
  distance: "",
  passengers: "",
  capacity: "",
  engineCapacity: "",
  horsepower: "",
  topSpeed: "",
  description: "",
};

export default function Form() {
  const [step, setStep] = useState(1);

  const carRef = useRef<NewCar>(initialCarState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    carRef.current = { ...carRef.current, [name]: value };
  };

  return (
    <>
      <form className="flex min-h-[400px] min-w-[500px] flex-col items-center p-4 shadow-md">
        <h1 className="text-4xl font-bold text-text">Add car</h1>
        {step === 1 ? (
          <>
            <Step1
              handleChange={handleChange}
              className="flex grow flex-col justify-center"
            />
            <button
              type="button"
              className="mt-2 rounded-md bg-black p-1 px-2 font-semibold text-white"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          </>
        ) : step === 2 ? (
          <>
            <Step2 handleChange={handleChange} className="flex grow flex-col" />
            <button
              type="button"
              className="mt-2 rounded-md bg-indigo-600 p-1 px-2 font-semibold text-white"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          </>
        ) : step === 3 ? (
          <>
            <Step3 handleChange={handleChange} className="flex grow flex-col" />
            <button
              type="button"
              className="mt-2 rounded-md bg-indigo-600 p-1 px-2 font-semibold text-white"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          </>
        ) : step === 4 ? (
          <>
            <Step4 handleChange={handleChange} className="flex grow flex-col" />
            <button
              type="button"
              className="mt-2 rounded-md bg-indigo-600 p-1 px-2 font-semibold text-white"
              onClick={() => {
                setStep(step + 1);
                addCar(carRef.current);
              }}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <h1 className="grow">Done</h1>
            <button
              type="button"
              className="mt-2 rounded-md bg-indigo-600 p-1 px-2 font-semibold text-white"
              onClick={() => setStep(1)}
            >
              Add another one
            </button>
          </>
        )}
      </form>
    </>
  );
}

const Step1 = ({
  handleChange,
  className,
}: {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  className: string;
}) => {
  return (
    <div className={className}>
      <label htmlFor="brand">Brand</label>
      <input
        type="text"
        id="brand"
        name="brand"
        pattern="[a-zA-Z]*"
        onChange={handleChange}
        className="border p-1"
        required
      />

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        pattern="[a-zA-Z0-9]*"
        onChange={handleChange}
        className="border p-1"
        required
      />

      {/* TODO dropdown */}
      <label htmlFor="transmission">Transmission</label>
      <input
        type="text"
        id="transmission"
        name="transmission"
        pattern="[a-zA-Z]*"
        onChange={handleChange}
        className="border p-1"
        required
      />

      <label htmlFor="price">Price</label>
      <input
        type="text"
        id="price"
        name="price"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={handleChange}
        className="border p-1"
        required
      />
    </div>
  );
};

const Step2 = ({
  handleChange,
  className,
}: {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  className: string;
}) => {
  return (
    <div className={className}>
      <label htmlFor="passengers">Passengers</label>
      <input
        type="text"
        id="passengers"
        name="passengers"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={handleChange}
        className="border p-1"
        required
      />

      <label htmlFor="capacity">Capacity</label>
      <input
        type="text"
        id="capacity"
        name="capacity"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={handleChange}
        className="border p-1"
        required
      />

      <label htmlFor="distance">Distance</label>
      <input
        type="text"
        id="distance"
        name="distance"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={handleChange}
        className="border p-1"
        required
      />
    </div>
  );
};

const Step3 = ({
  handleChange,
  className,
}: {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  className: string;
}) => {
  return (
    <div className={className}>
      <label htmlFor="horsepower">Horsepower</label>
      <input
        type="text"
        id="horsepower"
        name="horsepower"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={handleChange}
        className="border p-1"
        required
      />

      <label htmlFor="engineCapacity">Engine capacity</label>
      <input
        type="text"
        id="engineCapacity"
        name="engineCapacity"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={handleChange}
        className="border p-1"
        required
      />

      <label htmlFor="topSpeed">Top speed</label>
      <input
        type="text"
        id="topSpeed"
        name="topSpeed"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={handleChange}
        className="border p-1"
        required
      />
    </div>
  );
};

const Step4 = ({
  handleChange,
  className,
}: {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  className: string;
}) => {
  return (
    <div className={className}>
      <label htmlFor="descripton">Descripton</label>
      <textarea
        id="description"
        name="description"
        onChange={handleChange}
        className="grow border p-1"
        required
      />
    </div>
  );
};
