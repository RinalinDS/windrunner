import { WeatherApi } from '@/api/api';
import { minCityLengthName } from '@/constants/minSizes';
import { useDebounceSearch } from '@/hooks/useDebounceSearch';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

export const useNavBarData = (setCurrentCity: (value: string) => void) => {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearchValue = useDebounceSearch(searchValue, 500);

  const handleClearSuggestions = useCallback(() => {
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  const handleSuggestionClick = useCallback(
    (value: string) => {
      setSearchValue('');
      setError('');
      setCurrentCity(value);
      handleClearSuggestions();
    },
    [setCurrentCity, handleClearSuggestions]
  );

  const onChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchValue(value);
  }, []);

  const handleSubmitSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (suggestions.length === 0) {
        setError('Location not found');
      } else {
        setError('');
        setCurrentCity(searchValue);
        setShowSuggestions(false);
        setSearchValue('');
      }
    },
    [suggestions, searchValue, setCurrentCity]
  );

  const handleCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await WeatherApi.getCityByCoords({
            latitude,
            longitude,
          });
          setCurrentCity(response.data.name);
        } catch (e) {
          console.error('Failed to fetch weather data', e);
        }
      });
    }
  }, [setCurrentCity]);

  useEffect(() => {
    const handleSearchValueChange = async () => {
      if (debouncedSearchValue.length > minCityLengthName) {
        try {
          const uniqueSuggestion =
            await WeatherApi.getUniqueSuggestions(debouncedSearchValue);
          setSuggestions(uniqueSuggestion);
          setError('');
          setShowSuggestions(true);
        } catch (e) {
          handleClearSuggestions();
        }
      } else {
        handleClearSuggestions();
      }
    };
    handleSearchValueChange();
  }, [debouncedSearchValue, handleClearSuggestions]);

  return {
    handleCurrentLocation,
    handleSubmitSearch,
    onChange,
    handleSuggestionClick,
    searchValue,
    error,
    suggestions,
    showSuggestions,
  };
};
