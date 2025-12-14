import React, { useContext } from "react";
import { Link } from "react-router";
import AuthProvider from "../../Context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const ClubCard = ({ club }) => {
  // console.log(club);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // getting club data
  const {
    _id,
    bannerImage,
    clubName,
    description,
    membershipFee,
    status,
    members,
  } = club;

  // payment
  const handlePayment = async () => {
    const clubInfo = {
      fee: parseInt(membershipFee),
      clubId: _id,
      userEmail: user.email,
      clubName: clubName,
    };
    const updatedMembers = [...members];

    if (membershipFee === 0) {
      toast.success(`You're a member of ${clubName}`);

      updatedMembers.push({
        email: user.email,
      });
      axiosSecure.patch(`/clubs/${_id}/update`, { members: updatedMembers });

      return;
    }
    // console.log(clubInfo)
    const res = await axiosSecure.post("/payment-checkout-session", clubInfo);

    // console.log(res.data.url);
    window.location.assign(res.data.url);
  };

  if (status !== "approved") {
    return;
  }

  return (
    <motion.div
      className="card bg-base-200 w-72 lg:w-80 shadow-sm mx-auto "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
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
          <button
            onClick={() => handlePayment()}
            className="btn btn-outline flex-1 rounded-xl"
            disabled={members.some((member) => member.email === user.email)}
          >
            Join Now{" "}
            <span className={`text-yellow-300 `}>${membershipFee}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubCard;
