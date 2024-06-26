import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDebounceSearch } from '../useDebounceSearch';

describe('useDebounceSearch', () => {
  it('should return the same value when delay is not exceeded', async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounceSearch(value, delay),
      { initialProps: { value: 'test', delay: 100 } }
    );

    expect(result.current).toBe('test');

    rerender({ value: 'new value', delay: 150 });

    expect(result.current).toBe('test');

    act(() => {
      // vi.advanceTimersByTime(200); // works inside of act()
      vi.advanceTimersToNextTimer(); // works inside of act()
      // vi.runAllTimers(); // works inside of act()
    });
    // works;

    // await vi.advanceTimersByTimeAsync(200); // works

    // vi.advanceTimersToNextTimer(); // don';t work

    // vi.advanceTimersByTime(200); // don't work

    // vi.runAllTimers(); // don';t work

    // await new Promise((resolve) => setTimeout(resolve, 200));
    //works

    expect(result.current).toBe('new value');

    vi.useRealTimers();
  });
});
