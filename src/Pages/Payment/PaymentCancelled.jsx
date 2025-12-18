import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { GoHome } from "react-icons/go";
import { CircleX } from "lucide-react";

const PaymentCancelled = () => {
  return (
    <div className="flex justify-center items-center h-3/5">
      <div className="text-center">
        <CircleX size={200} className="mx-auto text-red-400"></CircleX>
        <p>Payment cancelled.</p>
        <div className="flex items-center gap-2 justify-center my-4">
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 800 }}
          >
            <Link className="btn btn-primary" to={"/"}>
              <div className="flex items-center gap-2 shrink-0">
                <p>Go Home</p>
                <GoHome size={22} />
              </div>
            </Link>{" "}
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 800 }}
          >
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
