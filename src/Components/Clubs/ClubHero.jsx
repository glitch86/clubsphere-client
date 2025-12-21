import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "motion/react";

const ClubHero = ({ handleSearch }) => {
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setSearchText(e.target.value);
  // };
  return (
    <div className="flex justify-center flex-col items-center ">
      <div className="relative overflow-hidden py-32 w-full ">
        <motion.svg
          viewBox="0 0 300 500"
          className="absolute hidden md:block -z-10  h-[600px] w-[500px] left-100"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.05, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            fill="#bf0603"
            d="M30.2,-42.5C39,-35.1,46.1,-26.2,53.7,-14.6C61.4,-3,69.8,11.2,67.3,22.8C64.8,34.5,51.6,43.6,38.5,49.2C25.5,54.8,12.8,56.9,2.3,53.7C-8.1,50.5,-16.3,42.1,-30.6,36.9C-45,31.7,-65.6,29.9,-74.7,20C-83.7,10.2,-81,-7.6,-70.2,-17.1C-59.3,-26.6,-40.2,-27.8,-27.1,-33.9C-14,-39.9,-7,-51,1.8,-53.5C10.7,-56,21.3,-50,30.2,-42.5Z"
            transform="translate(100 100)"
          />
        </motion.svg>
        <div className="relative z-10 flex flex-col justify-center items-center gap-2">
          <h1 className="heading ">Search for your favourite clubs</h1>
          {/* search field */}

          <div className="flex">
            <div className=" md:block ">
              {/* <p>{searchText} search</p> */}
              <label className="input join-item bg-black">
                {" "}
                <input
                  onChange={handleSearch}
                  type="search"
                  className=" text-white "
                  placeholder="search for clubs"
                  required
                />{" "}
              </label>
            </div>
            <button type="button" className="btn btn-primary join-item">
              <FaSearch size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubHero;
