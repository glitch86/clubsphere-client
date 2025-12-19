import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Users } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

const MemberOverview = () => {
  const { user } = useContext(AuthContext);

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

  const { data: regs = [] } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const result = await axiosSecure.get("/registrations");
      return result.data;
    },
  });

  const filteredRegs = regs.filter((reg) => reg.userEmail === user.email);

  return (
    <div className="p-6 space-y-6">
      {/* welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-200 rounded-2xl shadow p-6"
      >
        <h1 className="text-2xl font-bold">Welcome</h1>
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
            <div>
              <h2 className="text-sm font-medium text-base-content/70">
                Total CLub
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
              <Calendar size={35}></Calendar>
            </div>
            <div>
              <h2 className="text-sm font-medium text-base-content/70">
                Total Events
              </h2>
              <p className="text-3xl font-bold">{filteredRegs.length}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MemberOverview;
