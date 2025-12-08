import React from "react";

const Hero = ({ clubInfo }) => {
  const { bannerImage, clubName, description } = clubInfo || {};

  console.log(clubInfo);
  return (
    <div className="hero  bg-base-200 rounded-2xl items-center py-9 px-8">
      <div className="hero-content w-full items-start flex-col md:flex-row-reverse">
        <div className=" bg-red-400 rounded-xl"> 
          <img src={bannerImage} className="max-w-full bg-transparent rounded-lg transform  -rotate-3 " />
        </div>
        <div>
          <h1 className="text-5xl font-bold">{clubName}</h1>
          <p className="py-6">{description}</p>
          <button className="btn btn-primary">Become a member</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
