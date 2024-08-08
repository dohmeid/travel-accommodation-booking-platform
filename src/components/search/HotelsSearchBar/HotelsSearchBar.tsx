import React, { useState, FC, ChangeEvent } from "react";
import { today, tomorrow } from "../../../services/Utils/dates";
import {
  SearchQuery,
  DateRange,
  Guests,
} from "../../../interfaces/searchTypes";
import { useSearchContext } from "../../../context/searchProvider";
import { useNavigate } from "react-router-dom";
import useCurrentPage from "../../../hooks/useCurrentPage";
import DatePicker from "./DatePicker/DatePicker";
import GuestDropdown from "./GuestDropdown/GuestDropdown";
import classes from "./HotelsSearchBar.module.css";

const HotelsSearchBar: FC = () => {
  const { isInSearchPage } = useCurrentPage();
  const { fetchSearchResults } = useSearchContext();
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState<DateRange>({
    checkInDate: today,
    checkOutDate: tomorrow,
  });
  const [city, setCity] = useState<string>("");
  const [guestsData, setGuestsData] = useState<Guests>({
    adults: 2,
    children: 0,
    numberOfRooms: 1,
  });

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearchButtonClick = () => {
    const searchQuery: SearchQuery = {
      ...dateRange,
      city: city,
      starRate: 0,
      sort: "",
      ...guestsData,
    };
    console.log(searchQuery);
    fetchSearchResults(searchQuery);

    if (!isInSearchPage) {
      navigate("/main/search");
    }
  };

  return (
    <div
      className={`${classes.searchContainer} ${
        isInSearchPage ? classes.horizontalSearchContainer : ""
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
          onChange={handleCityChange}
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
