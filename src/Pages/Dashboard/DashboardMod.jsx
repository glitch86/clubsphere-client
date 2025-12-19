import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Bitcoin, Calendar, User, Users } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

const DashboardMod = () => {
  const { user } = useContext(AuthContext);
  // fetch data
  const axiosSecure = useAxiosSecure();
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const result = await axiosSecure.get("/clubs");
      return result.data;
    },
  });

  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const result = await axiosSecure.get("/events");
      return result.data;
    },
  });

  const { data: memberships = [] } = useQuery({
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

  const myEvents = events.filter((event) => event.addedBy === user.email);

  const myClubs = clubs.filter((club) => club.managerEmail === user.email);
  //   console.log(myClubs);
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
          <h1 className="text-2xl font-bold">Moderator Dashboard</h1>
          <p className="text-base-content/70 mt-2">Quick Oveview</p>
        </motion.div>

        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    Total CLub
                  </h2>
                  <p className="text-3xl font-bold">{myClubs.length}</p>
                </div>
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
                <Calendar size={35}></Calendar>
              </div>
              <div>
                <h2 className="text-sm font-medium text-base-content/70">
                  Total Events
                </h2>
                <p className="text-3xl font-bold">{myEvents.length}</p>
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
                <p className="text-3xl font-bold">{myClubMembership.length}</p>
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
                <User size={35}></User>
              </div>
              <div>
                <h2 className="text-sm font-medium text-base-content/70">
                  Total Members
                </h2>
                <p className="text-3xl font-bold">{myClubMembership.length}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMod;
