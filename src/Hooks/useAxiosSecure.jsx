import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const axiosSecure = axios.create({
  // baseURL: "https://clubsphere-server.vercel.app",
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);
  // console.log("user", user);

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user?.accessToken;
          config.headers.Authorization = `Bearer ${token}`;
          // console.log("token doen")
        }
        return config;
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);
  return axiosSecure;
};

export default useAxiosSecure;
