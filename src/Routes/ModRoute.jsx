import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import Forbidden from "../Pages/Forbidden";

const ModRoute = ({children}) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role !== "moderator") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default ModRoute;
