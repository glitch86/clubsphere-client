import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Hero from "../Components/ClubDetails/Hero";
import Info from "../Components/ClubDetails/Info";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const ClubDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  // console.log(id)
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const axiosPublic = useAxiosPublic();
  // console.log(axiosSecure)
  const { data: clubInfo = [], isLoading } = useQuery({
    queryKey: ["clubInfo", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/clubs/${id}`);
      return result.data;
    },
  });

  const { _id, clubName, membershipFee, members, managerEmail } =
    clubInfo || {};

  const handlePayment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const clubInfo = {
      fee: parseInt(membershipFee),
      clubId: _id,
      userEmail: user.email,
      clubName: clubName,
      managerEmail,
    };
    const paymentInfo = {
      type: "club",
      clubInfo,
    };
    // console.log(paymentInfo);

    const updatedMembers = [...members];
    const fee = parseInt(membershipFee);
    if (fee === 0) {
      toast.success(`You're a member of ${clubName}`);

      updatedMembers.push({
        email: user.email,
      });
      axiosSecure.patch(`/clubs/${_id}/update`, { members: updatedMembers });

      return;
    }
    const res = await axiosPublic.post(
      "/payment-checkout-session",
      paymentInfo
    );

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
      </div>
    </div>
  );
};

export default ClubDetails;
