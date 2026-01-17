import React from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ClubCard from "./ClubCard";

const ClubCardContainer = ({ searchText, category }) => {
  const axiosSecure = useAxiosSecure();
  // console.log(axiosSecure)
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", searchText, category],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/clubs?searchText=${searchText || ""}`,
        {
          params: {
            category,
          },
        },
      );
      return result.data;
    },
  });

  //   console.log(clubs);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
      {clubs.map((club) => (
        <ClubCard key={club._id} club={club}></ClubCard>
      ))}
    </div>
  );
};

export default ClubCardContainer;
