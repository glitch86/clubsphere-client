import React, { useState } from "react";
import EventCard from "../Components/Events/EventCard";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import { FaSearch } from "react-icons/fa";
import EventCardContainer from "../Components/Events/EventCardContainer";

const Events = () => {
  // fetch data

  const [searchText, setSearchText] = useState();
  const [paid, setPaid] = useState();

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="my-8">
      <div className="flex justify-end my-6">
        <div className=" md:block ">
          {/* <p>{searchText} search</p> */}
          <label className="input join-item bg-black">
            {" "}
            <input
              onChange={handleSearch}
              type="search"
              className=" text-white "
              placeholder="search for events"
              required
            />{" "}
          </label>
        </div>
        <button type="button" className="btn btn-primary join-item">
          <FaSearch size={17} />
        </button>
      </div>
      <div>
        <div className="flex gap-3 mb-5">
          {/* Genre Filter */}
          <select
            className="select select-bordered"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
          >
            <option value="">All</option>
            <option value={true}>Paid</option>
            <option value={false}>Free</option>
          </select>
        </div>
      </div>
      <EventCardContainer
        searchText={searchText}
        paid={paid}
      ></EventCardContainer>
    </div>
  );
};

export default Events;
