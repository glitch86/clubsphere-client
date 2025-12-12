import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
// import Loading from "../components/Loading/Loading";
import { AuthContext } from "../Context/AuthContext";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
