import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FIrebase/sdk";
import { useForm } from "react-hook-form";
// import bg from '../assets/SimpleShiny.svg';

// console.log(bg);

const Login = () => {
  const { setUser, googleSignIn, addUserToDB } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  // const [userEmail, setUserEmail] = useState();

  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  // hook form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // sign in with email and pass
  const handleSignin = (data) => {
    const email = data?.email;
    const password = data?.password;

    // console.log(email, password)

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // console.log(res);
        setUser(res.user);
        toast.success("Login successful");
        navigate(from);
      })
      .catch((e) => {
        // console.log(e);
        toast.error(e.message);
      });
  };

  // google sign in
  const handleGoogleSignin = async () => {
    try {
      const res = await googleSignIn();

      const newUser = {
        displayName: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
      };
      await addUserToDB(newUser);

      setUser(res.user);
      navigate(from);
      toast.success("Login Successful");
    } catch (err) {
      console.error(err);
      toast.error("login failed");
    }
  };

  // autofill signin
  const handleAutofill = (role) => {
    if (role === "admin") {
      setValue("email", "admin@gmail.com");
      setValue("password", "Admin@123");
    }
    if (role === "mod") {
      setValue("email", "mod@gmail.com");
      setValue("password", "Mod@123");
    }
    if (role === "user") {
      setValue("email", "user@gmail.com");
      setValue("password", "User@123");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <div className="text-left">
          <h1 className="heading">Login</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleSignin)}
          className="fieldset rounded-box w-xs  p-4 bg-base-100 backdrop-blur-sm shadow-sm"
        >
          <label className="label ">Email</label>
          <input
            type="email"
            className="input"
            {...register("email", { required: "Email in required" })}
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email?.message}
            </span>
          )}

          <div className="relative">
            <label className="label">Password</label>
            <input
              type={showPass ? "text" : "password"}
              className="input"
              {...register("password", { required: "Password in required" })}
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password?.message}
              </span>
            )}
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-2 top-9 cursor-pointer z-50"
            >
              {showPass ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          <span className="hover:underline cursor-pointer ">
            <Link>Forget Password</Link>
          </span>

          {/* autofill */}
          <label className="label">Autofill</label>

          <div className="flex justify-between">
            <button onClick={() => handleAutofill("admin")} className="btn">
              Admin
            </button>
            <button onClick={() => handleAutofill("mod")} className="btn">
              Moderator
            </button>
            <button onClick={() => handleAutofill("user")} className="btn">
              User
            </button>
          </div>

          <button className="btn btn-neutral mt-4">Login</button>
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
          <p className="text-center text-sm mt-3">
            Don't have an account?{" "}
            <Link
              to="/register"
              className=" hover:text-black hover:bg-white  underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
