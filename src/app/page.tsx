'use client'
import Container from "@/components/Container";
import NavBar from "@/components/NavBar";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherIcon from "@/components/WeatherIcon";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { metersToKilometers } from "@/utils/mToKm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, fromUnixTime } from "date-fns";
import { parseISO } from "date-fns/parseISO";
import { ChangeEvent, useState } from "react";



export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const [currentCity, setCurrentCity] = useState('Kiev')
  // TODO CUSTOM Hook
  const { isLoading, error, data } = useQuery<WeatherData>({
    queryKey: ['weatherdata', currentCity], queryFn: async () => {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56&units=metric`)
      return data
    }
  }
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }
  const onSubmit = () => {
    if (!searchValue) {
      setCurrentCity('Kiev')
      return
    }
    setCurrentCity(searchValue)
    setSearchValue('')

  }
  console.log(data);

  const firstDate = data?.list[0]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    )
  }


  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <NavBar onChange={onChange} onSubmit={onSubmit} searchValue={searchValue} currentCity={currentCity} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
          {/*today data */}
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>
                {firstDate?.dt_txt && format(parseISO(firstDate?.dt_txt), 'EEEE')}
              </p>
              <p className="text-lg">
                {firstDate ? `(${firstDate?.dt_txt && format(parseISO(firstDate?.dt_txt), 'dd.MM.yyyy')})` : `City doesn't exist`}

              </p>
            </h2>
            <Container className="gap-10 px-6 items-center" >
              {/* temperature */}
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {Math.floor(firstDate?.main.temp ?? 0)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like  {Math.floor(firstDate?.main.feels_like ?? 0)}°</span>
                </p>
                <p className="text-sx space-x-2 whitespace-nowrap">
                  <span> {Math.floor(firstDate?.main.temp_min ?? 0)}°&darr;</span>
                  <span> {Math.floor(firstDate?.main.temp_max ?? 0)}°&uarr;</span>

                </p>
              </div>
              {/* time and weather icon */}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3 pb-3">
                {data?.list.map((d, i) => {
                  return (
                    <div key={i} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                      <p className="whitespace-nowrap">
                        {d.dt_txt && format(parseISO(d.dt_txt), 'h:mm a')}
                      </p>
                      <WeatherIcon iconName={d.weather[0].icon} />
                      <p>
                        {Math.floor(d.main.temp ?? 0)}°
                      </p>
                    </div>
                  )
                })}
              </div>
            </Container>
          </div>

          {/* additional info about current Date */}      
          <div className="flex gap-4">
            {/* left */}
                <Container className="w-fit justify-center flex-col px-4 items-center">
                  <p className="capitalize text-center">
                    {firstDate?.weather[0].description}
                  </p>
                  <WeatherIcon iconName={firstDate?.weather[0].icon ?? ''} />
                </Container>

            {/* right */}
                  <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                    <WeatherDetails 
                    airPressure={firstDate?.main.pressure ? `${firstDate.main.pressure} hPa` : ''} 
                    visibility={firstDate?.visibility ? metersToKilometers(firstDate?.visibility) : ''}
                    humidity={firstDate?.main.humidity ?`${firstDate.main.humidity}%` : ''}
                    sunrise={data?.city.sunrise ? format(fromUnixTime(data?.city.sunrise), 'H:mm') : ''}
                    sunset={data?.city.sunset ? format(fromUnixTime(data?.city.sunset), 'H:mm') : ''}
                    windSpeed={firstDate?.wind.speed ? convertWindSpeed(firstDate.wind.speed) : ''}
                    />
                  </Container>
          </div>


        </section>
        <section className="flex w-full flex-col gap-4">
          {/*forecst 7 day data */}

          <p className="text-2xl">
            Forecast (7 days)
          </p>

        </section>
      </main>
    </div>
  );
}
