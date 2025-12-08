import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Hero from "../Components/ClubDetails/Hero";
import Info from "../Components/ClubDetails/Info";

const ClubDetails = () => {
  const { id } = useParams();
  // console.log(id)

  const axiosSecure = useAxiosSecure();
  // console.log(axiosSecure)
  const { data: clubInfo = [], isLoading } = useQuery({
    queryKey: ["clubInfo", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/clubs/${id}`);
      return result.data;
    },
  });

  //   console.log(clubInfo)

  return (
    <div className="my-8">
      <Hero clubInfo={clubInfo}></Hero>
      <Info clubInfo={clubInfo}></Info>
    </div>
  );
};

export default ClubDetails;
