import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Hero = ({ clubInfo, handlePayment }) => {
  const { user } = useContext(AuthContext);
  const { bannerImage, clubName, description, members } = clubInfo || {};

  console.log(clubInfo);
  return (
    <div className="hero  bg-base-200 rounded-2xl items-center py-9 px-8">
      <div className="hero-content w-full items-start flex-col md:flex-row-reverse">
        <div className=" bg-red-400 rounded-xl">
          <img
            src={bannerImage}
            className="max-w-full bg-transparent rounded-lg transform w-2xs -rotate-3 "
          />
        </div>
        <div>
          <h1 className="text-5xl font-bold">{clubName}</h1>
          <p className="py-6">{description}</p>
          <button
            onClick={handlePayment}
            className="btn btn-primary"
            disabled={members.some((member) => member.email === user.email)}
          >
            Become a member
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
