'use client'

import { IconBuildingSkyscraper } from '@tabler/icons-react'
import { IconHotelService } from '@tabler/icons-react'
import { IconMapPins, IconPlaneDeparture } from '@tabler/icons-react'
import Dropdown from './dropdown'
import { IconArrowUpRight } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import Datepicker from 'react-tailwindcss-datepicker'
import { useState } from 'react'
import Link from 'next/link'

const locations = [
    {
        name: 'Address',
        isSelected: true,
        icon: <IconMapPins size="18" aria-label="map" />,
    },
    {
        name: 'Airport',
        isSelected: false,
        icon: <IconPlaneDeparture size="18" aria-label="plane" />,
    },
    {
        name: 'City',
        isSelected: false,
        icon: <IconBuildingSkyscraper size="18" aria-label="building" />,
    },
    {
        name: 'Hotel',
        isSelected: false,
        icon: <IconHotelService size="18" aria-label="hotel" />,
    },
]

export default function SubmitForm({ className }: { className?: string }) {
    const { handleSubmit, register } = useForm({
        defaultValues: {
            location: '',
        },
    })

    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    })

    const [days, setDays] = useState(0)

    const handleDateChange = (newValue: any) => {
        setValue(newValue)
        const date1 = new Date(newValue.startDate)
        const date2 = new Date(newValue.endDate)
        const diffTime = Math.abs(date2.getTime() - date1.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        setDays(diffDays)
    }

    const onSubmit = (data: any) => {
        console.log(data, value, days)
    }

    return (
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
            <Dropdown
                label="Pick Up and Drop Off location"
                locations={locations}
                register={register}
            />

            <span>
                <label
                    htmlFor="calendar"
                    className="block text-sm font-medium leading-6 text-text dark:text-darktext"
                >
                    Pick Up and Drop Off date
                </label>
                <div>
                    <Datepicker
                        value={value}
                        inputName="calendar"
                        startWeekOn="mon"
                        primaryColor="orange"
                        onChange={handleDateChange}
                        displayFormat={'DD/MM/YYYY'}
                        separator={'-'}
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
                href={'/cars'}
                className="flex items-center justify-center rounded-md bg-primary-button py-2 pl-3 text-center font-semibold text-background shadow-sm shadow-primary-button duration-500 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-primary-button focus:outline-none focus:ring-4 dark:text-darkbg md:pl-6"
            >
                <button
                    type="submit"
                    className="flex items-center justify-center"
                >
                    <h1>Reserve now</h1>
                    <IconArrowUpRight
                        className="mx-2"
                        size={20}
                        aria-label="arrow up right"
                    />
                </button>
            </Link>
        </form>
    )
}
