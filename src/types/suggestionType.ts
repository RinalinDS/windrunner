export interface SuggestionWeatherData {
  message: string;
  cod: string;
  count: number;
  list: WeatherItem[];
}

interface WeatherItem {
  id: number;
  name: string;
  dt: number;
}
