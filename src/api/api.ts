import { SuggestionWeatherData } from '@/types/suggestionType';
import axios, { CancelTokenSource } from 'axios';

export const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

type Params = {
  latitude: number;
  longitude: number;
};

export const WeatherApi = {
  getUniqueSuggestions: async (
    debouncedSearchValue: string,
    cancelTokenSource: CancelTokenSource
  ) => {
    try {
      const response = await instance.get<SuggestionWeatherData>(
        `find?q=${debouncedSearchValue}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`,
        {
          cancelToken: cancelTokenSource.token, // Pass the cancel token to the request
        }
      );
      const suggestions = response.data.list.map((item) => item.name);
      const uniqueSuggestion = [...new Set(suggestions)];

      return uniqueSuggestion;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      }
      return [];
    }
  },

  getCityByCoords: async ({ latitude, longitude }: Params) => {
    const response = await instance.get(
      `weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    );
    return response;
  },
};
