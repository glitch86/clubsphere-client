import React from "react";

const ClubCard = ({ club }) => {
  console.log(club);

  // getting club data
  const {
    bannerImage,
    category,
    clubName,
    createdAt,
    description,
    location,
    managerEmail,
    members,
    membershipFee,
    status,
  } = club;

  return (
    <div className="card bg-base-200 w-80 md:w-96 shadow-sm mx-auto shadow 
            transition-transform duration-300 ease-out
            hover:scale-[1.03] hover:shadow-lg">
      <figure className="px-10 pt-10">
        <img
          src={bannerImage}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{clubName}</h2>
        <p className="text-left">
          {description}
        </p>
        <div className="card-actions w-full justify-center items-center">
          <button className="btn btn-primary flex-1 rounded-xl">View Details</button>
          <button className="btn btn-outline flex-1 rounded-xl">Join Now <span className="text-yellow-300">${membershipFee}</span></button>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
