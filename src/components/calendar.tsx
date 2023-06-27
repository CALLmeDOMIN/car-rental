'use client'

import React, { FunctionComponent, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

const Calendar: FunctionComponent = () => {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    })

    return (
        <Datepicker
            startWeekOn="mon"
            primaryColor="orange"
            value={value}
            onChange={(newValue: any) => setValue(newValue)}
            displayFormat={'DD/MM/YYYY'}
            inputName="calendar"
            separator={'-'}
            showFooter={true}
            inputClassName="bg-background text-text dark:bg-darkbg dark:text-darktext w-full cursor-pointer rounded-md border border-darktext p-2"
        />
    )
}

export default Calendar
