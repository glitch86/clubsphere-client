import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../FIrebase/sdk";
import { useForm, useWatch } from "react-hook-form";
import dummy from "../assets/dummy.png";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { setUser, googleSignIn, addUserToDB } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  // hook form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // sign up with email and pass
  const handleSignUp = async (data) => {
    const displayName = data?.name;
    const photoURL = data?.photoURL;
    const email = data?.email;
    const password = data?.password;

    const newUser = {
      displayName,
      photoURL,
      email,
    };

    // console.log(displayName, url, email, password);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // add user in database
      try {
        await addUserToDB(newUser);
      } catch (err) {
        console.error("failed to add user to DB:", err);
        toast.error("failed to add user to database");
      }

      await updateProfile(res.user, { displayName, photoURL });

      setUser(res.user);
      navigate(from);
      toast.success("Registration Successful.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // continue with google
  const handleGoogleSignin = async () => {
    try {
      const res = await googleSignIn();
      const newUser = {
        displayName: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
      };

      try {
        await addUserToDB(newUser);
      } catch (err) {
        console.error(err);
        toast.error("failed to add user to database");
      }

      setUser(res.user);
      navigate(from);
      toast.success("Registration Successful.");
    } catch (err) {
      console.log(err);
    }
  };

  // img preview
  const imgURL = useWatch({ control, name: "photoURL" });
  // console.log(imgURL);

  return (
    <div>
      <h1 className="heading text-center">Register</h1>
      <div className="hero  min-h-screen">
        <div className="hero-content  flex-col lg:flex-row md:gap-40">
          <img className="rounded-2xl" src={imgURL || dummy} alt="" />
          <div>
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="fieldset rounded-box w-xs p-4 "
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* name */}
                <div>
                  <label className="">Name</label>
                  <input
                    type="text"
                    className="input"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Name"
                  />

                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name?.message}
                    </span>
                  )}
                </div>
                {/* photo url */}

                <div>
                  <label className="">Profile URL</label>
                  <input
                    type="url"
                    className="input"
                    {...register("photoURL")}
                    placeholder="Photo URL"
                  />
                </div>
              </div>
              {/* email */}
              <label className="">Email</label>
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
              {/* password */}
              <div className="relative">
                <label className="">Password</label>
                <input
                  type={showPass ? "text" : "password"}
                  className="input"
                  {...register("password", {
                    required: "Password in required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      message:
                        "Password must have at least one uppercase, one lowercase letter and minimum 6 characters",
                    },
                  })}
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password?.message}
                  </span>
                )}

                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-2 top-8 cursor-pointer z-50"
                >
                  {showPass ? <FaEye size={14} /> : <IoEyeOff size={14} />}
                </span>
              </div>

              {/* <span className="hover:underline cursor-pointer">Forget Password</span> */}

              <button className="btn btn-primary mt-4">Sign Up</button>

              <p className="text-center text-sm mt-3">
                Already have an account?{" "}
                <Link to="/login" className="hover:underline">
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
      </div>
    </div>
  );
};

export default Register;
