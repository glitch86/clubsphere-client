import { motion } from "motion/react";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router";
import logo from '/icon.png'

import React from "react";

const Hero = () => {
  const text = "SAY HELLO TO FRIENDSHIP";

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
    <div className="py-9 relative">
      <div>
        <img src={logo} alt="logo" className="w-6 h-6 object-contain absolute" />
        <img src={logo} alt="logo" className="  w-10 h-10 object-contain absolute right-0 -top-3" />
        <img src={logo} alt="logo" className=" hidden md:block w-14 h-14 object-contain absolute bottom-6/12 left-1/5" />
        <img src={logo} alt="logo" className="hidden md:block w-18 h-18 object-contain absolute right-1/5" />
      </div>
      <div className=" min-h-2/3 flex flex-col justify-center gap-9 items-center">
        <motion.p
          variants={container}
          initial="hidden"
          animate="visible"
          className="s-goth text-center w-80 text-2xl md:text-5xl"
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
        <div className="w-full text-[10px] md:text-[14px]">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            className="text-start w-3/5 md:w-2/5"
          >
            Find your favourite clubs and events through millions of collection.
            Plan meetups and activies with few clicks.
            <br />
            <Link to={"/login"}>
              <p className="flex items-center gap-1 underline ">
                Join today
                <FaArrowCircleRight />
              </p>
            </Link>
          </motion.h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
