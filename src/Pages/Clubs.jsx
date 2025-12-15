import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ClubCard from "../Components/Clubs/ClubCard";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import ClubHero from "../Components/Clubs/ClubHero";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  // console.log(axiosSecure)
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const result = await axiosSecure.get("/clubs");
      return result.data;
    },
  });

  //   console.log(clubs);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="my-8">
      <ClubHero></ClubHero>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {clubs.map((club) => (
          <ClubCard key={club._id} club={club}></ClubCard>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
