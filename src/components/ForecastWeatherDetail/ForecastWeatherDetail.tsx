import { memo } from 'react'
import Container from '../Container'
import WeatherDetails from '../WeatherDetails/WeatherDetails'
import WeatherIcon from '../WeatherIcon'
import DayDetail from './DayDetail'
import TemperatureDetail from './TemperatureDetail'
import { WeatherDetailsProps } from '@/types/WeatherComponentTypes'

type Props = {
    weatherIcon: string
    date: string
    day: string
    temp: number
    feelsLike: number
    tempMin: number
    tempMax: number
    description: string
} & WeatherDetailsProps

export default memo(function ForecastWeatherDetail({ weatherIcon, date, day, temp, feelsLike, tempMax, tempMin, description, ...rest }: Props) {
    return (
        <Container className='gap-4'>
            <section className='flex gap-4 items-center px-4'>
                <DayDetail date={date} day={day} weatherIcon={weatherIcon} />
                <TemperatureDetail temp={temp} feelsLike={feelsLike} tempMin={tempMin} tempMax={tempMax} description={description} />
            </section>
            <section className='overflow-x-auto flex justify-between w-full pr-10 px-4 gap-4'>
                <WeatherDetails {...rest} />
            </section>
        </Container>
    )
})