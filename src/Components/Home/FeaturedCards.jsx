import React from "react";
import { Link } from "react-router";
import { easeOut, motion } from "motion/react";

const FeaturedCards = ({ club }) => {
  // getting club data
  const { _id, bannerImage, clubName, description, status } = club;

  if (status !== "approved") {
    return;
  }

  return (
    <motion.div
      className="card bg-base-200 shrink-0 w-64 lg:w-96 shadow-sm mx-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{once:true}}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 100, damping: 12, }}
    >
      <figure className="px-2 py-2 md:px-10 md:pt-10">
        <img src={bannerImage} alt="banner" className="rounded-xl" />
      </figure>
      <div className="card-body p-2 items-center text-center">
        <h2 className="card-title">{clubName}</h2>
        <p className="text-left ">{description}</p>
        <div className="card-actions w-full justify-center items-center">
          <Link
            to={`/clubs/${_id}`}
            className="btn btn-primary flex-1 rounded-xl"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedCards;
