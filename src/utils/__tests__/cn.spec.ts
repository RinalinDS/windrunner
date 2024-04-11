import { describe, expect, it } from 'vitest';
import { cn } from '..';

describe('cn util function should return correct string', () => {
  it('should return default', () => {
    expect(cn('relative h-20 w-20')).toBe('relative h-20 w-20');
  });

  it('should return correctly ignore undefined', () => {
    expect(cn('relative h-20 w-20', undefined)).toBe('relative h-20 w-20');
  });

  it('should return correctly concat arguments', () => {
    expect(cn('relative ', 'h-20 w-20')).toBe('relative h-20 w-20');
  });
});
