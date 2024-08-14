import { addDays, format } from "date-fns";

//get the current date and time
const todayDate = new Date();
const tomorrowDate = addDays(new Date(), 1);

export const today = format(todayDate, "yyyy-MM-dd");
export const tomorrow = format(tomorrowDate, "yyyy-MM-dd");

//returns the current date in ISO 8601 format
export const currentDateISO = todayDate.toISOString();

//convert the ISO 8601 date string to a Date object
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
