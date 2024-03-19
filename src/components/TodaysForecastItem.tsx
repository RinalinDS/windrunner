import React from 'react'
import WeatherIcon from './WeatherIcon'
import { format, parseISO } from 'date-fns'

type Props = {
    icon: string
    temperature?: number
    date?: string
}

export default function TodaysForecastItem({ date, icon, temperature = 0 }: Props) {
    return (
        <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
            <p className="whitespace-nowrap">
                {date && format(parseISO(date), 'h:mm a')}
            </p>
            <WeatherIcon iconName={icon} />
            <p>
                {Math.floor(temperature)}°
            </p>
        </div>
    )
}