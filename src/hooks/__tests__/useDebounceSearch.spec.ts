import { describe, it } from 'vitest';
import { useDebounceSearch } from '../useDebounceSearch';
import { expect } from 'vitest';
import { renderHook } from '@testing-library/react';

describe('useDebounceSearch', () => {
  it('should return the same value when delay is not exceeded', () => {
    const value = 'test';
    const { result } = renderHook(() => useDebounceSearch(value, 100));
    expect(result.current).toBe(value);
  });
});
