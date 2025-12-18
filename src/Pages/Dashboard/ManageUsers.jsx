import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import dummy from "../../assets/dummy.png";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  // console.log(axiosSecure)
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });
//   console.log(users);
  // update status

  const { mutate: updateRole } = useMutation({
    mutationFn: ({ id, role }) =>
      axiosSecure.patch(`/users/${id}/update`, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleUpdateRole = (role, id) => {
    toast.success(`Role set to ${role}`)
    updateRole({ id, role });
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
            <th>Name</th>
            <th>email</th>
            <th>Role</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.photoURL || dummy}
                        alt="Avatar"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.displayName}</div>
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <div>
                  <select
                    defaultValue={user.role}
                    className="select w-full rounded-full  focus:outline-gray-200"
                  >
                    <option
                      onClick={() => handleUpdateRole("user", user._id)}
                      value="user"
                    >
                      User
                    </option>
                    <option
                      onClick={() => handleUpdateRole("moderator", user._id)}
                      value="moderator"
                    >
                      Moderator
                    </option>
                    <option
                      onClick={() => handleUpdateRole("admin", user._id)}
                      value="admin"
                    >
                      Admin
                    </option>
                  </select>
                </div>
              </td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
