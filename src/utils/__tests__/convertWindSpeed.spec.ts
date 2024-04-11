import { describe, expect, it } from 'vitest';
import { convertWindSpeed } from '..';

describe('convertWindSpeed util function should return correct string', () => {
  it('should return 3.6km/h with args 1', () => {
    expect(convertWindSpeed(1)).toBe('4km/h');
  });
  it('should return 0km/h with arg 0', () => {
    expect(convertWindSpeed(0)).toBe('0km/h');
  });
  it('should return 36km with arg 10', () => {
    expect(convertWindSpeed(10)).toBe('36km/h');
  });
  it('should return 11km with arg 3', () => {
    expect(convertWindSpeed(3)).toBe('11km/h');
  });
});
