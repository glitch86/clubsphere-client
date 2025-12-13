import React, { useContext } from "react";
import { Link } from "react-router";
import AuthProvider from "../../Context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext";

const ClubCard = ({ club }) => {
  // console.log(club);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // getting club data
  const {
    _id,
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

  // payment
  const handlePayment = async () => {
    const clubInfo = {
      fee: parseInt(membershipFee),
      clubId: _id,
      userEmail: user.email,
      clubName: clubName,
      // trackingId: club.trackingId,
    };

    // console.log(clubInfo)
    const res = await axiosSecure.post("/payment-checkout-session", clubInfo);

    // console.log(res.data.url);
    window.location.assign(res.data.url);
  };

  if(status !== 'approved'){
    return
  }

  return (
    <div
      className="card bg-base-200 w-80 md:w-96 shadow-sm mx-auto 
            transition-transform duration-300 ease-out
            hover:scale-[1.03] hover:shadow-lg"
    >
      <figure className="px-10 pt-10">
        <img src={bannerImage} alt="banner" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{clubName}</h2>
        <p className="text-left">{description}</p>
        <div className="card-actions w-full justify-center items-center">
          <Link
            to={`/clubs/${_id}`}
            className="btn btn-primary flex-1 rounded-xl"
          >
            View Details
          </Link>
          <button onClick={() => handlePayment()} className="btn btn-outline flex-1 rounded-xl">
            Join Now <span className="text-yellow-300">${membershipFee}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
