import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { HiOutlineLogin } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import dummy from "../../assets/dummy.png";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";
import ThemeToggle from "../../Theme/ThemeToggle/ThemeToggle";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  // auth context
  const { user, setUser, signOutUser, loading } = useContext(AuthContext);

  // manage nav visibility
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current <= 0) {
        setHide(false);
        setLastScroll(current);
        return;
      }

      if (current > lastScroll) {
        setHide(true);
      } else {
        setHide(false);
      }
      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);
  // Nav links
  const links = (
    <>
      <NavLink to="/" className="mr-5">
        Home
      </NavLink>
      <NavLink to="/clubs" className="mr-5">
        Clubs
      </NavLink>
      <NavLink to="/events" className="mr-5">
        Events
      </NavLink>
      {/* <NavLink
        to="/events"
        className={`mr-5  ${user ? "block" : "hidden"}`}
      >
        Events
      </NavLink> */}
    </>
  );

  // handle user signout
  const handleSignout = () => {
    signOutUser()
      .then(() => {
        toast.success("Signout successful");
        setUser(null);
        navigate("/");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div
      className={`z-100 bg-base-200 rounded-xl my-5 sticky top-0 shadow-sm transform transition-transform duration-300 ${
        hide ? "-translate-y-full" : "translate-y-1"
      }`}
    >
      <div className="navbar container mx-auto">
        <div className="navbar-start lg:w-fit mx-6">
          <div className="drawer md:hidden">
            <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-1" className=" drawer-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-1"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu text-white bg-black/10 backdrop-blur-sm shadow-sm min-h-full w-44 p-4">
                {/* Sidebar content here */}
                {links}
              </ul>
            </div>
          </div>

          <h2 className=" text-xl goth">
            <Link to={"/"}>ClubSphere</Link>
          </h2>
        </div>
        <div className="navbar-start hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">{links}</ul>
        </div>

        <div className="navbar-end">
        {/* search field */}

        <div className=" flex">
          <div>
            <label className="input join-item">
              
              <input placeholder="search for clubs" required />
            </label>
          </div>
          <button className="btn btn-primary join-item"><FaSearch size={17} /></button>
        </div>
          <ThemeToggle></ThemeToggle>

          {loading ? (
            <h1>loading....</h1>
          ) : (
            <div className="dropdown dropdown-end ml-3 cursor-pointer">
              <img
                tabIndex={0}
                role="button"
                className={`h-10 w-10 rounded-full mx-auto ${
                  user ? " " : "hidden"
                }`}
                src={user?.photoURL || dummy}
                alt=""
                referrerPolicy="no-referrer"
              />
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <button className="btn md:hidden" onClick={handleSignout}>
                    <Link to={"/login"}>
                      <div className="flex  gap-2 items-center">
                        <span>Log Out</span>
                        <FiLogOut />
                      </div>
                    </Link>
                  </button>
                </li>
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <Link to={"/movies/add"}>Add Movies</Link>
                </li>
                <li>
                  <Link to={"/watchlist"}>WatchList</Link>
                </li>
                <li>
                  <button className="btns" onClick={handleSignout}>
                    <Link to={"/login"}>
                      <div className="flex  gap-2 items-center">
                        <span>Log Out</span>
                        <FiLogOut />
                      </div>
                    </Link>
                  </button>
                </li>
              </ul>
              {/* {console.log(user.photoURL)} */}
            </div>
          )}
          <Link  to={"/login"} className={`btns ${user ? "hidden!" : ""}`}>
              <div className="flex  gap-2 items-center">
                <span>Login</span>
                <HiOutlineLogin />
              </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
