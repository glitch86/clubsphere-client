import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import MyContainer from "../Components/Shared/MyContainer";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <MyContainer>
        <Outlet></Outlet>
      </MyContainer>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
