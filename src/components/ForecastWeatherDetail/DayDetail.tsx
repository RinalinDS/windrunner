import React from 'react'
import WeatherIcon from '../WeatherIcon'

type Props = {
    weatherIcon: string
    date: string
    day: string
}

export default function DayDetail({ weatherIcon = '02d', date = '19.09', day = 'Tuesday' }: Props) {
    return (
        <div className='flex flex-col gap-1 items-center'>
            <WeatherIcon iconName={weatherIcon} />
            <p>{date}</p>
            <p className='text-sm'>{day}</p>
        </div>
    )
}