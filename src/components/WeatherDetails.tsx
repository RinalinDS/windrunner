import React from 'react'
import { FiDroplet } from 'react-icons/fi'
import { ImMeter } from 'react-icons/im'
import {LuEye, LuSunrise, LuSunset} from 'react-icons/lu'
import { MdAir } from 'react-icons/md'

type Props = {
    visibility: string
    humidity: string
    windSpeed:string
    airPressure:string
    sunrise:string
    sunset:string
}
type SingleWeatherDetailProps = {
    info: string;
    icon: React.ReactNode
    value: string
}

type WeatherDetailsType = {
    info: string;
    icon: React.ReactNode
    defaultValue: string
    propName: keyof Props
}[]

const WeatherDetailsArray:WeatherDetailsType = [
    {icon: <LuEye />, info: 'Visibility', defaultValue: '25km', propName: 'visibility' },
    {icon: <FiDroplet />, info: 'Humidity', defaultValue: '61%', propName: 'humidity' },
    {icon: <ImMeter />, info: 'Wind speed', defaultValue: '7 km/h', propName: 'windSpeed' },
    {icon: <MdAir />, info: 'Air pressure', defaultValue: '1012 hPa', propName: 'airPressure'},
    {icon: <LuSunrise />, info: 'Sunrise', defaultValue: '6:20', propName: 'sunrise'},
    {icon: <LuSunset />, info: 'Sunset', defaultValue: '18:48', propName: 'sunset'},
]

export default function WeatherDetails(props: Props) {
  return (
    WeatherDetailsArray.map(detail => {
        return (
            <SingleWeatherDetail key={detail.info} icon={detail.icon} info={detail.info} value={props[detail.propName] || detail.defaultValue}/>
        )
    })

  )
}




function SingleWeatherDetail({icon, info, value}: SingleWeatherDetailProps) {
    return (
       <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
        <p className='whitespace-nowrap'>{info}</p>
        <div className='text-3xl'>{icon}</div>
        <p>{value}</p>
       </div>
    )
}