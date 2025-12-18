import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const result = await axiosSecure.get("/payments");
      return result.data;
    },
  });
  // console.log(payments);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Club Name</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="bg-base-200">
          {/* row 1 */}

          {payments.map((data) => (
            <tr key={data._id}>
              <td>{data?.clubName}</td>
              <td>{data.amount}</td>
              <td>{data.type}</td>
              <td>{data.status}</td>
              <td>{data.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
