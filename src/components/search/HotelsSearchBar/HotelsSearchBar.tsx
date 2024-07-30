import React, { useRef, useState, FC, ChangeEvent } from "react";
import classes from "./HotelsSearchBar.module.css";
import DatePicker from "./DatePicker/DatePicker";
import GuestDropdown from "./GuestDropdown/GuestDropdown";
import { format, addDays, parseISO } from "date-fns";
import { SearchQuery } from "../../../interfaces/interfaces";
import { useSearchContext } from "../../../context/searchProvider";
import { useNavigate, useLocation } from "react-router-dom";

interface Guests {
  adults: number;
  children: number;
  rooms: number;
}

interface DateRange {
  checkInDate: string;
  checkOutDate: string;
}

const HotelsSearchBar: FC = () => {
  const { fetchSearchResults } = useSearchContext();
  const navigate = useNavigate();
  const location = useLocation();

  const today = new Date();
  const tomorrow = addDays(today, 1);
  const [dateRange, setDateRange] = useState<DateRange>({
    checkInDate: format(today, "yyyy-MM-dd"),
    checkOutDate: format(tomorrow, "yyyy-MM-dd"),
  });
  const [city, setCity] = useState<string>("");
  const [guestsData, setGuestsData] = useState<Guests>({
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const handleSearchButtonClick = () => {
    const searchQuery: SearchQuery = {
      checkInDate: dateRange.checkInDate,
      checkOutDate: dateRange.checkOutDate,
      city: city,
      starRate: 0,
      sort: "",
      numberOfRooms: guestsData.rooms,
      adults: guestsData.adults,
      children: guestsData.children,
    };
    console.log(searchQuery);

    fetchSearchResults(searchQuery);

    if (location.pathname !== "/main/search") {
      navigate("/main/search");
    }
  };

  return (
    <div
      className={`${classes.searchContainer} ${
        location.pathname === "/main/search" ? classes.horizontalSearchContainer : ""
      }`}
    >
      <div className={classes.searchInput}>
        <i className={`${classes.searchIcon} bi bi-search`}></i>
        <input
          type="search"
          name="search"
          aria-label="search for a string"
          placeholder="Search for hotels, cities..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className={classes.controlsContainer}>
        <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
        <GuestDropdown guestsData={guestsData} setGuestsData={setGuestsData} />
      </div>

      <button
        type="button"
        className={classes.searchButton}
        onClick={handleSearchButtonClick}
      >
        Search
      </button>
    </div>
  );
};

export default HotelsSearchBar;
