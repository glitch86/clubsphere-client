import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../FIrebase/sdk";
import { AuthContext } from "./AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const googleAuth = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecute = useAxiosSecure()


  // google login
  const googleSignIn = () => {
    return signInWithPopup(auth, googleAuth);
  };

  // sign out
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // add use to db
  const addUserToDB = async (newUser) => {
    const { data: userInfo = {} } = await axiosSecute.post("/users", newUser);
    console.log(userInfo);
  };

  const authInfo = {
    user,
    setUser,
    loading,
    googleSignIn,
    signOutUser,
    addUserToDB
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      // console.log(currUser);
      setUser(currUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext value={authInfo}>{!loading && children}</AuthContext>;
};

export default AuthProvider;
