import React, { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Link } from "react-router";

const ClubTableMod = () => {
  const { user } = useContext(AuthContext);
  // fetch data
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  // console.log(axiosSecure)
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const result = await axiosSecure.get("/clubs");
      return result.data;
    },
  });

  // delete queries
  const deleteClub = useMutation({
    mutationFn: (id) => {
      axiosSecure.delete(`/clubs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
    },
  });

  const handleDeleteClub = (id) => {
    deleteClub.mutate(id);
  };

  const myClubs = clubs.filter((club) => club.managerEmail === user.email);
  // console.log(myClubs);

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
            <th>Category</th>
            <th>Created At</th>
            <th>Updated On</th>
            <th>Members</th>
            <th>View Details</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="bg-base-200">
          {/* row 1 */}
          {myClubs.map((club) => (
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
              <td>{club.category}</td>
              <td>{club.createdAt}</td>
              <td>{club.updatedAt}</td>
              <td>{club.members.length}</td>
              <th>
                <Link
                  to={`/clubs/${club._id}`}
                  className="btn btn-ghost btn-xs"
                >
                  Details
                </Link>
              </th>
              <th>
                <Link
                  to={`/dashboard/edit-clubs/${club._id}`}
                  className="btn btn-secondary"
                >
                  Edit
                </Link>
              </th>
              <th>
                <button
                  onClick={() => handleDeleteClub(club._id)}
                  className="btn btn-primary"
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubTableMod;
