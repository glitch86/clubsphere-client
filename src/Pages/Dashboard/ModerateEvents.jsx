import React from "react";
import { motion } from "motion/react";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router";
import EventModTable from "../../Components/Dashboard/EventModTable";
const ModerateEvents = () => {
  return (
    <div>
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 800 }}
      >
        <Link className="btn btn-primary" to={"/dashboard/add-events"}>
          <div className="flex items-center gap-2 shrink-0">
            <p>Add Event</p>
            <IoIosAddCircle size={22} />
          </div>
        </Link>{" "}
      </motion.div>

      <EventModTable></EventModTable>
    </div>
  );
};

export default ModerateEvents;
