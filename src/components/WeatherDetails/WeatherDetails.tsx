import { WeatherDetailsProps } from '@/types/WeatherComponentTypes'
import React, { memo } from 'react'
import { FiDroplet } from 'react-icons/fi'
import { ImMeter } from 'react-icons/im'
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu'
import { MdAir } from 'react-icons/md'
import SingleWeatherDetail from './SingleWeatherDetail'


type WeatherDetailsType = {
    label: string;
    icon: React.ReactNode
    defaultValue: string
    propName: keyof WeatherDetailsProps
}

const WeatherDetailsArray: WeatherDetailsType[] = [
    { icon: <LuEye />, label: 'Visibility', defaultValue: '25km', propName: 'visibility' },
    { icon: <FiDroplet />, label: 'Humidity', defaultValue: '61%', propName: 'humidity' },
    { icon: <ImMeter />, label: 'Wind speed', defaultValue: '7 km/h', propName: 'windSpeed' },
    { icon: <MdAir />, label: 'Air pressure', defaultValue: '1012 hPa', propName: 'airPressure' },
    { icon: <LuSunrise />, label: 'Sunrise', defaultValue: '6:20', propName: 'sunrise' },
    { icon: <LuSunset />, label: 'Sunset', defaultValue: '18:48', propName: 'sunset' },
]

export default memo(function WeatherDetails(props: WeatherDetailsProps) {
    return (
        WeatherDetailsArray.map(detail => {
            return (
                <SingleWeatherDetail key={detail.label} icon={detail.icon} info={detail.label} value={props[detail.propName] || detail.defaultValue} />
            )
        })

    )
})

