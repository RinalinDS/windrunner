import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { instance } from "../api"

type Params = {
    currentCity: string
}

const getForecast = async ({ currentCity }: Params) => {
    const { data } = await instance.get(`forecast?q=${currentCity}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=40&units=metric`)
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
