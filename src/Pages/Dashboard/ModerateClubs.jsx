import React from "react";
import ClubTableMod from "../../Components/Dashboard/ClubTableMod";
import { Link } from "react-router";

const ModerateClubs = () => {
  return (
    <div>
      <Link to={"/dashboard/add-clubs"} className="btns">
        add
      </Link>
      <ClubTableMod></ClubTableMod>
    </div>
  );
};

export default ModerateClubs;
