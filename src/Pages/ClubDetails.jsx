import React, { useContext } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Hero from "../Components/ClubDetails/Hero";
import Info from "../Components/ClubDetails/Info";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import { AuthContext } from "../Context/AuthContext";
import MemberTable from "../Components/ClubDetails/MemberTable";

const ClubDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
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

  const { _id, clubName, membershipFee } = clubInfo || {};

  const handlePayment = async () => {
    const clubInfo = {
      fee: membershipFee,
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

  //   console.log(clubInfo)
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="my-8">
      <Hero handlePayment={handlePayment} clubInfo={clubInfo}></Hero>
      <div className="my-8 justify-between flex flex-col md:flex-row gap-7">
        <Info clubInfo={clubInfo}></Info>
        <MemberTable></MemberTable>
      </div>
    </div>
  );
};

export default ClubDetails;
