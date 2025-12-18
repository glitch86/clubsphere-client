import React from "react";
import ClubTableMod from "../../Components/Dashboard/ClubTableMod";
import { Link } from "react-router";
import { motion } from "motion/react";
import { IoIosAddCircle } from "react-icons/io";

const ModerateClubs = () => {
  return (
    <div>
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 800 }}
      >
        <Link className="btn btn-primary" to={"/dashboard/add-clubs"}>
          <div className="flex items-center gap-2 shrink-0">
            <p>Add Clubs</p>
            <IoIosAddCircle size={22} />
          </div>
        </Link>{" "}
      </motion.div>
      <ClubTableMod></ClubTableMod>
    </div>
  );
};

export default ModerateClubs;
