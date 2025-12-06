import React, { useEffect, useState } from "react";
import { IoIosSunny } from "react-icons/io";
import { LuSunMoon } from "react-icons/lu";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <button className="btn bg-transparent border-none btn-circle" onClick={handleTheme}>
      {theme === "dark" ? <LuSunMoon size={33} /> : <IoIosSunny size={33} />}
    </button>
  );
};

export default ThemeToggle;
