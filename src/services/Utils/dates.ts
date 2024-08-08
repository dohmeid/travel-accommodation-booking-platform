import { addDays, format } from "date-fns";

const todayDate = new Date();
const tomorrowDate = addDays(new Date(), 1);

export const today = format(todayDate, "yyyy-MM-dd");
export const tomorrow = format(tomorrowDate, "yyyy-MM-dd");
