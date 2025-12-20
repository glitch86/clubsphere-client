import React from "react";
import { Link } from "react-router";
import MemberOverview from "./MemberOverview";
import DashboardMod from "./DashboardMod";
import DashboardAdmin from "./DashboardAdmin";
import useRole from "../../Hooks/useRole";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

const Dashboard = () => {
  const { role, roleLoading } = useRole();
  console.log(role);

  if (roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div>
      {role === "admin" && (
        <>
          <DashboardAdmin></DashboardAdmin>
        </>
      )}
      {role === "moderator" && (
        <>
          <DashboardMod></DashboardMod>
        </>
      )}
      {role === "user" && (
        <>
          <MemberOverview></MemberOverview>
        </>
      )}
    </div>
  );
};

export default Dashboard;
