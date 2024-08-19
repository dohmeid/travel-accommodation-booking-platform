import {
  getToday,
  getTomorrow,
  getCurrentDateISO,
  getDayName,
  formatISODate,
  isValidCheckInDate,
  isValidCheckOutDate,
} from '../../utils/dates';
import { format, addDays } from 'date-fns';

describe('Date Utility Functions', () => {
  describe('getToday', () => {
    it("should return today's date in yyyy-MM-dd format", () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      expect(getToday()).toBe(today);
    });
  });

  describe('getTomorrow', () => {
    it("should return tomorrow's date in yyyy-MM-dd format", () => {
      const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
      expect(getTomorrow()).toBe(tomorrow);
    });
  });

  describe('getCurrentDateISO', () => {
    it('should return the current date in ISO 8601 format', () => {
      //eg: 2020-07-10 15:00:00.000
      const functionOutput = getCurrentDateISO();
      expect(functionOutput).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
      );
    });
  });

  describe('getDayName', () => {
    it('should return the day name for a valid ISO date string', () => {
      const date = '2024-08-19T00:00:00.000Z'; // Example date (Monday)
      const expectedDayName = 'Monday';

      expect(getDayName(date)).toBe(expectedDayName);
    });

    it('should return (Invalid date) for an invalid ISO date string', () => {
      //note: 19/08/2024 is invalid because it isn't in ISO format
      expect(getDayName('19/08/2024')).toBe('Invalid date');
    });

    it('should return (Invalid date) for an empty string', () => {
      expect(getDayName('')).toBe('Invalid date');
    });
  });

  describe('formatISODate', () => {
    it('should return a formatted date string for a valid ISO date string', () => {
      const isoDate = '2024-08-19T00:00:00.000Z'; // Example ISO date
      expect(formatISODate(isoDate)).toBe('August 19, 2024');
    });

    it('should return (Invalid date) for a date string that cannot be parsed', () => {
      const unparseableDate = '2024-08-32T00:00:00.000Z'; // Invalid date - no day 32 in any month
      expect(formatISODate(unparseableDate)).toBe('Invalid date');
    });

    it('should return (Invalid date) for an invalid ISO date string', () => {
      //note: 19/08/2024 is invalid because it isn't in ISO format
      expect(formatISODate('19/08/2024')).toBe('Invalid date');
    });

    it('should return (Invalid date) for an empty string', () => {
      expect(formatISODate('')).toBe('Invalid date');
    });
  });

  describe('isValidCheckInDate', () => {
    it('should return true if check-in date is before as check-out date', () => {
      const checkIn = '2024-08-19T00:00:00.000Z';
      const checkOut = '2024-08-20T00:00:00.000Z';
      expect(isValidCheckInDate(checkIn, checkOut)).toBe(true);
    });

    it('should return true if check-in date is same as check-out date', () => {
      const checkIn = '2024-08-19T00:00:00.000Z';
      const checkOut = '2024-08-19T00:00:00.000Z';
      expect(isValidCheckInDate(checkIn, checkOut)).toBe(true);
    });

    it('should return false if check-in date is after check-out date', () => {
      const checkIn = '2024-08-20T00:00:00.000Z';
      const checkOut = '2024-08-19T00:00:00.000Z';
      expect(isValidCheckInDate(checkIn, checkOut)).toBe(false);
    });

    it('should return false for invalid date strings', () => {
      const validDate = '10/3/2023';
      const invalidDate = '10//2023';
      expect(isValidCheckInDate(invalidDate, validDate)).toBe(false);
      expect(isValidCheckInDate(validDate, invalidDate)).toBe(false);
    });

    it('should return false for empty strings', () => {
      const validDate = '10/3/2023';
      expect(isValidCheckInDate('', validDate)).toBe(false);
      expect(isValidCheckInDate(validDate, '')).toBe(false);
      expect(isValidCheckInDate('', '')).toBe(false);
    });
  });

  describe('isValidCheckOutDate', () => {
    it('should return true if check-out date is after or same as check-in date', () => {
      const checkIn = '2024-08-19T00:00:00.000Z';
      const checkOut = '2024-08-22T00:00:00.000Z';
      expect(isValidCheckOutDate(checkIn, checkOut)).toBe(true);
    });

    it('should return false if check-out date is before check-in date', () => {
      const checkIn = '2024-08-22T00:00:00.000Z';
      const checkOut = '2024-08-19T00:00:00.000Z';
      expect(isValidCheckOutDate(checkIn, checkOut)).toBe(false);
    });
  });
});
