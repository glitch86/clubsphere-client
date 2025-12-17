import React from "react";
import { motion } from "motion/react";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router";
const ModerateEvents = () => {
  return (
    <div>
      mod events
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
    </div>
  );
};

export default ModerateEvents;
