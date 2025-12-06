import React, { useContext  } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { HiOutlineLogin } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import dummy from "../../assets/dummy.png";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";
import ThemeToggle from "../../Theme/ThemeToggle/ThemeToggle";

const NavBar = () => {
  const navigate = useNavigate();
  // auth context
  const { user, setUser, signOutUser, loading } = useContext(AuthContext);

  // Nav links
  const links = (
    <>
      <NavLink to="/" className="mr-5">
        Home
      </NavLink>
      <NavLink to="/movies" className="mr-5">
        All Movies
      </NavLink>
      <NavLink
        to="/collection"
        className={`mr-5  ${user ? "block" : "hidden"}`}
      >
        My Collection
      </NavLink>
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
    <div className="bg-black/10 backdrop-blur-sm shadow-sm">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
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

          <h2 className=" text-xl">
            <Link to={"/"}>MovieMaster</Link>
          </h2>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {loading ? (
            <h1>loading....</h1>
          ) : (
            <div className="dropdown dropdown-end md:dropdown-center">
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
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
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
              </ul>
              {/* {console.log(user.photoURL)} */}
            </div>
          )}

          {user ? (
            <button className="btn hidden md:block" onClick={handleSignout}>
              <Link to={"/login"}>
                <div className="flex  gap-2 items-center">
                  <span>Log Out</span>
                  <FiLogOut />
                </div>
              </Link>
            </button>
          ) : (
            <button className="btn">
              <Link to={"/login"}>
                <div className="flex  gap-2 items-center">
                  <span>Login</span>
                  <HiOutlineLogin />
                </div>
              </Link>
            </button>
          )}
          <ThemeToggle></ThemeToggle>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
