import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { motion } from "motion/react";
import { Link } from "react-router";

const MyClubCard = ({ clubId }) => {
  // console.log(clubId);

  const axiosSecure = useAxiosSecure();

  // console.log(axiosSecure)
  const { data: clubInfo = [], isLoading } = useQuery({
    queryKey: ["clubInfo", clubId],
    queryFn: async () => {
      const result = await axiosSecure.get(`/clubs/${clubId}`);
      return result.data;
    },
  });

//   console.log(clubInfo);
const {
    _id,
    bannerImage,
    clubName,
    description,
  } = clubInfo;

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
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
        </div>
      </div>
    </motion.div>
  );
};

export default MyClubCard;
