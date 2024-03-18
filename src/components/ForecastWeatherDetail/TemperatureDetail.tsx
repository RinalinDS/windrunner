import React, { memo } from 'react'

type Props = {
    temp: number
    feelsLike: number
    tempMin: number
    tempMax: number
    description: string

}

export default memo(function TemperatureDetail({ description, feelsLike, temp, tempMax, tempMin }: Props) {
    return (
        <div className='flex flex-col px-4 items-center'>
            <span className='text-5xl'>  {Math.floor(temp) ?? 0}° </span>
            <p className='text-xs space-x-1 whitespace-nowrap'>
                <span>Feels like</span>
                <span>{Math.floor(feelsLike) ?? 0}°</span>
            </p>
            <p className="text-xs space-x-2 whitespace-nowrap">
                <span> {Math.floor(tempMax ?? 0)}°&darr;</span>
                <span> {Math.floor(tempMin ?? 0)}°&uarr;</span>
            </p>
            <p className='capitalize text-center'>{description}</p>
        </div>
    )
})