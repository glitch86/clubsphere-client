import React, { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import toast from 'react-hot-toast'

const ClubMembers = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const axiosSecure = useAxiosSecure();
  const { data: memberships = [], isLoading } = useQuery({
    queryKey: ["memberships"],
    queryFn: async () => {
      const result = await axiosSecure.get("/memberships");
      return result.data;
    },
  });
  //   console.log(memberships)

  const myClubMembership = memberships.filter(
    (membership) => membership?.managerEmail === user.email
  );

  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/memberships/${id}/update`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["memeberships"]);
    },
  });

  const handleUpdateStatus = (id, status) => {
    // console.log(id, status)
    updateStatus({ id, status });
    toast.success(`Status Updated ${status}`)
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>User Email</th>
            <th>Status</th>
            <th>Join Date</th>
          </tr>
        </thead>
        <tbody className="bg-base-200">
          {/* row 1 */}
          {myClubMembership.map((club) => (
            <tr key={club._id}>
              <td>{club.userEmail}</td>
              <td>
                <div>
                  <select
                    defaultValue={club.status}
                    className="select w-full rounded-full  focus:outline-gray-200"
                  >
                    <option
                      onClick={() => handleUpdateStatus(club._id, "active")}
                      value="active"
                    >
                      Active
                    </option>
                    <option
                      onClick={() => handleUpdateStatus(club._id, "expire")}
                      value="expire"
                    >
                      expire
                    </option>
                  </select>
                </div>
              </td>
              <td>{club.joinedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubMembers;
