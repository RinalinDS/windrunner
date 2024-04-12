import { WeatherApi } from '@/api/api';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useNavBarData } from '../useNavbarData';
import { act } from 'react-dom/test-utils';
import { ChangeEvent } from 'react';

describe('useNavbarData', () => {
  const setCurrentCity = vi.fn();

  it('default return for useNavbarData', () => {
    const { result } = renderHook(() => useNavBarData(setCurrentCity));

    expect(result.current.error).toEqual('');
    expect(result.current.searchValue).toEqual('');
    expect(result.current.showSuggestions).toBeFalsy();
    expect(result.current.handleCurrentLocation).toBeInstanceOf(Function);
    expect(result.current.handleSubmitSearch).toBeInstanceOf(Function);
    expect(result.current.handleSuggestionClick).toBeInstanceOf(Function);
    expect(result.current.onChange).toBeInstanceOf(Function);
    expect(result.current.suggestions).toHaveLength(0);
  });

  it('getUniqueSuggestions will be called when debouncedValue changed', () => {
    vi.mock('../useDebounceSearch', () => ({
      useDebounceSearch: vi.fn().mockReturnValue('London'),
    }));

    const getUniqueSuggestionsSpy = vi.spyOn(
      WeatherApi,
      'getUniqueSuggestions'
    );
    renderHook(() => useNavBarData(setCurrentCity));

    expect(getUniqueSuggestionsSpy).toHaveBeenCalledTimes(1);

    getUniqueSuggestionsSpy.mockRestore();
    getUniqueSuggestionsSpy.mockClear();
  });

  it('onChange will cause searchValue to update and request to be called', () => {
    const { result } = renderHook(() => useNavBarData(setCurrentCity));

    const e = {
      currentTarget: {
        value: 'hello',
      },
    };
    act(() => result.current.onChange(e as ChangeEvent<HTMLInputElement>));

    expect(result.current.searchValue).toEqual('hello');

    e.currentTarget.value = 'goodbye';

    act(() => result.current.onChange(e as ChangeEvent<HTMLInputElement>));

    expect(result.current.searchValue).toEqual('goodbye');
  });

  it('should render the search input field and suggestions list', () => {
    const setCurrentCity = vi.fn();

    const { result } = renderHook(() => useNavBarData(setCurrentCity));

    expect(result.current.searchValue).toBe('');
    expect(result.current.error).toBe('');
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.showSuggestions).toBe(false);

    act(() => {
      result.current.handleSuggestionClick('New York');
    });

    expect(setCurrentCity).toHaveBeenCalledWith('New York');
  });
});
