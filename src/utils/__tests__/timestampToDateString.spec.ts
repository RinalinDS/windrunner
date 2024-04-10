import { describe, it, expect, test } from 'vitest';
import { timestampToDateString } from '../timestampToDateString';

describe('timestampToDateString', () => {
  it('should return the correct date for a given timestamp', () => {
    const timestamp = 1618085994;
    const expectedDate = '2021-04-10';

    const result = timestampToDateString(timestamp);

    expect(result).toBe(expectedDate);
  });

  it("should return today's date for the current timestamp", () => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expectedDate = new Date(currentTimestamp * 1000)
      .toISOString()
      .split('T')[0];

    const result = timestampToDateString(currentTimestamp);

    expect(result).toBe(expectedDate);
  });

  it('should return the correct date for a negative timestamp', () => {
    const timestamp = -86400;
    const expectedDate = '1969-12-31';

    const result = timestampToDateString(timestamp);

    expect(result).toBe(expectedDate);
  });
  it('should return an empty string for an invalid timestamp', () => {
    const timestamp = 'weird string';
    const result = timestampToDateString(timestamp as any);

    expect(result).toBe('');
  });
});
