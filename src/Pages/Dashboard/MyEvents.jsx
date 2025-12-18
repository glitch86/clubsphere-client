import { useQuery } from "@tanstack/react-query";
import React, { useActionState, useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { AuthContext } from "../../Context/AuthContext";

const MyEvents = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: regs = [], isLoading } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const result = await axiosSecure.get("/registrations");
      return result.data;
    },
  });

  const filteredRegs = regs.filter((reg) => reg.userEmail === user.email);
  //   console.log(regsFiltered);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Event Title</th>
            <th>Club</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="bg-base-200">
          {/* row 1 */}
          {filteredRegs.map((reg) => (
            <tr key={reg._id}>
              <td>{reg.title}</td>
              <td>{reg.clubName}</td>
              <td>{reg.regAt}</td>
              <td>{reg.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyEvents;
