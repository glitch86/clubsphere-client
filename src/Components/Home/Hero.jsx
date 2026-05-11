import { motion } from "motion/react";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router";
import logo from "/icon.png";

import React from "react";

const Hero = () => {
  const text = "Find Your Community";

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
      },
    },
  };
  const child = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative -mt-24 bg-[url('/homeBanner.png')] bg-cover bg-center h-screen flex flex-col justify-center">
      <div className="absolute bg-zinc-900 h-full w-full opacity-20 "></div>
      <div className=" min-h-2/3 flex flex-col justify-center gap-9 items-center z-1">
        <div>
          <motion.p
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-center text-2xl md:text-5xl font-bold"
          >
            {text.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={child}
                className="mr-2 inline-block cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 500, damping: 12 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            className="text-center"
          >
            Connect with local clubs, workshops, and high-energy events
            happening
            <br></br>
            in your neighborhood right now.
          </motion.p>

          {/* search input  */}
          <div className="my-4">
            <div className="w-fit mx-auto flex items-center gap-2">
              <label className="input bg-neutral h-14 rounded-full">
                <input type="search" required placeholder="Search" />
              </label>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 800 }}
                className="bg-primary p-2 rounded-2xl"
              >
                <svg
                  className="h-[1em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fontSize={35}
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
