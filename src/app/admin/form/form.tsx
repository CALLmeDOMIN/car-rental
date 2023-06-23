"use client";

import { useRef, useState } from "react";
import addCar from "./addCar";

export default function Form() {
    const [step, setStep] = useState(1);

    const carRef = useRef({
        brand: "",
        name: "",
        transmission: "",
        price: 0,
        distance: 0,
        passengers: 0,
        capacity: 0,
        engineCapacity: 0,
        horsepower: 0,
        topSpeed: 0,
    });

    const handleChange = (e: any) => {
        carRef.current = {
            ...carRef.current,
            [e.target.name]: e.target.value,
        };
    };

    return (
        <>
            <form className="flex flex-col items-center p-4 shadow-md min-w-[500px] min-h-[400px]">
                <h1 className="text-4xl font-bold text-text">Add car</h1>
                {step === 1 ? (
                    <>
                        <Step1
                            handleChange={handleChange}
                            className="flex flex-col grow justify-center"
                        />
                        <button
                            type="button"
                            className="mt-2 rounded-md bg-indigo-600 px-2 p-1 text-white font-semibold"
                            onClick={() => setStep(step + 1)}
                        >
                            Next
                        </button>
                    </>
                ) : step === 2 ? (
                    <>
                        <Step2
                            handleChange={handleChange}
                            className="flex flex-col grow"
                        />
                        <button
                            type="button"
                            className="mt-2 rounded-md bg-indigo-600 px-2 p-1 text-white font-semibold"
                            onClick={() => setStep(step + 1)}
                        >
                            Next
                        </button>
                    </>
                ) : step === 3 ? (
                    <>
                        <Step3
                            handleChange={handleChange}
                            className="flex flex-col grow"
                        />
                        <button
                            type="button"
                            className="mt-2 rounded-md bg-indigo-600 px-2 p-1 text-white font-semibold"
                            onClick={() => setStep(step + 1)}
                        >
                            Next
                        </button>
                    </>
                ) : step === 4 ? (
                    <>
                        <Step4
                            handleChange={handleChange}
                            className="flex flex-col grow"
                        />
                        <button
                            type="button"
                            className="mt-2 rounded-md bg-indigo-600 px-2 p-1 text-white font-semibold"
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
                            className="mt-2 rounded-md bg-indigo-600 px-2 p-1 text-white font-semibold"
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
    handleChange: any;
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
    handleChange: any;
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
    handleChange: any;
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
    handleChange: any;
    className: string;
}) => {
    return (
        <div className={className}>
            <label htmlFor="descripton">Descripton</label>
            <textarea
                id="description"
                name="description"
                onChange={handleChange}
                className="border p-1 grow"
                required
            />
        </div>
    );
};
