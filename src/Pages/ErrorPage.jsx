import React, { useEffect } from "react";
import { Link } from "react-router";
import { GoHome } from "react-icons/go";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import { motion } from "motion/react";
import NavBar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

const ErrorPage = () => {
  const theme = localStorage.getItem("theme") || "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div>
      <div className="container mx-auto h-screen">
        <NavBar></NavBar>
        <div className="flex justify-center items-center h-3/5">
          <div className="text-center">
            <h1 className="goth text-9xl">404</h1>
            <p>Page not found</p>
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
                <Link className="btn outline-primary" to={-1}>
                  <div className="flex items-center gap-2">
                    <p>Go Back</p>
                    <FaArrowAltCircleLeft size={22} />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;
