import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type Params = {
    currentCity: string
}

const getForecast = async ({ currentCity }: Params) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=40&units=metric`)
    return data
}


export const useGetForecast = ({ currentCity }: Params) => {
    const { isLoading, data, isFetching } = useQuery<WeatherData>({
        queryKey: ['weatherdata', currentCity], 
        queryFn: () => getForecast({currentCity}),
        enabled: !!currentCity
    })
    return {
        isLoading: isLoading || isFetching,
        data
    }
}
