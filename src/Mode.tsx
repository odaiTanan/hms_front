import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Mode = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(savedTheme);
    localStorage.getItem("theme") == "dark" &&
      document.documentElement.classList.add("dark");
  }, []);

  const toggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <button onClick={toggle}>
        {theme !== "dark" ? (
          <FontAwesomeIcon
            className="text-gray-800 w-[20px] h-[20px] text-[20px] transition duration-[.2s] p-2 rounded-[50%] hover:bg-gray-400 "
            icon={faMoon}
          />
        ) : (
          <FontAwesomeIcon
            className=" text-yellow-400 w-[20px] h-[20px] text-[20px] transition duration-[.2s] p-2 rounded-[50%] hover:bg-gray-400"
            icon={faSun}
          />
        )}
      </button>
    </>
  );
};

export default Mode;
