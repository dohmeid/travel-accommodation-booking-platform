import React, { useRef, useState, FC, ChangeEvent } from "react";
import { format, parseISO } from "date-fns";
import classes from "./DatePicker.module.css";

interface DateRange {
  checkInDate: string;
  checkOutDate: string;
}

interface Props {
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

const DatePicker: FC<Props> = ({ dateRange, setDateRange }) => {
  const dateIn = useRef<HTMLInputElement>(null);
  const dateOut = useRef<HTMLInputElement>(null);

  const handleCheckInDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      checkInDate: value,
    }));
  };

  const handleCheckOutDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      checkOutDate: value,
    }));
  };

  const getDayName = (date: string): string => {
    return format(parseISO(date), "EEEE");
  };

  const openCalendar = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.showPicker();
    }
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
            ref={dateIn}
            value={dateRange.checkInDate}
            onChange={handleCheckInDateChange}
            onClick={() => openCalendar(dateIn)}
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
            ref={dateOut}
            value={dateRange.checkOutDate}
            onChange={handleCheckOutDateChange}
            onClick={() => openCalendar(dateOut)}
          />
          <p className={classes.day}>{getDayName(dateRange.checkOutDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
