import React, { useRef, FC, ChangeEvent } from "react";
import { format, parseISO, isBefore, isAfter } from "date-fns";
import { today, tomorrow } from "../../../../services/Utils/dates";
import { SearchQuery } from "../../../../interfaces/searchTypes";
import classes from "./DatePicker.module.css";

interface Props {
  currentSearchQuery: SearchQuery;
  setCurrentSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>;
}

const DatePicker: FC<Props> = ({
  currentSearchQuery,
  setCurrentSearchQuery,
}) => {
  const dateInRef = useRef<HTMLInputElement>(null);
  const dateOutRef = useRef<HTMLInputElement>(null);

  const handleDateChange =
    (type: "checkInDate" | "checkOutDate") =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value;

      if (type === "checkInDate") {
        if (
          isAfter(parseISO(newDate), parseISO(currentSearchQuery.checkOutDate))
        ) {
          alert("Check-in date cannot be later than check-out date.");
          return;
        }
      } else if (type === "checkOutDate") {
        if (
          isBefore(parseISO(newDate), parseISO(currentSearchQuery.checkInDate))
        ) {
          alert("Check-out date cannot be earlier than check-in date.");
          return;
        }
      }

      setCurrentSearchQuery({
        ...currentSearchQuery,
        [type]: newDate,
      });
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
            value={currentSearchQuery.checkInDate}
            onChange={handleDateChange("checkInDate")}
            onClick={() => openCalendar(dateInRef)}
          />
          <p className={classes.day}>
            {getDayName(currentSearchQuery.checkInDate)}
          </p>
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
            value={currentSearchQuery.checkOutDate}
            onChange={handleDateChange("checkOutDate")}
            onClick={() => openCalendar(dateOutRef)}
          />
          <p className={classes.day}>
            {getDayName(currentSearchQuery.checkOutDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
