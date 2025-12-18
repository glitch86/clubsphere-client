import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import MyClubCard from "../../Components/Dashboard/MyClubCard";

const MyClubs = () => {
  const axiosSecure = useAxiosSecure();
  const { data: memberships = [], isLoading } = useQuery({
    queryKey: ["memberships"],
    queryFn: async () => {
      const result = await axiosSecure.get("/memberships");
      return result.data;
    },
  });

  const myClubMembership = [
    ...new Map(
      memberships
        .filter((m) => m?.status === "active")
        .map((m) => [m.clubId, m])
    ).values(),
  ];

//   console.log(myClubMembership);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div>
        <h1 className="heading my-3">My clubs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
        {myClubMembership.map((data) => (
          <MyClubCard key={data._id} clubId={data.clubId}></MyClubCard>
        ))}
      </div>
    </div>
  );
};

export default MyClubs;
