import { describe, expect, it } from 'vitest';
import { metersToKilometers } from '../mToKm';

describe('meters to kilometers util function should return correct string', () => {
  it('should return 11km with args 11234', () => {
    expect(metersToKilometers(11234)).toBe('11km');
  });
  it('should return 12km with args 11534', () => {
    expect(metersToKilometers(11534)).toBe('12km');
  });
  it('should return 0km with args 448', () => {
    expect(metersToKilometers(448)).toBe('0km');
  });
  it('should return 1km with args 548', () => {
    expect(metersToKilometers(548)).toBe('1km');
  });
});
