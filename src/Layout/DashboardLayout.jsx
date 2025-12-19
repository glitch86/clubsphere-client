import React, { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { MdEventNote } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";
import { Bitcoin, Form, History, User, Users } from "lucide-react";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";

const DashboardLayout = () => {
  const theme = localStorage.getItem("theme") || "light";
  const { role, roleLoading } = useRole();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-200">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">
            <Link to={"/"}>
              <span className="goth">ClubSphere</span>
            </Link>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                to={"/dashboard"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>

            {role === "admin" && (
              <>
                {/* List item */}
                <li>
                  <NavLink
                    to={"/dashboard/admin/manage-clubs"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="manage clubs"
                  >
                    {/* manage clubs */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="my-1.5 inline-block size-4"
                    >
                      <path d="M20 7h-9"></path>
                      <path d="M14 17H5"></path>
                      <circle cx="17" cy="17" r="3"></circle>
                      <circle cx="7" cy="7" r="3"></circle>
                    </svg>
                    <span className="is-drawer-close:hidden">Manage Clubs</span>
                  </NavLink>
                </li>
                {/* manage users */}
                <li>
                  <NavLink
                    to={"/dashboard/admin/manage-users"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="manage users"
                  >
                    <FaUserAstronaut />
                    <span className="is-drawer-close:hidden">Manage users</span>
                  </NavLink>
                </li>
                {/* admin payments  */}
                <li>
                  <NavLink
                    to={"/dashboard/admin/payments"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="payments"
                  >
                    <Bitcoin size={19}></Bitcoin>
                    <span className="is-drawer-close:hidden">Payments</span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "moderator" && (
              <>
                {/* moderator manage club */}
                <li>
                  <NavLink
                    to={"/dashboard/moderator/moderate-clubs"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="moderate clubs"
                  >
                    {/* Settings icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="my-1.5 inline-block size-4"
                    >
                      <path d="M20 7h-9"></path>
                      <path d="M14 17H5"></path>
                      <circle cx="17" cy="17" r="3"></circle>
                      <circle cx="7" cy="7" r="3"></circle>
                    </svg>
                    <span className="is-drawer-close:hidden">
                      Moderate Clubs
                    </span>
                  </NavLink>
                </li>

                {/* club members */}
                <li>
                  <NavLink
                    to={"/dashboard/moderator/club-members"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="club members"
                  >
                    {/* Settings icon */}
                    <User size={19}></User>
                    <span className="is-drawer-close:hidden">Club Members</span>
                  </NavLink>
                </li>

                {/* moderate events */}
                <li>
                  <NavLink
                    to={"/dashboard/moderator/moderate-events"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="moderate events"
                  >
                    {/* Settings icon */}
                    <MdEventNote size={18} />
                    <span className="is-drawer-close:hidden">
                      Moderate events
                    </span>
                  </NavLink>
                </li>
                {/* moderate reg */}
                <li>
                  <NavLink
                    to={"/dashboard/moderator/event-registrations"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="event registrations"
                  >
                    <Form size={19}></Form>
                    <span className="is-drawer-close:hidden">
                      Event Registrations
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "user" && (
              <>
                {/* my clubs */}
                <li>
                  <NavLink
                    to={"/dashboard/user/my-clubs"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="my clubs"
                  >
                    <Users size={19}></Users>
                    <span className="is-drawer-close:hidden">My Clubs</span>
                  </NavLink>
                </li>
                {/* my events */}
                <li>
                  <NavLink
                    to={"/dashboard/user/my-events"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="my events"
                  >
                    <MdEventNote size={18} />
                    <span className="is-drawer-close:hidden">My Events</span>
                  </NavLink>
                </li>
                {/* payment history */}
                <li>
                  <NavLink
                    to={"/dashboard/user/payment-history"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="payment history"
                  >
                    <History size={19}></History>
                    <span className="is-drawer-close:hidden">
                      Payment history
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
