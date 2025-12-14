import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import FeaturedCards from "./FeaturedCards";
import { motion } from "motion/react";

const FeaturedClubs = () => {
  const axiosSecure = useAxiosSecure();
  // console.log(axiosSecure)
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const result = await axiosSecure.get("/clubs");
      return result.data;
    },
  });

  const orderedClubs = [...clubs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 6);
  // console.log(orderedClubs);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="">
      <h1 className="heading">Featured Clubs</h1>
      <motion.div className="flex md:grid grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto py-10 h-full">
        {orderedClubs.map((club) => (
          <FeaturedCards key={club._id} club={club}></FeaturedCards>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedClubs;
