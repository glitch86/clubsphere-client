import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import MainLayout from "./Layout/MainLayout.jsx";
import { router } from "./Routes/router.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <MainLayout></MainLayout>
      </RouterProvider>
    </AuthProvider>
  </StrictMode>
);
