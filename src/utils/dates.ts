import { addDays, parseISO, format, isBefore, isAfter } from 'date-fns';

// Helper function to check if a date string is valid
const isValidDateString = (dateString: string): boolean => {
  const date = parseISO(dateString);
  return !isNaN(date.getTime());
};

// Get today's date in 'yyyy-MM-dd' format
export const getToday = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

// Get tomorrow's date in 'yyyy-MM-dd' format
export const getTomorrow = (): string => {
  return format(addDays(new Date(), 1), 'yyyy-MM-dd');
};

// Returns the current date in 'ISO 8601' format
export const getCurrentDateISO = (): string => {
  return new Date().toISOString();
};

// Format a date to a readable day name
export const getDayName = (isoDate: string): string => {
  return isValidDateString(isoDate)
    ? format(parseISO(isoDate), 'EEEE')
    : 'Invalid date';
};

// Convert an 'ISO 8601' date string to a formatted date string
export const formatISODate = (isoDate: string): string => {
  return isValidDateString(isoDate)
    ? parseISO(isoDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Invalid date';
};

// Utility function to validate check-in and check-out dates
export const isValidCheckInDate = (
  checkInDate: string,
  checkOutDate: string,
): boolean => {
  if (!isValidDateString(checkInDate) || !isValidDateString(checkOutDate))
    return false;
  return !isAfter(parseISO(checkInDate), parseISO(checkOutDate));
};

export const isValidCheckOutDate = (
  checkInDate: string,
  checkOutDate: string,
): boolean => {
  if (!isValidDateString(checkInDate) || !isValidDateString(checkOutDate))
    return false;
  return !isBefore(parseISO(checkOutDate), parseISO(checkInDate));
};
