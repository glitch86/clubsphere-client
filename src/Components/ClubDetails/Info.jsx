import React from "react";

const Info = ({ clubInfo }) => {
  const {
    _id,
    category,
    createdAt,
    location,
    managerEmail,
    members,
    membershipFee,
    status,
  } = clubInfo || {};
  // console.log(clubInfo)
  return (
    <div className="bg-base-200 rounded-2xl min-h-fit p-9 w-full">
      <h2 className="heading my-5">Club Details</h2>

      <div className="flex flex-col gap-3">
        <p><span className="text-gray-500">Catergory:</span> {category}</p>
        <p><span className="text-gray-500">Created At: </span>{createdAt}</p>
        <p><span className="text-gray-500">Location: </span>{location}</p>
        <p><span className="text-gray-500">Manager:</span> {managerEmail}</p>
        <p><span className="text-gray-500">Fee:</span> ${membershipFee}</p>
        <p>{/* Members: {members} */}</p>
      </div>
    </div>
  );
};

export default Info;
