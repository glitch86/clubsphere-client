import React, { useState } from "react";
import ClubCard from "../Components/Clubs/ClubCard";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import ClubHero from "../Components/Clubs/ClubHero";
import ClubCardContainer from "../Components/Clubs/ClubCardContainer";

const Clubs = () => {
  const [searchText, setSearchText] = useState();
  const [category, setCategory] = useState();
    console.log(category);

  const handleSearch = (e) => {
    // e.preventDefault();
    setSearchText(e.target.value);
  };
  return (
    <div className="my-8">
      <ClubHero
        handleSearch={handleSearch}
        category={category}
        setCategory={setCategory}
      ></ClubHero>
      <ClubCardContainer searchText={searchText} category={category}></ClubCardContainer>
    </div>
  );
};

export default Clubs;
