import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useNavBarData } from '../useNavbarData';

describe('useNavbarData', () => {
  it('default return for useNavbarData', () => {
    const setCurrentCity = vi.fn();
    const { result } = renderHook(() => useNavBarData(setCurrentCity));
    console.log(result.current);
    expect(result.current.error).toEqual('');
    expect(result.current.searchValue).toEqual('');
    expect(result.current.showSuggestions).toBeFalsy();
    expect(result.current.handleCurrentLocation).toBeInstanceOf(Function);
    expect(result.current.handleSubmitSearch).toBeInstanceOf(Function);
    expect(result.current.handleSuggestionClick).toBeInstanceOf(Function);
    expect(result.current.onChange).toBeInstanceOf(Function);
    expect(result.current.suggestions).toHaveLength(0);
  });
});
