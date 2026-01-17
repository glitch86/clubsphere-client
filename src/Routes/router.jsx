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
import AdminRoute from "./AdminRoute";
import ModRoute from "./ModRoute";
import About from "../Pages/About";

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
        path: "/about",
        Component: About,
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
        element: (
          <AdminRoute>
            <ManageClubs></ManageClubs>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/payments",
        element: (
          <AdminRoute>
            <Payments></Payments>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/moderator/moderate-clubs",
        element: (
          <ModRoute>
            <ModerateClubs></ModerateClubs>
          </ModRoute>
        ),
      },
      {
        path: "/dashboard/moderator/club-members",
        element: (
          <ModRoute>
            <ClubMembers></ClubMembers>
          </ModRoute>
        ),
      },
      {
        path: "/dashboard/add-clubs",
        element: (
          <ModRoute>
            <AddClubs></AddClubs>
          </ModRoute>
        ),
      },
      {
        path: "/dashboard/edit-clubs/:id",
        element: (
          <ModRoute>
            <EditClubs></EditClubs>
          </ModRoute>
        ),
      },
      {
        path: "/dashboard/moderator/moderate-events",
        element: (
          <ModRoute>
            <ModerateEvents></ModerateEvents>
          </ModRoute>
        ),
      },
      {
        path: "/dashboard/add-events",
        element: (
          <ModRoute>
            <AddEvents></AddEvents>
          </ModRoute>
        ),
      },
      {
        path: "/dashboard/edit-events/:id",
        element: (
          <ModRoute>
            <EditEvents></EditEvents>
          </ModRoute>
        ),
      },
      {
        path: "/dashboard/moderator/event-registrations",
        element: (
          <ModRoute>
            <EventReg></EventReg>
          </ModRoute>
        ),
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
