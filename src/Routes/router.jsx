import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Clubs from "../Pages/Clubs";
import Events from "../Pages/Events";
import ClubDetails from "../Pages/ClubDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Payment/PaymentCancelled";
import DashboardLayout from "../Layout/DashboardLayout";
import ManageClubs from "../Pages/Dashboard/ManageClubs";
import AddClubs from "../Pages/AddClubs";
import ModerateClubs from "../Pages/Dashboard/ModerateClubs";
import EditClubs from "../Pages/EditClubs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/clubs",
        Component: Clubs,
      },
      {
        path: "/clubs/:id",
        Component: ClubDetails,
      },
      {
        path: "/events",
        Component: Events,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/payment-cancelled",
        Component: PaymentCancelled,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "/dashboard/manage-clubs",
        Component: ManageClubs,
      },
      {
        path: "/dashboard/moderate-clubs",
        Component: ModerateClubs,
      },
      {
        path: "/dashboard/add-clubs",
        Component: AddClubs,
      },
      {
        path: "/dashboard/edit-clubs/:id",
        Component: EditClubs,
      },
    ],
  },
]);
