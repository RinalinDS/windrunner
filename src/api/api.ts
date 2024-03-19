import { SuggestionWeatherData } from '@/types/suggestionType';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

type Params = {
  latitude: number;
  longitude: number;
};

export const WeatherApi = {
  getUniqueSuggestions: async (debouncedSearchValue: string) => {
    const response = await instance.get<SuggestionWeatherData>(
      `find?q=${debouncedSearchValue}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    );
    const suggestions = response.data.list.map((item) => item.name);
    const uniqueSuggestion = [...new Set(suggestions)];

    return uniqueSuggestion;
  },

  getCityByCoords: async ({ latitude, longitude }: Params) => {
    const response = await instance.get(
      `weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    );
    return response;
  },
};
