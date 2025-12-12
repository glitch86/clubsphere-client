import React, { useEffect, useState } from "react";
import { IoIosSunny } from "react-icons/io";
import { LuSunMoon } from "react-icons/lu";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const handleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      className="btn bg-transparent border-none btn-circle"
      onClick={handleTheme}
    >
      {theme === "dark" ? <LuSunMoon size={33} /> : <IoIosSunny size={33} />}
    </button>
  );
};

export default ThemeToggle;
