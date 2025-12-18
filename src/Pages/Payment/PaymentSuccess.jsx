import { Link } from "react-router";
import { motion } from "motion/react";
import { BadgeCheck } from "lucide-react";
import { GoHome } from "react-icons/go";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="flex justify-center items-center h-3/5">
      <div className="text-center">
        <BadgeCheck size={200} className="mx-auto text-green-400"></BadgeCheck>
        <p>Payment successful.</p>
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
            <Link
              className="btn outline-primary"
              to={"/dashboard/user/my-clubs"}
            >
              <div className="flex items-center gap-2">
                <p>My Clubs</p>
                <FaArrowAltCircleLeft size={22} />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
