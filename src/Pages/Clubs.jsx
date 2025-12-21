import React, { useState } from "react";
import ClubCard from "../Components/Clubs/ClubCard";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import ClubHero from "../Components/Clubs/ClubHero";
import ClubCardContainer from "../Components/Clubs/ClubCardContainer";

const Clubs = () => {
  const [searchText, setSearchText] = useState();
  //   console.log(clubs);

  const handleSearch = (e) => {
    // e.preventDefault();
    setSearchText(e.target.value);
  };
  return (
    <div className="my-8">
      <ClubHero handleSearch={handleSearch}></ClubHero>
      <ClubCardContainer searchText={searchText}></ClubCardContainer>
    </div>
  );
};

export default Clubs;
