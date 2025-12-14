import React from "react";
import { Link } from "react-router";
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
