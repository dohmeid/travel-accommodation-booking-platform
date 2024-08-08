import React, { useRef, FC, ChangeEvent } from "react";
import { format, parseISO, isBefore, isAfter } from "date-fns";
import { today, tomorrow } from "../../../../services/Utils/dates";
import { DateRange } from "../../../../interfaces/searchTypes";
import classes from "./DatePicker.module.css";

interface Props {
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

const DatePicker: FC<Props> = ({ dateRange, setDateRange }) => {
  const dateInRef = useRef<HTMLInputElement>(null);
  const dateOutRef = useRef<HTMLInputElement>(null);
  const today = format(new Date(), "yyyy-MM-dd");

  const handleDateChange =
    (type: keyof DateRange) => (e: ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value;

      if (type === "checkInDate") {
        if (isAfter(parseISO(newDate), parseISO(dateRange.checkOutDate))) {
          alert("Check-in date cannot be later than check-out date.");
          return;
        }
      } else if (type === "checkOutDate") {
        if (isBefore(parseISO(newDate), parseISO(dateRange.checkInDate))) {
          alert("Check-out date cannot be earlier than check-in date.");
          return;
        }
      }

      setDateRange((prevDateRange) => ({
        ...prevDateRange,
        [type]: newDate,
      }));
    };

  const getDayName = (date: string) => format(parseISO(date), "EEEE");

  const openCalendar = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.showPicker();
  };

  return (
    <div className={classes.datesContainer}>
      <div className={classes.checkin}>
        <label htmlFor="checkinDate">
          Checkin <i className="bi bi-calendar-check"></i>
        </label>
        <div>
          <input
            type="date"
            id="checkinDate"
            name="checkinDate"
            min={today}
            ref={dateInRef}
            value={dateRange.checkInDate}
            onChange={handleDateChange("checkInDate")}
            onClick={() => openCalendar(dateInRef)}
          />
          <p className={classes.day}>{getDayName(dateRange.checkInDate)}</p>
        </div>
      </div>

      <div className={classes.checkout}>
        <label htmlFor="checkoutDate">
          Checkout <i className="bi bi-calendar-x"></i>
        </label>
        <div>
          <input
            type="date"
            id="checkoutDate"
            name="checkoutDate"
            min={tomorrow}
            ref={dateOutRef}
            value={dateRange.checkOutDate}
            onChange={handleDateChange("checkOutDate")}
            onClick={() => openCalendar(dateOutRef)}
          />
          <p className={classes.day}>{getDayName(dateRange.checkOutDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
