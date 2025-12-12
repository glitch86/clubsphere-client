import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import ClubTable from "../../Components/Dashboard/ClubTable";

const ManageClubs = () => {

  return (
    <div>
      <Link to={"/dashboard/add-clubs"} className="btns">
        add
      </Link>
      <ClubTable></ClubTable>
    </div>
  );
};

export default ManageClubs;
