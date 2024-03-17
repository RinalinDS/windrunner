import Container from './Container'
import WeatherDetails, { WeatherDetailsProps } from './WeatherDetails'
import WeatherIcon from './WeatherIcon'

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

export default function ForecastWeatherDetail({ weatherIcon = '02d', date = '19.09', day = 'Tuesday', temp, feelsLike, tempMax, tempMin, description, ...rest }: Props) {
    return (
        <Container className='gap-4'>
            {/* left section*/}
            <section className='flex gap-4 items-center px-4'>

                {/* left part of left section*/}

                <div className='flex flex-col gap-1 items-center'>
                    <WeatherIcon iconName={weatherIcon} />
                    <p>{date}</p>
                    <p className='text-sm'>{day}</p>
                </div>


                {/* right part of left section*/}
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
            </section>

            {/* right section*/}

            <section className='overflow-x-auto flex justify-between w-full pr-10 px-4 gap-4'>
                <WeatherDetails {...rest} />
            </section>
        </Container>
    )
}