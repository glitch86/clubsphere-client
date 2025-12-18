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
import ErrorPage from "../Pages/ErrorPage";
import ModerateEvents from "../Pages/Dashboard/ModerateEvents";
import AddEvents from "../Pages/AddEvents";
import EventsDetail from "../Pages/EventsDetail";
import EditEvents from "../Pages/EditEvents";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import Payments from "../Pages/Dashboard/Payments";
import EventReg from "../Pages/Dashboard/EventReg";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import MyEvents from "../Pages/Dashboard/MyEvents";
import ClubMembers from "../Pages/Dashboard/ClubMembers";
import MyClubs from "../Pages/Dashboard/MyClubs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/events/:id",
        Component: EventsDetail,
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
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/dashboard/admin/manage-clubs",
        Component: ManageClubs,
      },
      {
        path: "/dashboard/admin/manage-users",
        Component: ManageUsers,
      },
      {
        path: "/dashboard/admin/payments",
        Component: Payments,
      },
      {
        path: "/dashboard/moderator/moderate-clubs",
        Component: ModerateClubs,
      },
      {
        path: "/dashboard/moderator/club-members",
        Component: ClubMembers,
      },
      {
        path: "/dashboard/add-clubs",
        Component: AddClubs,
      },
      {
        path: "/dashboard/edit-clubs/:id",
        Component: EditClubs,
      },
      {
        path: "/dashboard/moderator/moderate-events",
        Component: ModerateEvents,
      },
      {
        path: "/dashboard/add-events",
        Component: AddEvents,
      },
      {
        path: "/dashboard/edit-events/:id",
        Component: EditEvents,
      },
      {
        path: "/dashboard/moderator/event-registrations",
        Component: EventReg,
      },
      {
        path: "/dashboard/user/my-clubs",
        Component: MyClubs,
      },
      {
        path: "/dashboard/user/my-events",
        Component: MyEvents,
      },
      {
        path: "/dashboard/user/payment-history",
        Component: PaymentHistory,
      },
    ],
  },
]);
