import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Link } from "react-router";

const ClubTable = () => {
  // fetch data
  const axiosSecure = useAxiosSecure();
  // console.log(axiosSecure)
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const result = await axiosSecure.get("/clubs");
      return result.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Catergory</th>
            <th>Membership Fee</th>
            <th>Created At</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody className="bg-base-200">
          {/* row 1 */}

          {clubs.map((club) => (
            <tr key={club._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={club.bannerImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{club.clubName}</div>
                    <div className="text-sm opacity-50">{club.location}</div>
                  </div>
                </div>
              </td>
              <td>
                {club.category}
              </td>
              <td>${club.membershipFee}</td>
              <td>{club.createdAt}</td>
              <td>{club.managerEmail}</td>
              <td>{club.status}</td>
              <th>
                <Link to={`/clubs/${club._id}`} className="btn btn-ghost btn-xs">details</Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubTable;
