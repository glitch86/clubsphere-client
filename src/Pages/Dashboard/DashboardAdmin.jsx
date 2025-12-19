import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Bitcoin, Calendar, User, Users } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
const DashboardAdmin = () => {
  const axiosSecure = useAxiosSecure();
  // console.log(axiosSecure)

  //   getting users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  //   getting clubs
  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const result = await axiosSecure.get("/clubs");
      return result.data;
    },
  });
  //   getting events
  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const result = await axiosSecure.get("/events");
      return result.data;
    },
  });

  //   getting membership
  const { data: memberships = [] } = useQuery({
    queryKey: ["memberships"],
    queryFn: async () => {
      const result = await axiosSecure.get("/memberships");
      return result.data;
    },
  });

  //   getting payments
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const result = await axiosSecure.get("/payments");
      return result.data;
    },
  });

  let totalAmount = 0;
  for (let i = 0; i < payments.length; i++) {
    // console.log(payments[i].amount);
    totalAmount += payments[i].amount;
  }
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div>
      <div className="p-6 space-y-6">
        {/* welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-base-200 rounded-2xl shadow p-6"
        >
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-base-content/70 mt-2">Quick Oveview</p>
        </motion.div>

        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* toatl users */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card bg-base-200 shadow rounded-2xl"
          >
            <div className="card-body flex flex-row items-center gap-4">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <Users size={35}></Users>
              </div>
              <div className="flex">
                <div>
                  <h2 className="text-sm font-medium text-base-content/70">
                    Total Users
                  </h2>
                  <p className="text-3xl font-bold">{users.length}</p>
                </div>
              </div>
            </div>
          </motion.div>
          {/* total clubs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card bg-base-200 shadow rounded-2xl"
          >
            <div className="card-body flex flex-row items-center gap-4">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <Users size={35}></Users>
              </div>
              <div className="flex">
                <div>
                  <h2 className="text-sm font-medium text-base-content/70">
                    Total Clubs
                  </h2>
                  <p className="text-3xl font-bold">{clubs.length}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* total events */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card bg-base-200 shadow rounded-2xl"
          >
            <div className="card-body flex flex-row items-center gap-4">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <Calendar size={35}></Calendar>
              </div>
              <div>
                <h2 className="text-sm font-medium text-base-content/70">
                  Total Events
                </h2>
                <p className="text-3xl font-bold">{events.length}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card bg-base-200 shadow rounded-2xl"
          >
            <div className="card-body flex flex-row items-center gap-4">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <Bitcoin size={35}></Bitcoin>
              </div>
              <div>
                <h2 className="text-sm font-medium text-base-content/70">
                  Total Payments Recevied
                </h2>
                <p className="text-3xl font-bold">{totalAmount}</p>
              </div>
            </div>
          </motion.div>

          {/* total memebership */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card bg-base-200 shadow rounded-2xl"
          >
            <div className="card-body flex flex-row items-center gap-4">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <User size={35}></User>
              </div>
              <div>
                <h2 className="text-sm font-medium text-base-content/70">
                  Total Memberships
                </h2>
                <p className="text-3xl font-bold">{memberships.length}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
