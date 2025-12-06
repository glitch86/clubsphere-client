import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../FIrebase/sdk";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { setUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  const addUserToDB = (newUser) => {
    return fetch("https://movie-master-server-six.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  };
  // sign up with email and pass
  const handleSignUp = (e) => {
    e.preventDefault();
    const displayName = e.target.name?.value;
    const photoURL = e.target.url?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    const newUser = {
      displayName,
      photoURL,
      email,
    };

    // console.log(displayName, url, email, password);
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and must include both lower and uppercase"
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // add user in database
        addUserToDB(newUser)
          .then((res) => res.json())

        updateProfile(res.user, { displayName, photoURL })
          .then(() => {
            setUser(res.user);
            navigate(from);
            toast.success("Login Successful.");
          })
          .catch((err) => toast.error(err));
      })
      .catch((err) => toast.error(err.message));

    e.target.reset();
  };

  // continue with google
  const handleGoogleSignin = () => {
    googleSignIn()
      .then((res) => {
        // add user in database
        const newUser = {
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        };
        addUserToDB(newUser).then((res) => res.json());

        // .then((data) => toast.error(data.message));

        setUser(res.user);
        navigate(from);
        toast.success("Login Successful.");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <div className="text-left">
          <h1 className="heading">Register</h1>
        </div>
        <form
          onSubmit={handleSignUp}
          className="fieldset rounded-box w-xs border border-gray-600 p-4 bg-black/10 backdrop-blur-sm shadow-sm"
        >
          <label className="label">Name</label>
          <input type="text" className="input" name="name" placeholder="Name" />

          <label className="label">Profile URL</label>
          <input
            type="url"
            className="input"
            name="url"
            placeholder="Photo URL"
          />

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            name="email"
            placeholder="Email"
          />
          <div className="relative">
            <label className="label">Password</label>
            <input
              type={showPass ? "text" : "password"}
              className="input"
              name="password"
              placeholder="Password"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-2 top-9 cursor-pointer z-50"
            >
              {showPass ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* <span className="hover:underline cursor-pointer">Forget Password</span> */}

          <button className="btn btn-neutral mt-4">Sign Up</button>

          <p className="text-center text-sm text-black mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black hover:text-white hover:bg-black  underline"
            >
              Login
            </Link>
          </p>
          <div className="divider">OR</div>
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer my-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
