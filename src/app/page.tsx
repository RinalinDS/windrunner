'use client'
import NavBar from "@/components/NavBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>({queryKey: ['weatherdata'], queryFn: async () => {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`)
      return data
    }
  }
);
console.log(data);

if(isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="animate-bounce">Loading...</p>
    </div>
  )
}

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <NavBar />
    </div>
  );
}
