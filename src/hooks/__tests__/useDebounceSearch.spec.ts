import { describe, it } from 'vitest';
import { useDebounceSearch } from '../useDebounceSearch';
import { expect } from 'vitest';
import { renderHook } from '@testing-library/react';

describe('useDebounceSearch', () => {
  it('should return the same value when delay is not exceeded', async () => {
    const { result } = renderHook(() => useDebounceSearch('test', 100));

    expect(result.current).toBe('test');

    result.current = 'new value';

    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(result.current).toBe('new value');
  });
});
