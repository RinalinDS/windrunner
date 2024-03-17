import React from 'react'
import { FiDroplet } from 'react-icons/fi'
import { ImMeter } from 'react-icons/im'
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu'
import { MdAir } from 'react-icons/md'

export type WeatherDetailsProps = {
    visibility: string
    humidity: string
    windSpeed: string
    airPressure: string
    sunrise: string
    sunset: string
}
type SingleWeatherDetailProps = {
    info: string;
    icon: React.ReactNode
    value: string
}

type WeatherDetailsType = {
    label: string;
    icon: React.ReactNode
    defaultValue: string
    propName: keyof WeatherDetailsProps
}[]

const WeatherDetailsArray: WeatherDetailsType = [
    { icon: <LuEye />, label: 'Visibility', defaultValue: '25km', propName: 'visibility' },
    { icon: <FiDroplet />, label: 'Humidity', defaultValue: '61%', propName: 'humidity' },
    { icon: <ImMeter />, label: 'Wind speed', defaultValue: '7 km/h', propName: 'windSpeed' },
    { icon: <MdAir />, label: 'Air pressure', defaultValue: '1012 hPa', propName: 'airPressure' },
    { icon: <LuSunrise />, label: 'Sunrise', defaultValue: '6:20', propName: 'sunrise' },
    { icon: <LuSunset />, label: 'Sunset', defaultValue: '18:48', propName: 'sunset' },
]

export default function WeatherDetails(props: WeatherDetailsProps) {
    return (
        WeatherDetailsArray.map(detail => {
            return (
                <SingleWeatherDetail key={detail.label} icon={detail.icon} info={detail.label} value={props[detail.propName] || detail.defaultValue} />
            )
        })

    )
}

function SingleWeatherDetail({ icon, info, value }: SingleWeatherDetailProps) {
    return (
        <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
            <p className='whitespace-nowrap'>{info}</p>
            <div className='text-3xl'>{icon}</div>
            <p>{value}</p>
        </div>
    )
}